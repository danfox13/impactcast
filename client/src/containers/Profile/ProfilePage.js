import React, {Component} from 'react';
import {Panel} from 'react-bootstrap';

import ProfileIcon from '../../components/Profile/ProfileIcon';
import ProfileTabs from '../../components/Profile/ProfileTabs';

export default class ProfilePage extends Component {
   render() {
	   return (
		   
		   <div>
		       <Panel header="UserName" bsStyle="primary">
		   	   <div className="media">
				   <ProfileIcon />
				   <ProfileTabs />
		           </div>
		       </Panel>
		   </div>
           )
   }
}
