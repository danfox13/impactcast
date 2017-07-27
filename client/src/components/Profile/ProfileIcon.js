import React, {Component} from 'react';
import {Media, Image} from 'react-bootstrap';
import './profile.css';

export default class ProfileIcon extends Component {
	render() {
		return (
		<Media.Left align="top">
                    <Image width={250} src="/img/avatar.png" className="profile-icon img-circle"/>
                </Media.Left>
		)
	}
}
