import React from "react";
import styled, { keyframes } from "styled-components";

import PageTemplate from "./PageTemplate";
import Project from "../molecules/Project";

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

const Warning = styled.p`
	text-align: center;
	font-size: 17px;
	margin: 80px 0;
`;


const ProjectsPageTemplate = ({ error, pending, projects }) => (
	<PageTemplate>
		{ pending && <Loading><Image src={LoadingPicture} /></Loading> }
		{ projects.length === 0 && !pending && <Warning>لا توجد مشاريع حتى الآن.</Warning> }
		{ projects && projects.map(project => <Project key={project.id} project={project} />) }
	</PageTemplate>
)

export default ProjectsPageTemplate;