import React from "react";
import styled from "styled-components";

import DefaultUserProfileSource from "../../../static/images/user-default.png";
import { Link } from "react-router-dom";
import MarkdownView from "react-showdown";

const QuestionSection = styled.section`
	width: 900px;
	margin: 0 auto;
	padding: 20px 0;

	@media (max-width: 1000px) {
		width: 90%;
	}
`;

const Title = styled.h1`
	font-size: 40px;
`;

const UserContainer = styled(Link)`
	display: flex;
	align-items: center;
	margin-bottom: 10px;
	color: var(--primary-text);
	width: fit-content;
	text-decoration: none;
`;
const UserContainerImage = styled.img`
	width: 25px;
	border-radius: 50%;
	border: 1px solid var(--primary-border);
`;

const UserContainerName = styled.p`
	font-size: 15px;
	margin-right: 5px;
`;



const QuestionElement = ({ question }) => {

	const { title, userData: user, content } = question;
	
	return (
		<QuestionSection>
			<Title>{title}</Title>
			<UserContainer to={"/profile/" + user.uid}>
				<UserContainerImage src={user.profileURL ? user.profileURL : DefaultUserProfileSource } alt={user.username} />
				<UserContainerName>{user.username}</UserContainerName>
			</UserContainer>
			<MarkdownView markdown={content} className="markdown-view"/>
		</QuestionSection>
	);
};

export default QuestionElement;