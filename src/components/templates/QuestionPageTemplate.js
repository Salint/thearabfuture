import React from "react";
import { Link } from "react-router-dom";
import MarkdownView from "react-showdown";
import styled, { keyframes } from "styled-components";

import PageTemplate from "./PageTemplate";
import NotFound from "../molecules/NotFound";

import DefaultUserProfileSource from "../../static/images/user-default.png";

import LoadingPicture from "../../static/images/loading.png";

const Rotate = keyframes`
	from {
		transform: rotate(0);
	}
	to {
		transform: rotate(360deg);
	}
`;

const Loading = styled.section`
	font-size: 100px;
	text-align: center;
	margin: 80px 0;
`;

const Image = styled.img`
	width: 100px;
	animation: ${Rotate} 1s infinite;
	animation-timing-function: linear;
	opacity: 0.5;
`;

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

const QuestionPageTemplate = ({ error, pending, question }) => {
	
	return (
		<PageTemplate>
			{ pending && <Loading><Image src={LoadingPicture} /></Loading> }
			{ !error && !pending && 
				<QuestionSection>
					<Title>{question.title}</Title>
					<UserContainer to={"/profile/" + question.userData.uid}>
						<UserContainerImage src={question.userData.profileURL ? question.userData.profileURL : DefaultUserProfileSource } alt={question.userData.username} />
						<UserContainerName>{question.userData.username}</UserContainerName>
					</UserContainer>
					<MarkdownView markdown={question.content} className="markdown-view"/>
				</QuestionSection>
			}
		</PageTemplate>
	);
}

export default QuestionPageTemplate;