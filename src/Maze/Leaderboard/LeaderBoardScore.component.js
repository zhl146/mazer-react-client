import React, {Component} from 'react';


class LeaderBoardScoreComponent extends Component {
    render(){
        return <div className='score'>{this.props.score.name +" : "+ this.props.score.score}</div>;
    }

}

export default LeaderBoardScoreComponent;