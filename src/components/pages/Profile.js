import React, { useContext, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useState } from "react/cjs/react.development";
import UserContext from "../../context/UserContext";
import UserService from "../../services/UserService";

import ProfilePageTemplate from "../templates/ProfilePageTemplate";


const Profile = () => {
	
	const user = useContext(UserContext);
	const userService = new UserService();

	const [ userData, setUserData ] = useState();
	const [ pending, setPending ] = useState(true);
	

	useEffect(() => {

		(async () => {

			if(pending && user) {
				try {
					const tempUserData = await userService.fetchUser(user.uid);
					
					setUserData(tempUserData);
					setPending(false);
				}
				catch(error) {
					throw error;
				}
			}

		})();
	});

	if(!user) {
		return <Redirect to="/login" />;
	}

	if(pending) {
		return <></>;
	}

	return (
		<ProfilePageTemplate name={userData.username} about={userData.about} followers={userData.followers} posts={userData.posts} />
	)

};

export default Profile;