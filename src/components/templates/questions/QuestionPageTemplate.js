import React from "react";
import styled, { keyframes } from "styled-components";

import PageTemplate from "../PageTemplate";
import NotFound from "../../molecules/NotFound";

import LoadingPicture from "../../../static/images/loading.png";
import QuestionElement from "../../organisms/questions/QuestionElement";

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


const QuestionPageTemplate = ({ error, pending, question }) => (

	<PageTemplate>
		{ pending && <Loading><Image src={LoadingPicture} /></Loading> }
		{ (!pending && error === "question/question-not-found") && <NotFound /> }
		{ (!pending && !error) && <QuestionElement question={question}/> }
	</PageTemplate>
);

export default QuestionPageTemplate;