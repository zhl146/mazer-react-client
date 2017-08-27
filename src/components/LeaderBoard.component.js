import React, {Component} from 'react'


class LeaderBoardComponent extends Component {
    componentWillMount(){
        this.props.fetchLeaderBoard(this.props.seed);
    }

    render(){
        console.log(this.props);
        return (
            <div>
                <h1>I am LeaderBoardComponent</h1>
                <h2>Scores: {this.props.scores}</h2>
            </div>
        )
    }
}

export default LeaderBoardComponent;