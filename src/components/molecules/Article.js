import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Button from "../atoms/Button";

import DefaultUserProfileSource from "../../static/images/user-default.png";

import ContainerBase from '../atoms/Container';

const Container = styled(ContainerBase)`
	
	margin: 30px auto;
	padding: 20px 20px;
	border-bottom: 1px solid var(--primary-border);
	width: 800px;
	@media (max-width: 900px) {
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

const Article = ({ article }) => {
	
	const { userData: user } = article;

	return (
		<Container>
			<Title>{article.title}</Title>
			<Category>{article.category}</Category>
			<Date>{article.date.toLocaleDateString()}</Date>
			<UserContainer to={"/profile/" + user.uid}>
				<UserContainerImage src={user.profileURL ? user.profileURL : DefaultUserProfileSource } alt={user.username} />
				<UserContainerName>{user.username}</UserContainerName>
			</UserContainer>
			<View to={"/articles/" + article.id} highlighted={true} width="100">قراءة</View>
		</Container>
	);

}

export default Article;