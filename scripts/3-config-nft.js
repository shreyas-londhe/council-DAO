import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

const bundleDrop = sdk.getBundleDropModule(
  "0x9C399e69D035e5Ca3564a85248751fAE94cAcAd2"
);

(async () => {
  try {
    await bundleDrop.createBatch([
      {
        name: "Pride of India Certificate",
        description: "This NFT will give you access to the Council DAO",
        image: readFileSync("scripts/assets/certificate.jpg"),
      },
    ]);
    console.log("✅ Successfully created a new NFT in the drop!");
  } catch (error) {
    console.error("failed to create the new NFT", error);
  }
})();
