import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Button from "../atoms/Button";

import DefaultUserProfileSource from "../../static/images/user-default.png";

import ContainerBase from '../atoms/Container';

const Container = styled(ContainerBase)`
	background: var(--secondary-background);
	margin: 30px auto;
	padding: 20px 20px;
	border: 1px solid var(--primary-border);
	border-bottom: 5px solid var(--primary-border);
	border-radius: 20px 20px 0 0;
	width: 600px;
	@media (max-width: 650px) {
		width: 90%;
	}
`;
const Title = styled.h1`
	font-size: 30px;
`;
const Category = styled.h6`
	font-size: 13px;
	color: var(--secondary-text);
	margin-top: -3px;
`;
const Date = styled.h6`
	font-size: 13px;
	color: var(--secondary-text);
	margin-top: -3px;
`;
const UserContainer = styled(Link)`
	display: flex;
	align-items: center;
	margin-top: 10px;
	color: var(--primary-text);
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

const View = styled(Button)`
	background: var(--main-color);
	padding: 5px 10px;
	margin-top: 10px;
`;

const Question = ({ question }) => {
	
	const { userData: user } = question;

	return (
		<Container>
			<Title>{question.title}</Title>
			<Category>{question.category}</Category>
			<Date>{question.date.toLocaleDateString()}</Date>
			<UserContainer to={"/profile/" + user.uid}>
				<UserContainerImage src={user.profileURL ? user.profileURL : DefaultUserProfileSource } alt={user.username} />
				<UserContainerName>{user.username}</UserContainerName>
			</UserContainer>
			<View to={"/questions/" + question.id} highlighted={true} width="100">عرض</View>
		</Container>
	);

}

export default Question;