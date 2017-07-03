/**
 * @author - Greg Wolverson
 */
import React, {Component} from 'react';
import Team from '../../components/Team/Team';
import TeamMembers from '../../components/Team/TeamMembers';
import TeamForecast from '../../components/Team/TeamForecast';

export default class TeamPage extends Component {
    render() {
        return (
            <div>
                <Team />
                <TeamMembers />
                <TeamForecast />
            </div>
        )
    }
}