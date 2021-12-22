import { ethers } from "ethers";
import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

const app = sdk.getAppModule("0x000e8c04F45D065f0615c24F47Ce8b395e7a8bBb");

(async () => {
  try {
    const bundleDropModule = await app.deployBundleDropModule({
      name: "CouncilDAO Membership",
      description: "Membership for the CouncilDAO",
      image: readFileSync("scripts/assets/nitt.png"),
      primarySaleRecipientAddress: ethers.constants.AddressZero,
    });
    console.log(
      "✅ Successfully deployed bundleDrop module, address:",
      bundleDropModule.address
    );
    console.log(
      "✅ bundleDrop metadata:",
      await bundleDropModule.getMetadata()
    );
  } catch (error) {
    console.log("failed to deploy bundleDrop module", error);
  }
})();
