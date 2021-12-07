import { faEnvelope, faLink } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

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
	font-size: 40px;
`;
const Description = styled.h6`
	font-size: 15px;
	color: var(--secondary-text);
	margin-top: -5px;
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
const ProjectInfo = styled.a`
	font-size: 15px;
	display: flex;
	align-items: center;
	text-decoration: none;
	color: #5284DC;
	font-weight: bold;
	margin: 5px 0;

	&:hover {
		text-decoration: underline;
	}
`;
const ProjectInfoSpan = styled.span`
	color: gray;
	margin-left: 5px;
`;
const StatusContainer = styled.section`
	display: flex;
	align-items: center;
	color: ${props => props.isActive ? "#4B9543" : "#DA6666" };
	margin-top: 10px;
`;
const StatusCircle = styled.section`
	width: 10px;
	height: 10px;
	border-radius: 50%;
	margin-left: 5px;
	background: ${props => props.isActive ? "#4B9543" : "#DA6666" };
`;
const StatusLine = styled.div`
	width: 100%;
	height: 5px;
	margin-top: 10px;
	border-radius: 5px;
	background: ${props => props.isActive ? "#4B9543" : "#DA6666" };
`;

const Project = ({ project }) => {
	
	const { userData: user } = project;

	return (
		<Container>
			<Title>{project.title}</Title>
			<Description>{project.description}</Description>
			<UserContainer to={"/profile/" + user.uid}>
				<UserContainerImage src={user.profileURL ? user.profileURL : DefaultUserProfileSource } alt={user.username} />
				<UserContainerName>{user.username}</UserContainerName>
			</UserContainer>
			{ project.link && <ProjectInfo href={project.link}><ProjectInfoSpan><FontAwesomeIcon icon={faLink} /></ProjectInfoSpan> {project.link}</ProjectInfo> }
			{ project.email && <ProjectInfo href={"mailto:" + project.email}><ProjectInfoSpan><FontAwesomeIcon icon={faEnvelope} /></ProjectInfoSpan> {project.email}</ProjectInfo> }
			<StatusContainer isActive={project.isActive}>
				<StatusCircle isActive={project.isActive} />
				<h1>{ project.isActive ? "نشط" : "قيد التطوير" }</h1>
			</StatusContainer>
			<StatusLine isActive={project.isActive} />
		</Container>
	);

}

export default Project;