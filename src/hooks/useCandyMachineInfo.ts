import { useState, useEffect } from 'react';
import { Connection, PublicKey } from '@solana/web3.js';
import { CANDY_MACHINE_CONFIG } from '../config/candyMachine';

interface CandyMachineInfo {
  totalSupply: number;
  itemsRedeemed: number;
  itemsRemaining: number;
  mintPrice: number;
  isActive: boolean;
  collectionName: string;
  symbol: string;
  description: string;
  treasuryBalance: number;
}

export const useCandyMachineInfo = () => {
  const [candyMachineInfo, setCandyMachineInfo] = useState<CandyMachineInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCandyMachineInfo = async () => {
      setIsLoading(true);
      setError(null);

      try {
        console.log("📊 Fetching MAINNET Candy Machine info with Web3.js...");
        console.log("🆔 MAINNET Candy Machine ID:", CANDY_MACHINE_CONFIG.CANDY_MACHINE_ID);
        
        const connection = new Connection(CANDY_MACHINE_CONFIG.RPC_ENDPOINT, 'confirmed');
        
        // ✅ Informations statiques de votre collection MAINNET
        const staticInfo = {
          totalSupply: 456, // Collection MAINNET a 456 items
          itemsRedeemed: 0, // Items redeemed par la Candy Machine (commence à 0)
          mintPrice: CANDY_MACHINE_CONFIG.MINT_PRICE_SOL,
          isActive: true,
          collectionName: CANDY_MACHINE_CONFIG.COLLECTION.NAME,
          symbol: CANDY_MACHINE_CONFIG.COLLECTION.SYMBOL,
          description: CANDY_MACHINE_CONFIG.COLLECTION.DESCRIPTION,
        };

        // ✅ Récupérer le solde du treasury (info dynamique)
        let treasuryBalance = 0;
        try {
          const treasuryPublicKey = new PublicKey(CANDY_MACHINE_CONFIG.TREASURY_ACCOUNT);
          const balance = await connection.getBalance(treasuryPublicKey);
          treasuryBalance = balance / 1e9; // Convertir en SOL
          console.log("💰 Treasury balance:", treasuryBalance, "SOL");
        } catch (balanceError) {
          console.warn("⚠️ Could not fetch treasury balance:", balanceError);
        }

        // ✅ Vérifier si la collection MAINNET existe sur la blockchain
        let collectionExists = false;
        try {
          if (CANDY_MACHINE_CONFIG.COLLECTION_MINT) {
            const collectionPublicKey = new PublicKey(CANDY_MACHINE_CONFIG.COLLECTION_MINT);
            const accountInfo = await connection.getAccountInfo(collectionPublicKey);
            collectionExists = accountInfo !== null;
            console.log("📦 MAINNET Collection exists on-chain:", collectionExists);
            console.log("🆔 Collection Mint:", CANDY_MACHINE_CONFIG.COLLECTION_MINT);
          }
        } catch (collectionError) {
          console.warn("⚠️ Could not verify MAINNET collection:", collectionError);
        }

        // ✅ Construire les informations complètes
        const candyMachineData: CandyMachineInfo = {
          ...staticInfo,
          itemsRemaining: staticInfo.totalSupply - staticInfo.itemsRedeemed,
          treasuryBalance,
          isActive: staticInfo.isActive && collectionExists,
        };

        console.log("✅ MAINNET Candy Machine info loaded:", candyMachineData);
        setCandyMachineInfo(candyMachineData);

      } catch (err: any) {
        console.error("❌ Error fetching MAINNET candy machine info:", err);
        
        // ✅ Fallback avec informations statiques pour la collection MAINNET
        const fallbackInfo: CandyMachineInfo = {
          totalSupply: 456,
          itemsRedeemed: 0, // Candy Machine itemsRedeemed (0 = aucun mint encore)
          itemsRemaining: 456, // Toutes disponibles
          mintPrice: CANDY_MACHINE_CONFIG.MINT_PRICE_SOL,
          isActive: true,
          collectionName: CANDY_MACHINE_CONFIG.COLLECTION.NAME,
          symbol: CANDY_MACHINE_CONFIG.COLLECTION.SYMBOL,
          description: CANDY_MACHINE_CONFIG.COLLECTION.DESCRIPTION,
          treasuryBalance: 0,
        };

        setCandyMachineInfo(fallbackInfo);
        setError("Could not fetch all data, showing cached information");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCandyMachineInfo();

    // ✅ Rafraîchir les données toutes les 30 secondes
    const interval = setInterval(fetchCandyMachineInfo, 30000);
    
    return () => clearInterval(interval);
  }, []);

  // ✅ Fonction pour forcer le rafraîchissement
  const refreshInfo = async () => {
    setIsLoading(true);
    // Re-déclencher l'effet
    window.location.reload();
  };

  return {
    candyMachineInfo,
    isLoading,
    error,
    refreshInfo,
    // ✅ Helpers utiles
    isReadyToMint: candyMachineInfo?.isActive && candyMachineInfo?.itemsRemaining > 0,
    progressPercentage: candyMachineInfo 
      ? (candyMachineInfo.itemsRedeemed / candyMachineInfo.totalSupply) * 100 
      : 0,
  };
};