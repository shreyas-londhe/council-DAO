import { ethers } from "ethers";
import sdk from "./1-initialize-sdk.js";

const voteModule = sdk.getVoteModule(
  "0x4Cd3AAFAF04F2592471083fA5b043746DdEDD3F8"
);

const tokenModule = sdk.getTokenModule(
  "0xbdB6355B597EEDFB90250D76127c3Cf6490bfB7c"
);

(async () => {
  try {
    const amount = 10000;
    await tokenModule.delegateTo(process.env.WALLET_ADDRESS);
    await voteModule.propose(
      `Should the DAO mint an additional ${amount} tokens into the treasury?`,
      [
        {
          nativeTokenValue: 0,
          transactionData: tokenModule.contract.interface.encodeFunctionData(
            "mint",
            [voteModule.address, ethers.utils.parseUnits(amount.toString(), 18)]
          ),
          toAddress: tokenModule.address,
        },
      ]
    );
    console.log("✅ Successfully created proposal to mint tokens");
  } catch (error) {
    console.error("failed to create first proposal", error);
    process.exit(1);
  }

  try {
    const amount = 69;
    await voteModule.propose(
      `Should the DAO transfer ${amount} tokens from the treasury to ${process.env.WALLET_ADDRESS} for being awesome?`,
      [
        {
          nativeTokenValue: 0,
          transactionData: tokenModule.contract.interface.encodeFunctionData(
            "transfer",
            [
              process.env.WALLET_ADDRESS,
              ethers.utils.parseUnits(amount.toString(), 18),
            ]
          ),
          toAddress: tokenModule.address,
        },
      ]
    );
    console.log(
      "✅ Successfully created proposal to reward ourselves from the treasury, let's hope people vote for it!"
    );
  } catch (error) {
    console.error("failed to create second proposal", error);
  }
})();
