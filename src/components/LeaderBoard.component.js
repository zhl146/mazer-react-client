import React, {Component} from 'react';
import LeaderBoardScore from './LeaderBoardScore.component';

class LeaderBoardComponent extends Component {
    constructor(props){
        super(props);
        this.state = { seed: this.props.seed };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount(){
        console.log(this.props);
        this.props.fetchLeaderBoard(this.state.seed);
    }

    handleChange(event) {
        this.setState({seed: event.target.value});
    }

    handleSubmit(event) {
        this.props.fetchLeaderBoard(this.state.seed);
        event.preventDefault();
    }

    render(){
        console.log(this.props);
        return (
            <div>
                <h1>LeaderBoard: {JSON.stringify(this.props.seed)} </h1>
                <h2>Scores: </h2>
                {this.props.scores.map(
                    (score, index) => {
                       return <LeaderBoardScore score={score} key={index} />;
                    }
                )}
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Seed:
                        <input type="text" value={this.state.seed} onChange={this.handleChange} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }
}

export default LeaderBoardComponent;