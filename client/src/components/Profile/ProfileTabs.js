import React, {Component} from 'react';

export default class ProfileTabs extends Component {
	render() {
		let styles = {
			width: 30
		};

		return (
		<div className="media-body">
                    <div className="row">

                        <div className="col-md-6" >
                            <div className="panel panel-custom2">
                                <div className="panel-body"><font color="#465a64" size="5"><strong>Email Address</strong></font></div>
                                <div className="panel-footer"><font size="4"></font></div>
                            </div>
                            <div className="panel panel-custom2" >
                                <div className="panel-body">
                                    <img style={styles} alt="" src="/img/slackLogo.svg" className="img-circle" />
                                    <font color="#465a64" size="5"><strong>Slack Handle</strong></font>
                                </div>
                                <div className="panel-footer"><font size="4"></font></div>
                            </div>
                        </div>

                    </div>
                </div>
		)
	}
}
