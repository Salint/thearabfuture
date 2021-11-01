import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserShield } from "@fortawesome/free-solid-svg-icons";

import PageTemplate from "./PageTemplate";
import Container from "../atoms/Container";

import BannerSource from "../../static/images/banner-default.png";
import DefaultUserProfileSource from "../../static/images/user-default.png";

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
const ProfilePageTemplate = ({ name, about, profileURL, bannerURL,  moderator, followers, posts }) => (
	<PageTemplate>
		<BaseContainer>
			<Header>
				<Banner src={bannerURL ? bannerURL : BannerSource} />
				<UserData>
					<UserProfile src={profileURL ? profileURL : DefaultUserProfileSource} />
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
	</PageTemplate>
)

export default ProfilePageTemplate;