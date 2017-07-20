/**
 * @author - Greg Wolverson
 */
import React, {Component} from 'react';
import {loadDocument} from '../../api';

import Team from '../../components/Team/Team';
import TeamMembers from '../../components/Team/TeamMembers';
import TeamForecast from '../../components/Team/TeamForecast';

export default class TeamPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            team: {},
            teamForecast: []
        };

        this.loadDocument = loadDocument.bind(this);
        this.loadDocument('/team/' + this.props.params.teamName);
    }

    render() {
        return (
            <div>
                <Team
                    teamName={this.state.team.teamName}
                />
                <TeamMembers
                    team={this.state.team}
                />
                <TeamForecast
                    teamName={this.state.team.teamName}
                    teamForecast={this.state.teamForecast}
                />
            </div>
        )
    }
}