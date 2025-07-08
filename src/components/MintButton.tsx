import React from "react";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { mplCoreCandyMachine, mintV1 } from "@metaplex-foundation/mpl-core-candy-machine";
import { web3JsEddsa } from "@metaplex-foundation/umi-eddsa-web3js";
import { createWalletAdapterIdentity } from "@metaplex-foundation/umi-signer-wallet-adapters";
import { useWallet } from "@solana/wallet-adapter-react";

const MintButton: React.FC = () => {
    const wallet = useWallet();

    const handleMint = async () => {
        if (!wallet.connected || !wallet.publicKey) {
            alert("Please connect your wallet first.");
            return;
        }

        try {
            const umi = createUmi("https://api.mainnet-beta.solana.com")
                .use(web3JsEddsa())
                .use(mplCoreCandyMachine())
                .use(createWalletAdapterIdentity(wallet));

            const nftMint = umi.eddsa.generateKeypair();

            await mintV1(umi, {
                candyMachine: "FziqDHZfCgRGm1t6MTcrGFiym8hyzLx5PfTmVt1RzLpa", // Candy Machine ID
                collection: "3DKf4RhyZuGGHp92MHZGk59kY3kG4a5VMHFW5RzHoxfn", // Collection Mint
                candyGuard: "7tAC5keCKBHGB4FKvDX4GkD7DgGkSR2ZwPCobaVzZYDD", // Candy Guard ID
                nftMint,
            }).sendAndConfirm(umi);

            alert("✅ NFT minted successfully!");
        } catch (error) {
            console.error(error);
            alert(`❌ Mint failed: ${error}`);
        }
    };

    return (
        <button
            onClick={handleMint}
            style={{
                padding: "12px 24px",
                fontSize: "16px",
                backgroundColor: "#111",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                marginTop: "20px"
            }}
        >
            Mint for 0.2 SOL
        </button>
    );
};

export default MintButton;
