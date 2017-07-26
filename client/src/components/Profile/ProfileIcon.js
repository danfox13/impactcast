import React, {Component} from 'react';

export default class ProfileIcon extends Component {
	render() {
		let style = {
		    width: 200,
		    margin_left: 250

		};
		return (
		<div className="media-left media-top">
                    <img src="/img/avatar.png" className="img-circle" style={style}/>
                </div>
		)
	}
}
