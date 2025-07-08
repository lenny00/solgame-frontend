# SOL GAME - NFT Minting Setup Guide

## 🚀 Quick Setup for NFT Minting

### 1. Deploy Your Candy Machine V3

Before the minting functionality works, you need to deploy a Candy Machine V3 on Solana:

#### Option A: Using Sugar CLI (Recommended)
```bash
# Install Sugar CLI
npm install -g @metaplex-foundation/sugar

# Create your candy machine configuration
sugar create-config

# Deploy your candy machine
sugar deploy

# Verify deployment
sugar verify
```

#### Option B: Using Metaplex Studio (GUI)
1. Visit [Metaplex Studio](https://studio.metaplex.com/)
2. Connect your wallet
3. Create a new Candy Machine V3
4. Upload your NFT assets
5. Configure mint settings (0.2 SOL price)
6. Deploy and note the Candy Machine ID

### 2. Update Configuration

After deploying your Candy Machine, update the configuration:

**File: `src/config/candyMachine.ts`**
```typescript
export const CANDY_MACHINE_CONFIG = {
  // Replace with your actual Candy Machine ID
  CANDY_MACHINE_ID: new PublicKey('YOUR_ACTUAL_CANDY_MACHINE_ID_HERE'),
  
  // Mint price in SOL
  MINT_PRICE: 0.2,
  
  // Network (should match your deployment)
  NETWORK: 'devnet', // or 'mainnet-beta'
  
  // ... rest of config
};
```

### 3. Network Configuration

Ensure your network settings match across:
- `src/App.tsx` (WalletAdapterNetwork)
- `src/config/candyMachine.ts` (NETWORK setting)
- Your deployed Candy Machine network

### 4. Testing

1. **Devnet Testing:**
   - Get devnet SOL from [Solana Faucet](https://faucet.solana.com/)
   - Test minting with devnet configuration
   - Verify transactions on [Solscan Devnet](https://solscan.io/?cluster=devnet)

2. **Mainnet Deployment:**
   - Switch network to `mainnet-beta`
   - Update Candy Machine ID to mainnet deployment
   - Test with small amounts first

### 5. Features Included

✅ **Wallet Integration**
- Automatic wallet connection prompt
- Support for Phantom, Solflare, and other wallets

✅ **Balance Checking**
- Validates sufficient SOL balance (0.2 SOL + gas fees)
- Clear error messages for insufficient funds

✅ **Transaction Handling**
- Loading states during minting
- Transaction confirmation waiting
- Success/error feedback

✅ **Error Management**
- Comprehensive error handling
- User-friendly error messages
- Retry functionality

✅ **Mobile Responsive**
- Works seamlessly on mobile and desktop
- Touch-friendly interface

### 6. Troubleshooting

**Common Issues:**

1. **"Candy Machine configuration is invalid"**
   - Update `CANDY_MACHINE_ID` in config file
   - Ensure the ID matches your deployed Candy Machine

2. **"Insufficient SOL balance"**
   - User needs at least 0.21 SOL (0.2 + gas fees)
   - Direct them to buy SOL or use faucet for devnet

3. **"Network error"**
   - Check RPC endpoint connectivity
   - Verify network configuration matches deployment

4. **"Candy Machine is sold out"**
   - Check if all NFTs have been minted
   - Verify Candy Machine supply settings

### 7. Production Checklist

Before going live:

- [ ] Deploy Candy Machine on mainnet
- [ ] Update `CANDY_MACHINE_ID` with mainnet address
- [ ] Set `NETWORK` to `'mainnet-beta'`
- [ ] Test minting with real SOL
- [ ] Verify NFT metadata and images
- [ ] Test on multiple devices and wallets
- [ ] Monitor transaction success rates

### 8. Support

For additional help:
- [Metaplex Documentation](https://docs.metaplex.com/)
- [Solana Cookbook](https://solanacookbook.com/)
- [Sugar CLI Guide](https://docs.metaplex.com/developer-tools/sugar/)

---

**Note:** The current implementation includes demo/placeholder functionality until you configure your actual Candy Machine ID.