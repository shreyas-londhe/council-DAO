import sdk from "./1-initialize-sdk.js";

const app = sdk.getAppModule("0x000e8c04F45D065f0615c24F47Ce8b395e7a8bBb");

(async () => {
  try {
    const tokenModule = await app.deployTokenModule({
      name: "CouncilDAO Governance Token",
      symbol: "PRIDE",
    });
    console.log(
      "✅ Successfully deployed token module, address:",
      tokenModule.address
    );
  } catch (error) {
    console.error("failed to deploy token module", error);
  }
})();
