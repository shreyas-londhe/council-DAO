import { ethers } from "ethers";
import sdk from "./1-initialize-sdk.js";

const bundleDropModule = await sdk.getBundleDropModule(
  "0x9C399e69D035e5Ca3564a85248751fAE94cAcAd2"
);

const tokenModule = await sdk.getTokenModule(
  "0xbdB6355B597EEDFB90250D76127c3Cf6490bfB7c"
);

(async () => {
  try {
    const wallletAddresses = await bundleDropModule.getAllClaimerAddresses("0");
    if (wallletAddresses.length === 0) {
      console.log(
        "No NFTs have been claimed yet, maybe get some friends to claim your free NFTs!"
      );
      process.exit(0);
    }

    const airdropTargets = wallletAddresses.map((address) => {
      //   const randomAmount = Math.floor(Math.random() * (100 - 10 + 1) + 10);
      //   console.log("✅ Going to airdrop", randomAmount, "tokens to", address);
      const airdropTarget = {
        address,
        // amount: ethers.utils.parseUnits(randomAmount.toString(), 18),
        amount: ethers.utils.parseUnits("1", 18),
      };
      return airdropTarget;
    });

    console.log("🌈 Starting airdrop...");
    await tokenModule.transferBatch(airdropTargets);
    console.log(
      "✅ Successfully airdropped tokens to all the holders of the NFT!"
    );
  } catch (err) {
    console.error("Failed to airdrop tokens", err);
  }
})();
