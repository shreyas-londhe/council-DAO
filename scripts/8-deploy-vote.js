import sdk from "./1-initialize-sdk.js";

const appModule = sdk.getAppModule(
  "0x000e8c04F45D065f0615c24F47Ce8b395e7a8bBb"
);

(async () => {
  try {
    const voteModule = await appModule.deployVoteModule({
      name: "CouncilDAO's Proposals",
      votingTokenAddress: "0xbdB6355B597EEDFB90250D76127c3Cf6490bfB7c",
      proposalStartWaitTimeInSeconds: 0,
      proposalVotingTimeInSeconds: 7 * 24 * 60 * 60,

      // TODO: change this when we have enough people to vote.
      votingQuorumFraction: 0,
      minimumNumberOfTokensNeededToPropose: "1",
    });
    console.log(
      "✅ Successfully deployed vote module, address:",
      voteModule.address
    );
  } catch (err) {
    console.log("Failed to deploy vote module", err);
  }
})();
