import React from "react";
import styled, { keyframes } from "styled-components";

import PageTemplate from "./PageTemplate";
import Question from "../molecules/Question";

import LoadingPicture from "../../static/images/loading.png";
import { Link } from "react-router-dom";

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

const Button = styled(Link)`
	display: block;
	width: 200px;
	border-radius: 5px;
	background: var(--main-color);
`;

const QuestionsPageTemplate = ({ error, pending, questions }) => (
	<PageTemplate>
		
		{ pending && <Loading><Image src={LoadingPicture} /></Loading> }
		<Question question={{
			id: "522",
			title: "يوجد مشكلة",
			category: "الذكاء الاصطناعي",
			date: new Date(),
			userData: {
				uid: "",
				username: "Salint",
				profileURL: "https://firebasestorage.googleapis.com/v0/b/thearabfuture.appspot.com/o/users%2F1EDrthRVwTM8Cg1RA5Qn3kJDW4P2%2Fprofile.jpg?alt=media&token=132fab37-b078-4e0e-8a32-567a75c8b8db"
			}
		}} />
	</PageTemplate>
)

export default QuestionsPageTemplate;