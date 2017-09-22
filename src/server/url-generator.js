const baseUrl = "http://localhost:4000/";

export const generateScoreUrl = ( seed, numScores, startRank=0) => {
  const urlModifier = "leaderboard/";
  return `${baseUrl+urlModifier+seed}?start=${startRank}&length=${numScores}`;
};

export const solutionUrl = baseUrl + 'maze/check/';
