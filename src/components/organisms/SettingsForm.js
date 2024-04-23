import React, { useContext, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import styled from "styled-components";
import UserService from "../../services/UserService";

import Error from "../atoms/Error";
import InputField from "../molecules/InputField";

import BannerSource from "../../static/images/banner-default.png";
import DefaultUserProfileSource from "../../static/images/user-default.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import UserContext from "../../context/UserContext";

const Form = styled.form`
	
	display: flex;
	flex-direction: column;
	align-items: center;
	background: var(--secondary-background);
	border: 1px solid var(--primary-border);
	position: relative;
	padding: 30px;

	width: 900px;
	margin: 50px auto;

	@media (max-width: 950px) {
		width: 90%;
	}
`;


const H1 = styled.h1`
	font-size: 30px;
	margin-bottom: 20px;
`;

const BannerEdit = styled(Link)`
	background: url(${props => props.src ? props.src : BannerSource}) center no-repeat;
	background-size: cover;
	height: 230px;
	width: 100%;
	border: none;
	text-align: center;
	border: 1px solid var(--primary-border);
	text-decoration: none;
	color: white;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	&:hover {
		background: linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${props => props.src ? props.src : BannerSource}) center no-repeat;
		background-size: cover;
		cursor: pointer;
	}	
	* {
		display: none;
		color: white;
	}
	&:hover * {
		display: initial;
	}
`;
const Icon = styled.h1`
	font-size: 40px;
`;

const ProfilePictureEdit = styled(Link)`
	background: url(${props => props.src ? props.src : DefaultUserProfileSource}) center no-repeat;
	background-size: cover;
	height: 200px;
	width: 200px;
	border: none;
	text-align: center;
	border: 5px solid var(--primary-border);
	text-decoration: none;
	color: white;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	border-radius: 50%;
	margin-top: -40px;
	margin-bottom: 50px;

	@media (max-width: 700px) {
		height: 150px;
		width: 150px;
	}

	&:hover {
		background: linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${props => props.src ? props.src : DefaultUserProfileSource}) center no-repeat;
		background-size: cover;
		cursor: pointer;
	}	
	* {
		display: none;
		color: white;
	}
	&:hover * {
		display: initial;
	}
`;

const Button = styled.button`
	background: var(--main-color);
	color: white;
	border: none;
	font-size: 18px;
	position: relative;
	top: 10px;
	margin-bottom: 20px;
	padding: 5px 0;
	width: 50%;
	cursor: pointer;
`;

const SettingsForm = ({ user }) => {

	const userObj = useContext(UserContext);

	const userService = new UserService();
	const { uid, username, about, profileURL, bannerURL } = user;

	const [ error, setError ] = useState("");
	const [ pending, setPending ] = useState(false);
	const [ success, setSuccess ] = useState(false);
	const [ input, setInput ] = useState({
		username: username,
		about: about ? ( about.length !== 0 ? about : "" ) : ""
	});

	const handleInput = (e) => {
		setInput({
			...input,
			[e.target.name]: e.target.value
		})
	};

	const Submit = async (e) => {
		e.preventDefault();

		setPending(true);

		if(input.username.length === 0) {
			
			setError("يرجى كتابة إسم");
			setPending(false);
				
		}
		else {
			try {

				await userService.updateUser(uid, input.username, input.about);
				await userObj.updateProfile({
					displayName: input.username
				})

				setSuccess(true);
			}
			catch({ message }) {
				setPending(false);
				setError(message);
			}
		}
	}

	return (
		<Form onSubmit={e => Submit(e)}>
			<H1>الإعدادات</H1>
			<BannerEdit src={bannerURL} to="/settings/cover">
				<Icon><FontAwesomeIcon icon={faPencilAlt} /></Icon>
				<br />
				<h1>تغيير الخلفيه</h1>
			</BannerEdit>
			<ProfilePictureEdit src={profileURL} to="/settings/profile">
				<Icon><FontAwesomeIcon icon={faPencilAlt} /></Icon>
				<br />
				<h1>تغيير الصورة</h1>
			</ProfilePictureEdit>
			{ error && <Error width="50%">{error}</Error> }
			{ success && <Redirect to={"/profile/" + user.uid} /> }
			<InputField 
				displayName="الأسم" 
				name="username"
				type="text"
				width="50"
				direction="ltr"
				defaultValue={username}
				disabled={pending}
				placeholder="XXXXX YYYYY"
				onChange={e => handleInput(e)}
			/>
			<InputField 
				displayName="السيرة الذاتية" 
				name="about"
				type="text"
				width="50"
				direction="ltr"
				disabled={pending}
				defaultValue={about ? about : ""}
				placeholder="اعمل في شركه....."
				onChange={e => handleInput(e)}
			/>
			<Button 
				type="submit"
				disabled={pending}
			>حفظ التعديلات</Button>
		</Form>
	);

};

export default SettingsForm;