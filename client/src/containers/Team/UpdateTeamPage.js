/**
 * @author: Artur Komoter
 */
import React, {Component} from 'react';
import UpdateTeam from '../../components/Team/UpdateTeam';

export default class UpdateTeamPage extends Component {
    render() {
        return (
            <UpdateTeam teamName={this.props.params.teamName}/>
        )
    }
}