const baseUrl = "https://zhenlu.info/maze/";

export const createScoreUrl = (seed, numScores, startRank=0) => {
  const urlModifier = "leaderboard/";
  return `${baseUrl+urlModifier+seed}?start=${startRank}?length=${numScores}`;
};
