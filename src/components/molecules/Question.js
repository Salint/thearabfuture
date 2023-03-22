import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Button from "../atoms/Button";

import DefaultUserProfileSource from "../../static/images/user-default.png";

const Container = styled(Link)`
	margin: 0 auto 10px;
	padding: 30px 20px;
	width: 600px;
	display: block;
	text-decoration: none;
	color: var(--primary-text);

	@media (max-width: 650px) {
		width: 90%;
	}

	+ a {
		
		border-top: 1px solid var(--primary-border);
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
const DateElement = styled.h6`
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


const Question = ({ question }) => {
	
	const { title, category, date, author: user } = question.data();

	return (
		<Container to={"/questions/" + question.id}>
			<Title>{title}</Title>
			<Category>{category}</Category>
			<DateElement>{date.toDate().toLocaleDateString()}</DateElement>
			<UserContainer to={"/profile/" + user.uid}>
				<UserContainerImage src={user.photoURL ? user.photoURL : DefaultUserProfileSource } alt={user.username} />
				<UserContainerName>{user.username}</UserContainerName>
			</UserContainer>
		</Container>
	);

}

export default Question;