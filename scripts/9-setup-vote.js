import { ethers } from "ethers";
import sdk from "./1-initialize-sdk.js";

const voteModule = await sdk.getVoteModule(
  "0x4Cd3AAFAF04F2592471083fA5b043746DdEDD3F8"
);

const tokenModule = await sdk.getTokenModule(
  "0xbdB6355B597EEDFB90250D76127c3Cf6490bfB7c"
);

(async () => {
  try {
    await tokenModule.grantRole("minter", voteModule.address);
    console.log(
      "Successfully gave vote module permissions to act on token module"
    );
  } catch (error) {
    console.error(
      "failed to grant vote module permissions on token module",
      error
    );
    process.exit(1);
  }

  try {
    const ownedTokenBalance = await tokenModule.balanceOf(
      process.env.WALLET_ADDRESS
    );
    const ownedAmount = ethers.BigNumber.from(ownedTokenBalance.value);
    const communityTreasuryPercentage = 75;
    const percent = ownedAmount.div(100).mul(communityTreasuryPercentage);
    await tokenModule.transfer(voteModule.address, percent);
    console.log("✅ Successfully transferred tokens to vote module");
  } catch (err) {
    console.error("failed to transfer tokens to vote module", err);
  }
})();
