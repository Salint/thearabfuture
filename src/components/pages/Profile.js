import React, { useContext, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
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

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if(!user) {
		return <Redirect to="/login" />;
	}

	if(pending) {
		return <ProfilePageTemplate pending={true} />;
	}

	return (
		<ProfilePageTemplate 
			name={userData.username} 
			about={userData.about} 
			followers={userData.followers} 
			profileURL={userData.profileURL}
			bannerURL={userData.bannerURL}
			posts={userData.posts} 
			moderator={userData.moderator}
		/>
	)

};

export default Profile;