const local = process.env.REACT_APP_LOCAL || false
const baseUrl = local ? 'http://localhost:4000/' : 'https://zhenlu.info/maze/'

export const leaderboardUrl = baseUrl + 'leaderboard'
export const solutionUrl = baseUrl + 'maze/check/'
