import React, { useContext, useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments } from "@fortawesome/free-solid-svg-icons";

import NavigationBar from "./Navbar";

import HeaderImage from "../../static/images/dashboard.jpg";

import LoadingPicture from "../../static/images/loading.png";
import QuestionService from "../../services/QuestionService";
import UserContext from "../../context/UserContext";

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


const DashboardContainer = styled.nav`
	background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url(${HeaderImage}) center no-repeat;
	background-size: cover;
	color: white;
	height: 100vh;
	overflow: hidden;
	position: relative;
	
	@media (max-width: 800px) {
		height: 200vh;
		
	}
`;

const Container = styled.section`
	display: flex;
	height: calc(100% - 130px);
	margin-bottom: 20px;
	
	@media (max-width: 800px) {
		flex-direction: column;
	}
`;
	
const Section = styled.section`
	flex: 1;
	background: var(--primary-background);
	height: 100%;
	margin: 0 20px;
	border-radius: 5px;
	padding: 15px;
	border-bottom: 5px solid var(--primary-border);

	@media (max-width: 800px) {
		flex-direction: column;
		margin: 20px;
	}
`;
const SectionTitle = styled.h1`
	font-size: 30px;
	color: var(--primary-text);
`;

const Question = styled.section`
	width: 100%;
	box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
	margin: 20px 0;
	border-radius: 5px;
	padding: 15px;
`;
const QuestionTitle = styled.h1`

	font-size: 25px;
	color: var(--primary-text);
`;

const QuestionContent = styled.p`

	font-size: 16px;
	color: var(--secondary-text);
	margin-top: 10px;
	height: 70px;
	overflow: hidden;
`;

const QuestionInfo = styled.section`
	margin-top: 5px;
	border-top: 1px solid rgba(0, 0, 0, 0.1);
	padding-top: 10px;
	display: flex;
	align-items: center; 
`;

const QuestionStat = styled.p`
	color: var(--secondary-text);
	font-size: 18px;
`;

const QuestionLink = styled(Link)`
	font-size: 18px;
	text-decoration: none;
	display: block;
	text-align: center;
	padding: 8px 16px;
	border-radius: 5px;
	color: #5284DC;
	font-weight: bold;

	&:hover {
		text-decoration: underline;
	}
`;


const DashboardUI = ({ pending, questions }) => (
	<DashboardContainer>
		<NavigationBar theme="light" />
		<Container>
			<Section>
				<SectionTitle>اسئلتك</SectionTitle>
				
				{ pending && <Loading><Image src={LoadingPicture} /></Loading> }
				{ !pending && questions.map(({ id, title, content, answers }) => <Question>
					<QuestionTitle>{title}</QuestionTitle>
					<QuestionContent>{content}</QuestionContent>
					<QuestionInfo>
						<QuestionStat><FontAwesomeIcon icon={faComments} /> {answers.length} إجابات</QuestionStat>
						<QuestionLink to={"/questions/" + id}>فتح</QuestionLink>
					</QuestionInfo>
				</Question>)}
			</Section>
			<Section>
				<SectionTitle>ما الجديد؟</SectionTitle>
			</Section>
		</Container>
	</DashboardContainer>
);

const Dashboard = () => {

	const user = useContext(UserContext);
	const questionService = new QuestionService();

	const [ questions, setQuestions ] = useState([]);
	const [ pending, setPending ] = useState(true);
	const [ error, setError ] = useState("");

	useEffect(() => {

		(async () => {

			setPending(true);
			try {
				const tempQuestions = await questionService.fetchQuestionsByUser(user.uid);
				
				setQuestions(tempQuestions);
				setPending(false);

				console.log(questions);
			}
			catch(error) {
				setError("question/unknown-error");
				setPending(false);
			}
	})();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	

	if(pending) {
		return <DashboardUI 
			pending={true} 
			questions={[]}	
		/>;
	}
	
	if(error.length > 0) {

		return <DashboardUI 
			error={error} 
			questions={[]}	
		/>;
		
	}
	
	return (
		<>
			<DashboardUI
				questions={questions}
			/>
		</>
	)

};

export default Dashboard;