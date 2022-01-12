import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import MarkdownView from "react-showdown";
import styled from "styled-components";
import QuestionService from "../../../services/QuestionService";
import Error from "../../atoms/Error";

import UserContext from "../../../context/UserContext";

const Title = styled.h1`
	font-size: 30px;
	text-align: center;
	margin: 20px 0 20px 0;
`;

const Form = styled.form`
	width: 800px;
	margin: 0 auto;

	@media (max-width: 850px) {
		width: 90%;
	}
`;

const Editor = styled.section`
	border: 1px solid var(--primary-border);
	border-bottom: 5px solid var(--primary-border);
	width: 100%;
	margin: 0 auto;
	position: relative;
	overflow: hidden;
	border-radius: 5px;
	margin-bottom: 20px;
`;
const Field = styled.textarea`
	resize: none;
	width: 100%;
	border: none;
	padding: 5px 10px;
	font-size: 18px;
	direction: ltr;

	&:focus {
		outline: none;
	}
`;

const Label = styled.label`
	font-size: 15px;
`;

const Button = styled.button`
	text-decoration: none;
	color: white;
	width: 150px;
	background: var(--main-color);
	margin: 30px auto;
	display: block;
	text-align: center;
	font-size: 17px;
	padding: 10px 0;
	border-radius: 5px;
	cursor: pointer;
	border: none;
`;

const AnswerForm = ({ id }) => {

	const questionService = new QuestionService();
	const userContext = useContext(UserContext);

	const [ error, setError ] = useState("");
	const [ pending, setPending ] = useState(false);
	const [ success, setSuccess ] = useState(false);
	const [ input, setInput ] = useState("");

	const handleInput = (e) => {
		setInput(e.target.value);
	};

	const Submit = async (e) => {
		e.preventDefault();
	
		setPending(false);
		setError("");

		
		if(input.length === 0) {
			
			setError("يرجى املاء جميع الخانات");
			setPending(false);
				
		}
		else {

			try {
				
				await questionService.addAnswer(id, userContext.uid, input);
				setSuccess(true);
			}
			catch(error) {
				setError(error.message);
			}
		}

	};

	return (
		<Form onSubmit={e => Submit(e)}>
			{ success && <Redirect to="/questions" /> }
			<Title>الديك إجابه؟</Title>
			{ error && <Error>{error}</Error> }
			
			<Label>الاجابة:</Label>
			<Editor>
				<Field
					name="content"
					rows="10"
					disabled={pending}
					onChange={e => handleInput(e)}
				></Field>
			</Editor>
			<Label>عرض مسبق:</Label>
			<hr></hr>
			<br />
			<MarkdownView markdown={input.content} className="markdown-view"/>
			<Button
				disabled={pending}
				type="submit"
			>نشر الأجابة</Button>
		</Form>
	);
};

export default AnswerForm;