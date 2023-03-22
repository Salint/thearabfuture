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

const Answer = styled.section`
	border-top: 1px solid var(--primary-border);
	padding-top: 30px;
`;


const Date = styled.h6`
	font-size: 13px;
	color: var(--secondary-text);
	margin-top: -3px;
`;


const QuestionElement = ({ question }) => {

	const { title, author: user, content, date, answers } = question;

	return (
		<QuestionSection>
			<Title>{title}</Title>
			<Date>{date.toDate().toLocaleDateString()}</Date>
			<UserContainer to={"/profile/" + user.uid}>
				<UserContainerImage src={user.photoURL ? user.photoURL : DefaultUserProfileSource } alt={user.username} />
				<UserContainerName>{user.username}</UserContainerName>
			</UserContainer>
			<MarkdownView markdown={content} className="markdown-view"/>
			{ answers.map(({ id, content, date, author: user }) => 
				<Answer id={id}>
					<UserContainer to={"/profile/" + user.uid}>
						<UserContainerImage src={user.photoURL ? user.photoURL : DefaultUserProfileSource } alt={user.username} />
						<UserContainerName>{user.username}</UserContainerName>
					</UserContainer>
					<Date>{date.toDate().toLocaleDateString()}</Date>
					<br />
					<MarkdownView markdown={content} className="markdown-view"/>	
				</Answer>	
			)}
		</QuestionSection>
	);
};

export default QuestionElement;