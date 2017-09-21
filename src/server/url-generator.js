const baseUrl = "https://zhenlu.info/";

export const generateScoreUrl = ( seed, numScores, startRank=0) => {
  const urlModifier = "maze/leaderboard/";
  return `${baseUrl+urlModifier+seed}?start=${startRank}?length=${numScores}`;
};

export const solutionUrl = baseUrl + 'check/';