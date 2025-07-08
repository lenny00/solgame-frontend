import { useState, useCallback, useEffect, useMemo } from 'react';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import { generateSigner, transactionBuilder, publicKey, some, base58 } from '@metaplex-foundation/umi';
import { fetchCandyMachine, mintV2, mplCandyMachine, safeFetchCandyGuard } from "@metaplex-foundation/mpl-candy-machine";
import { walletAdapterIdentity } from '@metaplex-foundation/umi-signer-wallet-adapters';
import { mplTokenMetadata } from '@metaplex-foundation/mpl-token-metadata';
import { setComputeUnitLimit } from '@metaplex-foundation/mpl-toolbox';
import { CANDY_MACHINE_CONFIG } from '../config/candyMachine';

// ✅ Adresses de la Candy Machine MAINNET
const CANDY_MACHINE_ID = publicKey('847pVQUdGGNnLCMcki4WU5wYqh1xLgTYNcy99PUKZeRH');
const TREASURY_WALLET = publicKey('A729Ge8NXMNYUtQJkzXuSoLJiBTQrgYrsL2zfMsi2iwJ');

interface MintResult {
  signature: string;
  mintAddress: string;
  explorerUrl: string;
}

interface CandyMachineStats {
  itemsAvailable: number;
  itemsRedeemed: number;
  itemsRemaining: number;
  price: string;
}

interface EnhancedNFTMetadata {
  name: string;
  symbol: string;
  description: string;
  image: string;
  external_url: string;
  attributes: Array<{
    trait_type: string;
    value: string | number;
  }>;
  properties: {
    files: Array<{
      uri: string;
      type: string;
    }>;
    category: string;
    creators: Array<{
      address: string;
      share: number;
      verified?: boolean;
    }>;
  };
  collection: {
    name: string;
    family: string;
  };
}

export const useMintNFT = () => {
  const { connection } = useConnection();
  const wallet = useWallet();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastMintResult, setLastMintResult] = useState<MintResult | null>(null);
  const [candyMachineStats, setCandyMachineStats] = useState<CandyMachineStats | null>(null);

  // Créer l'instance UMI avec votre endpoint
  const umi = useMemo(() =>
    createUmi(CANDY_MACHINE_CONFIG.RPC_ENDPOINT)
      .use(walletAdapterIdentity(wallet))
      .use(mplCandyMachine())
      .use(mplTokenMetadata()),
    [wallet]
  );

  // Fonction pour créer des métadonnées avec vos vrais attributs
  const createGameMetadata = useCallback((playerNumber: number) => {
    return {
      name: `SOL Game: Mint Pass #${playerNumber.toString().padStart(3, '0')}`,
      symbol: "SOLGAME",
      description: "Enter the ultimate on-chain survival game on Solana. This Mint Pass grants you a spot in SOL Game, where 456 players will compete to win the $10,000 jackpot. Will you survive?",
      seller_fee_basis_points: 300,
      image: "0.png",
      attributes: [
        {
          trait_type: "Status",
          value: "Alive"
        },
        {
          trait_type: "Round Reached",
          value: "1"
        },
        {
          trait_type: "Player Number",
          value: playerNumber.toString().padStart(3, '0')
        }
      ],
      properties: {
        files: [
          {
            uri: "0.png",
            type: "image/png"
          }
        ],
        category: "image"
      }
    };
  }, []);

  // Charger les stats de la Candy Machine
  const loadCandyMachineStats = useCallback(async () => {
    if (!wallet.connected) return;

    try {
      console.log("📋 Loading MAINNET Candy Machine stats...");
      console.log("🆔 MAINNET Candy Machine ID:", CANDY_MACHINE_ID);
      
      const candyMachine = await fetchCandyMachine(umi, CANDY_MACHINE_ID);
      const candyGuard = await safeFetchCandyGuard(umi, candyMachine.mintAuthority);
      
      const stats: CandyMachineStats = {
        itemsAvailable: Number(candyMachine.itemsAvailable) || 456,
        itemsRedeemed: Number(candyMachine.itemsRedeemed) || 0,
        itemsRemaining: (Number(candyMachine.itemsAvailable) || 456) - (Number(candyMachine.itemsRedeemed) || 0),
        price: "0.2 SOL"
      };
      
      setCandyMachineStats(stats);
      
      console.log("🍬 MAINNET Candy Machine loaded:", {
        itemsAvailable: stats.itemsAvailable,
        itemsRedeemed: stats.itemsRedeemed,
        itemsRemaining: stats.itemsRemaining,
        price: stats.price
      });
    } catch (err) {
      console.error("❌ Error loading MAINNET Candy Machine stats:", err);
    }
  }, [wallet.connected, umi]);

  // Charger les stats au démarrage
  useEffect(() => {
    if (wallet.connected) {
      loadCandyMachineStats();
    }
  }, [wallet.connected, loadCandyMachineStats]);

  const mintNFT = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setLastMintResult(null);

    try {
      if (!wallet.connected || !wallet.publicKey) {
        throw new Error("Please connect your wallet first.");
      }

      console.log("🚀 Starting SOL Game Pass mint on MAINNET");
      console.log("🍬 MAINNET Candy Machine ID:", CANDY_MACHINE_ID);
      console.log("👛 Wallet:", wallet.publicKey.toString());
      
      // Vérifier le solde
      const balance = await connection.getBalance(wallet.publicKey);
      console.log("💰 Balance:", balance / LAMPORTS_PER_SOL, "SOL");
      
      if (balance < 0.22 * LAMPORTS_PER_SOL) {
        throw new Error("Insufficient SOL balance. Need at least 0.22 SOL for minting.");
      }

      // Vérifier si des game passes sont encore disponibles
      if (candyMachineStats && candyMachineStats.itemsRemaining <= 0) {
        throw new Error("😔 Game is full! All 456 passes have been sold.");
      }

      // Calculer le numéro de joueur
      const playerNumber = (candyMachineStats?.itemsRedeemed || 0) + 1;
      console.log(`🎯 Minting MAINNET game pass for random Player #`);
      console.log(`🎯 ${candyMachineStats?.itemsRemaining || 'Loading...'} game passes remaining`);

      // ✅ Les métadonnées sont gérées par Sugar (numéro aléatoire)
      console.log("📋 MAINNET mint - Sugar will assign random player number:", {
        note: "Player number will be random (is_sequential: false)",
        status: "Alive",
        roundReached: "1",
        description: "Enter the ultimate on-chain survival game..."
      });

      // ✅ Fetch Candy Machine et Candy Guard
      const candyMachine = await fetchCandyMachine(umi, CANDY_MACHINE_ID);
      const candyGuard = await safeFetchCandyGuard(umi, candyMachine.mintAuthority);

      if (!candyGuard) {
        throw new Error("Candy Guard not found");
      }

      console.log("🎮 Collection Mint:", candyMachine.collectionMint);
      console.log("🏛️ Authority:", candyMachine.authority);

      // ✅ Générer le signer pour le NFT
      const nftMint = generateSigner(umi);
      console.log("🪙 NFT Mint Address:", nftMint.publicKey);

      // ✅ Construire la transaction avec la Candy Machine MAINNET
      console.log("⚡ Building mint transaction on MAINNET...");
      
      const transaction = await transactionBuilder()
        .add(setComputeUnitLimit(umi, { units: 800_000 }))
        .add(
          mintV2(umi, {
            candyMachine: candyMachine.publicKey,
            candyGuard: candyGuard.publicKey,
            nftMint,
            collectionMint: candyMachine.collectionMint,
            collectionUpdateAuthority: candyMachine.authority,
            mintArgs: {
              solPayment: some({ destination: TREASURY_WALLET }),
            },
          })
        );

      console.log("📝 Sending transaction to MAINNET Candy Machine...");
      console.log("💰 Processing: Pay 0.2 SOL + Receive SOL Game Pass NFT");
      console.log("🎮 MAINNET NFT Details:", {
        note: "Sugar assigns random player number (1-456)",
        status: "Alive",
        roundReached: "1",
        network: "MAINNET"
      });

      // ✅ Envoyer et confirmer la transaction
      const { signature } = await transaction.sendAndConfirm(umi, {
        confirm: { commitment: "confirmed" },
      });

      // Convertir la signature UMI au format base58 lisible
      const txid = base58.deserialize(signature)[0];
      console.log("✅ MAINNET collection mint successful! Transaction:", txid);
      console.log("🎮 MAINNET NFT Minted with random player number!");
      console.log("📋 Check your wallet to see which player number you got");

      const explorerUrl = `${CANDY_MACHINE_CONFIG.EXPLORER_BASE_URL}/tx/${txid}?cluster=${CANDY_MACHINE_CONFIG.NETWORK}`;

      const result: MintResult = {
        signature: txid,
        mintAddress: nftMint.publicKey.toString(),
        explorerUrl
      };

      setLastMintResult(result);

      // Recharger les stats
      await loadCandyMachineStats();

      // ✅ Log pour debug MAINNET
      console.log("📊 MAINNET Collection Info:", {
        randomPlayerNumber: "Assigned by Sugar (1-456)",
        attributes: ["Status: Alive", "Round Reached: 1", "Player Number: Random"],
        note: "Metadata from Sugar upload on MAINNET"
      });

      window.dispatchEvent(new CustomEvent('nftMintSuccess', {
        detail: {
          transactionId: txid,
          mintedNftAddress: nftMint.publicKey.toString(),
          explorerUrl,
          gamePassNumber: "Random", // Sugar assigns randomly
          remainingPasses: (candyMachineStats?.itemsRemaining || 0) - 1,
          nftName: "SOL Game: Mint Pass #???", // Will be random
          metadata: { note: "Random player number assigned by Sugar" }
        }
      }));

    } catch (err: any) {
      console.error("❌ SOL Game Pass mint error (MAINNET):", err);
      
      let errorMessage = "Enhanced Game Pass mint failed, please try again.";
      
      if (err.message?.includes("insufficient funds") || err.message?.includes("Insufficient SOL")) {
        errorMessage = "Insufficient SOL balance. Need at least 0.22 SOL.";
      } else if (err.message?.includes("User rejected") || err.message?.includes("User declined")) {
        errorMessage = "Transaction was cancelled.";
      } else if (err.message?.includes("Game is full")) {
        errorMessage = "😔 Game is full! All 456 passes have been sold.";
      } else if (err.message?.includes("wallet")) {
        errorMessage = "Wallet connection issue. Please reconnect.";
      } else if (err.message?.includes("blockhash")) {
        errorMessage = "Network congestion. Please try again.";
      } else if (err.message?.includes("Candy Guard not found")) {
        errorMessage = "Candy Machine configuration error.";
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [wallet, connection, umi, candyMachineStats, loadCandyMachineStats, createGameMetadata]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 6000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return { 
    mintNFT, 
    isLoading, 
    error, 
    lastMintResult,
    candyMachineStats,
    candyMachineId: CANDY_MACHINE_ID.toString(),
    treasuryWallet: TREASURY_WALLET.toString()
  }; 
};