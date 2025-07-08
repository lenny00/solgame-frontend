// ✅ Configuration mise à jour avec la Candy Machine MAINNET
export const CANDY_MACHINE_CONFIG = {
  // IDs de la Candy Machine MAINNET
  CANDY_MACHINE_ID: "847pVQUdGGNnLCMcki4WU5wYqh1xLgTYNcy99PUKZeRH",
  CANDY_GUARD_ID: "4dATEeTKbPiL8Zro166ckr34rT7r1JBTYNFgmAbC4EJk",
  
  // Configuration active pour le système MAINNET
  TREASURY_ACCOUNT: "A729Ge8NXMNYUtQJkzXuSoLJiBTQrgYrsL2zfMsi2iwJ", // Votre wallet treasury
  COLLECTION_MINT: "HDfKPkcdvFWnPnfPfrKBAJf6byZDqSu2FjHVUwosuXSW", // Collection mint MAINNET
  MINT_PRICE_SOL: 0.2, // Prix en SOL
  
  // Réseau actif
  NETWORK: 'mainnet-beta' as const,
  
  // Infos collection
  COLLECTION: {
    NAME: 'SOL GAME Pass',
    SYMBOL: 'SOLGAME',
    DESCRIPTION: 'Your ticket to the ultimate memecoin survival game',
  },
  
  // URLs - Helius RPC MAINNET optimisé
  EXPLORER_BASE_URL: 'https://solscan.io',
  RPC_ENDPOINT: 'https://mainnet.helius-rpc.com/?api-key=704b9bca-b2a6-4a86-82af-fc846e6c04e8',
  
  // Métadonnées NFT basées sur votre config Sugar MAINNET
  NFT_METADATA: {
    NAME_PREFIX: 'SOL Game: Mint Pass #', // Comme dans votre config line settings
    DESCRIPTION: 'Enter the ultimate on-chain survival game on Solana. This Mint Pass grants you a spot in SOL Game, where 456 players will compete to win the $10,000 jackpot. Will you survive?',
    IMAGE_URL: 'https://gateway.irys.xyz/', // Base URI de votre Sugar config
    EXTERNAL_URL: 'https://sol-game.fun',
    ROYALTY_BASIS_POINTS: 300, // 3% comme dans votre config
  }
};

// ✅ Validation simplifiée
export const validateCandyMachineConfig = () => {
  if (!CANDY_MACHINE_CONFIG.TREASURY_ACCOUNT) {
    console.warn('⚠️ TREASURY_ACCOUNT is missing!');
    return false;
  }
  if (CANDY_MACHINE_CONFIG.MINT_PRICE_SOL <= 0) {
    console.warn('⚠️ MINT_PRICE_SOL must be greater than 0!');
    return false;
  }
  return true;
};

// ✅ Helper pour générer l'URI des métadonnées (Sugar gère tout automatiquement)
export const generateNFTMetadata = (tokenId: number) => ({
  name: `${CANDY_MACHINE_CONFIG.NFT_METADATA.NAME_PREFIX}${tokenId.toString().padStart(3, '0')}`,
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
      value: tokenId.toString().padStart(3, '0')
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
});