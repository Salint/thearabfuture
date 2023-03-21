import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faBars } from "@fortawesome/free-solid-svg-icons";
import UserContext from "../../context/UserContext";

import Logo from "../../static/images/logo.png";

import DefaultUserProfileSource from "../../static/images/user-default.png";
import UserService from "../../services/UserService";

const Nav = styled.nav`
	display: flex;
	padding: 10px 30px;
	height: 60px;
	align-items: center;
	color: ${props => props.theme === "light" ? "white" : "var(--main-text-color)" };
	z-index: 1;
	${props => props.float && css`
		background: var(--primary-background);
		border-bottom: 1px solid rgb(220, 220, 220);
		position: fixed;
		width: 100%;
		top: 0;
		left: 0;
	`}

	@media (max-width: 1000px) {
		padding: 0px 20px;
	}
`;

const NavHelper = styled.div`
	width: 100%;
	height: 80px;
`;

const Container = styled.div`
	flex: ${props => props.flex ? props.flex : "1"};
	display: flex;
	align-items: center;
	justify-content: ${props => props.place};
	overflow: hidden;
`;


const BarContainer = styled.div`
	display: none;
	flex: 1;
	align-items: center;
	justify-content: left;
	
	@media (max-width: 700px) {
		display: flex;
	}
`;

const LogoContainer = styled(Container)`
	justify-content: flex-end;

	@media (max-width: 700px) {		
		justify-content: center;
	}
`;

const Image = styled.img`
	width: 30px;
`;

const ProfileImage = styled(Image)`
	border-radius: 50%;

`;

const UL = styled.ul`
	display: flex;
	align-items: center;
	list-style-type: none;

	@media (max-width: 700px) {
		position: fixed;
		flex-direction: column;
		align-items: flex-start;
		background: var(--primary-background);
		height: 100%;
		width: 40%;
		padding-top: 50px;
		z-index: 2;
		top: 0;
		left: ${props => props.active ? "0" : "-60%"};
		overflow: hidden;
		transition: left .5s;
		border-right: 1px solid var(--primary-border);
	}
`;

const NavLink = styled(Link)`
	text-decoration: none;
	margin: 0 10px;
	font-size: 17px;
	color: ${props => props.theme === "light" ? "white" : "var(--main-text-color)" };
	
	@media (max-width: 700px) {
		font-size: 20px;
		margin: 0;
		padding: 10px;
		width: 100%;
		border-bottom: 1px solid var(--primary-border);
		color: var(--primary-text);
	}
`;

const Button = styled.button`
	color: ${props => (!props.isActive && props.theme === "light") ? "white" : "black" };
	background: none;
	border: none;
	font-size: 32px;
	cursor: pointer;
	z-index: 3;
`;

const NavigationBar = ({ float, theme }) => {
	
	const user = useContext(UserContext); 
	const userService = new UserService();

	const [ active, setActive ] = useState(false);
	const [ profile, setProfile ] = useState();

	useEffect(() => {


		(async () => {

			if(user) {
				try {
					const URL = await userService.getUserProfileURL(user.uid);
					
					setProfile(URL);
				}
				catch(error) {
					console.log(error);
				}
			}

		})();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<Nav float={float} theme={theme}>
				<Container place="flex-start">
					{!user ?
						
						<Link to="/login" theme={theme}><ProfileImage src={DefaultUserProfileSource} alt="The Arab Future" /></Link> :
						<Link to={"/profile/" + user.uid} theme={theme}><ProfileImage src={profile ? profile : DefaultUserProfileSource} alt="User" /></Link>

					}
				</Container>
				<UL active={active}>
					<NavLink to="/articles" theme={theme}><li>مقالات</li></NavLink>
					<NavLink to="/questions" theme={theme}><li>اسئلة</li></NavLink>
					<NavLink to="/projects" theme={theme}><li>المشاريع</li></NavLink>
				</UL>
				<LogoContainer>
					<Link to="/"><Image src={Logo} alt="The Arab Future" /></Link>
				</LogoContainer>
				<BarContainer>
					<Button onClick={e => setActive(!active)} isActive={active} theme={theme}><FontAwesomeIcon icon={faBars} /></Button>
				</BarContainer>
			</Nav>
			{float && <NavHelper />}
		</>
	);
};

export default NavigationBar;