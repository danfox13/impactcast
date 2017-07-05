import React, {Component} from 'react';
import { browserHistory } from 'react-router';

export default class CreateTeam extends Component {
    constructor() {
        super();
        this.state = {
            teamName: ''
        };

        this.createTeam = this.createTeam.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleRedirect = this.handleRedirect.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        this.createTeam();
    }

    createTeam() {
        let url = 'http://localhost:3001/newTeam';
        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                teamName: this.state.teamName,
            })
        }).then(response => response.json())
            .then(this.handleRedirect)
            .catch(err => console.log(err));
    }

    handleRedirect(response) {
        if(response.result.teamName) {
            browserHistory.push('team/' + response.result.teamName);
        }
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    render() {
        return (
            <div className="panel panel-default">
                <div className="panel-heading text-cente">
                    <h1>Create a New Team</h1>
                </div>
                <div className="panel-body">

                    <form onSubmit={this.handleSubmit} data-toggle="validator" role="form">

                        <div className="form-group has-feedback">
                            <label htmlFor="teamName" className="control-label">Team Name:</label>

                            <div className="input-group">
                                <span className="input-group-addon">T</span>
                                <input type="text" className="form-control" id="teamName" name="teamName" required
                                    value={this.state.teamName} onChange={this.handleInputChange}/>
                            </div>
                            <span className="glyphicon form-control-feedback" aria-hidden="true"/>
                            <div className="help-block with-errors"/>
                        </div>

                        <input type="submit" value="Create Team" className="btn btn-success btn-lg btn-block"/>
                    </form>
                </div>
            </div>
        )
    }
}