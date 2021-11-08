import React, { useContext, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import UserContext from "../../context/UserContext";
import UserService from "../../services/UserService";

import ProfilePageTemplate from "../templates/ProfilePageTemplate";


const Profile = ({ match }) => {
	
	const user = useContext(UserContext);
	const userService = new UserService();

	const [ userData, setUserData ] = useState();
	const [ pending, setPending ] = useState(true);
	const [ error, setError ] = useState("");

	useEffect(() => {

		(async () => {

			if(pending && user) {
				try {
					const tempUserData = await userService.fetchUser(match.params.id ? match.params.id : user.uid);
					
					setUserData(tempUserData);
					setPending(false);
				}
				catch(error) {
					setError(error.code);
					setPending(false);
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
	
	if(error.length > 0) {
		return <ProfilePageTemplate error={error} />;
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