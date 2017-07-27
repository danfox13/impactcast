import React, {Component} from 'react';
import {Panel, Media} from 'react-bootstrap';

import ProfileIcon from '../../components/Profile/ProfileIcon';
import ProfileTabs from '../../components/Profile/ProfileTabs';

export default class ProfilePage extends Component {
   render() {
	   return (
		   
		   <div>
		       <Panel header="UserName" bsStyle="primary">
		   	   <Media>
				   <ProfileIcon />
				   <ProfileTabs />
		           </Media>
		       </Panel>
		   </div>
           )
   }
}
