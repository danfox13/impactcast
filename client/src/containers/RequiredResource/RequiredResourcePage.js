/**
 * @author: Artur Komoter
 */

import React, {Component} from "react";

import RequiredResourceDetails from "../../components/RequiredResource/RequiredResourceDetails";
import Impact from "../../components/RequiredResource/Impact";

export default class RequiredResourcePage extends Component
{
	render()
	{
		return (
			<div>
				<RequiredResourceDetails/>
				<Impact/>
			</div>
		)
	}
}