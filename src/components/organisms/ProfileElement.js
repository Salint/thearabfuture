import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH, faUserShield } from "@fortawesome/free-solid-svg-icons";

import Container from "../atoms/Container";

import BannerSource from "../../static/images/banner-default.png";
import DefaultUserProfileSource from "../../static/images/user-default.png";
import { Link } from "react-router-dom";
import { useState } from "react/cjs/react.development";

const BaseContainer = styled(Container)`
	margin: 50px auto;
	background: var(--secondary-background);
	border: 1px solid var(--primary-border);
	border-radius: 5px;
	overflow: hidden;
	padding-bottom: 20px;
`;

const Header = styled.section`
	position: relative;
`;

const Banner = styled.img`
	width: 100%;
	height: 230px;
	object-fit: cover;
`;

const UserData = styled.section`
	text-align: center;
	margin-top: -100px;
`;
const UserProfile = styled.img`
	width: 200px;
	height: 200px;
	object-fit: cover;
	border-radius: 50%;
	border: 5px solid var(--primary-border);
	
	@media (max-width: 800px) {
		width: 150px;
		height: 150px;
	}
`;
const OptionsSection = styled.section`
	text-align: right;
	padding: 0 20px;
	margin-top: -90px;
	margin-bottom: 73px;

	@media (max-width: 800px) {

		margin-top: -45px;
		margin-bottom: 28px;
	}
`;
const OptionsButton = styled.button`
	background: none;
	border: none;
	font-size: 20px;
	cursor: pointer;
`;

const OptionsList = styled.ul`
	background: var(--primary-background);
	border: 1px solid var(--primary-border);
	border-radius: 5px;
	width: 150px;
	padding: 5px 0;
	position: absolute;
	list-style-type: none;

`;

const OptionsListItem = styled.li`
	padding: 2px 10px;
	cursor: pointer;

	&:hover {
		background: var(--secondary-background);
		color: white;
	}
`;

const OptionsListItemButton = styled.button`
	background: none;
	border: none;
	font-size: 13px;
	color: var(--primary-text);
	text-decoration: none;
	cursor: pointer;
`;

const OptionsListItemLink = styled(Link)`
	background: none;
	border: none;
	font-size: 13px;
	color: var(--primary-text);
	text-decoration: none;
	cursor: pointer;
`;

const UserName = styled.h1`
	font-size: 50px;
	margin-top: 10px;
	
	@media (max-width: 800px) {
		font-size: 30px;
	}
`;

const Moderator = styled.p`
	font-size: 17px;
	background: var(--main-color);
	width: 100px;
	color: white;
	margin: -5px auto 0 auto;
	border-radius: 5px;
	padding: 5px 0;
	
	@media (max-width: 800px) {
		margin: -2px auto 0 auto;
		font-size: 15px;
		padding: 2px 0;
		width: 80px;
	}
`;

const About = styled.p`
	font-size: 17px;
	margin-top: 10px;
	color: gray;
`;

const Stats = styled.section`
	display: flex;
	align-items: center;
	justify-content: center;
	margin-top: 20px;
`;
const Stat = styled.p`
	color: gray;
	margin: 0 30px;
	font-size: 17px;
	font-weight: bold;
`;
const StatNumber = styled.span`
	color: black;
`;


const ProfileElement = ({ name, about, profileURL, bannerURL,  moderator, followers, posts, personal, onLogout }) => {

	const [ options, toggleOptions ] = useState(false);
	
	return (
		<BaseContainer>
			<Header>
				<Banner src={bannerURL ? bannerURL : BannerSource} />
				<UserData>
					<UserProfile src={profileURL ? profileURL : DefaultUserProfileSource} />
					{ personal === true && 
						<OptionsSection>
							<OptionsButton onClick={() => toggleOptions(!options)}><FontAwesomeIcon icon={faEllipsisH} /></OptionsButton>
							{ options && 
								<OptionsList>
									<OptionsListItem><OptionsListItemButton onClick={onLogout}>تسجيل الخروج</OptionsListItemButton></OptionsListItem>
									<OptionsListItem><OptionsListItemLink to="/settings/">الإعدادات</OptionsListItemLink></OptionsListItem>
								</OptionsList>
							}
						</OptionsSection>
					}
					<UserName>{name}</UserName>
					{ moderator && <Moderator><FontAwesomeIcon icon={faUserShield} /> مشرف</Moderator> }
					{ about && <About>{about}</About> }
					<Stats>
						<Stat><StatNumber>{followers}</StatNumber> متابعون</Stat>
						<Stat><StatNumber>{posts}</StatNumber> منشورات</Stat>
					</Stats>
				</UserData>
			</Header>
		</BaseContainer>
	);
};

export default ProfileElement;