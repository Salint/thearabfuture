import React, { useContext, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import UserContext from "../../context/UserContext";
import AuthService from "../../services/AuthService";
import UserService from "../../services/UserService";

import ProfilePageTemplate from "../templates/ProfilePageTemplate";


const Profile = ({ match }) => {
	
	const user = useContext(UserContext);
	const userService = new UserService();
	const authService = new AuthService();

	const [ userData, setUserData ] = useState();
	const [ personal, setPersonal ] = useState(false);
	const [ pending, setPending ] = useState(true);
	const [ error, setError ] = useState("");
	const [ redirect, setRedirect ] = useState(false);

	useEffect(() => {


		(async () => {

			if(user) {
				setPending(true);
				try {
					const tempUserData = await userService.fetchUser(match.params.id ? match.params.id : user.uid);
					
					setPersonal(match.params.id === user.uid ? true : false);
					setUserData(tempUserData);
					setError("");
					setPending(false);
				}
				catch(error) {
					setError(error.code);
					setPending(false);
				}
			}

		})();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [match.params.id]);

	const onLogout = async () => {
		setPending(true);

		try {
			await authService.logOut();

			setRedirect(true);
		}
		catch(error) {
			setError(error);
		}
	}
	
	if(redirect) {
		return <Redirect to="/" />;
	}
	
	if(pending) {
		return <ProfilePageTemplate pending={true} />;
	}
	
	if(!user && !pending) {
		return <Redirect to="/login" />;
	}
	if(!match.params.id) {
		return <Redirect to={"/profile/" + user.uid} />;
	}
	
	
	if(error.length > 0) {
		return <ProfilePageTemplate error={error} />;
	}
	
	return (
		<>
			<ProfilePageTemplate 
				name={userData.username} 
				about={userData.about} 
				followers={userData.followers} 
				profileURL={userData.profileURL}
				bannerURL={userData.bannerURL}
				posts={userData.posts} 
				moderator={userData.moderator}
				personal={personal}
				onLogout={onLogout}
			/>
		</>
	)

};

export default Profile;