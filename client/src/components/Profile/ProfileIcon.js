import React, {Component} from 'react';
import {Media, Image} from 'react-bootstrap';

export default class ProfileIcon extends Component {
	render() {
		return (
		<Media align="top">
                    <Image width={250} src="/img/avatar.png" className="icon"/>
                </Media>
		)
	}
}
