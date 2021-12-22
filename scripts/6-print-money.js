import { ethers } from "ethers";
import sdk from "./1-initialize-sdk.js";

const tokenModule = await sdk.getTokenModule(
  "0xbdB6355B597EEDFB90250D76127c3Cf6490bfB7c"
);

(async () => {
  try {
    const amount = 1000;
    const amountWith18Decimals = ethers.utils.parseUnits(amount.toString(), 18);
    await tokenModule.mint(amountWith18Decimals);
    const totalSupply = await tokenModule.totalSupply();
    console.log(
      "✅ There now is",
      ethers.utils.formatUnits(totalSupply, 18),
      "$PRIDE in circulation"
    );
  } catch (error) {
    console.error("Failed to print money", error);
  }
})();
