export const LEADERBOARD_TYPE = 'LEADERBOARD';

export function fetchLeaderBoard(seed){
    return {
        type: LEADERBOARD_TYPE,
        payload: fetch('zhenlu.info/leaderboard/'+seed).then( (res) => {
            if(!res.ok) return {'scores': []};
            return res.json()
        })
    }
}