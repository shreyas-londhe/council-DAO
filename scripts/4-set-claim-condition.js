import sdk from "./1-initialize-sdk.js";

const bundleDrop = sdk.getBundleDropModule(
  "0x9C399e69D035e5Ca3564a85248751fAE94cAcAd2"
);

(async () => {
  try {
    const claimConditionFactory = await bundleDrop.getClaimConditionFactory();
    claimConditionFactory.newClaimPhase({
      startTime: new Date(),
      maxQuantity: 50_000,
      maxQuantityPerTransaction: 1,
    });
    await bundleDrop.setClaimCondition(0, claimConditionFactory);
    console.log("✅ Sucessfully set claim condition!");
  } catch (error) {
    console.error("failed to set claim condition", error);
  }
})();
