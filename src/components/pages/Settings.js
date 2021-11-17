import React, { useContext, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";

import SettingsPageTemplate from "../templates/SettingsPageTemplate";

import UserContext from "../../context/UserContext";
import UserService from "../../services/UserService";


const Settings = () => {
	
	const user = useContext(UserContext);
	const userService = new UserService();

	const [ userData, setUserData ] = useState();
	const [ pending, setPending ] = useState(true);

	useEffect(() => {


		(async () => {

			if(user) {
				setPending(true);
				try {
					const tempUserData = await userService.fetchUser(user.uid);
					
					setUserData(tempUserData);
					setPending(false);
				}
				catch(error) {
					setPending(false);
				}
			}

		})();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if(pending) {
		return <SettingsPageTemplate pending={true} />;
	}
	
	if(!user && !pending) {
		return <Redirect to="/login" />;
	}

	return (
		<SettingsPageTemplate 
			user={userData}
		/>
	)

};

export default Settings;