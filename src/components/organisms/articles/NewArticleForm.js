import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import MarkdownView from "react-showdown";
import styled from "styled-components";

import InputField from "../../molecules/InputField";
import Error from "../../atoms/Error";

import ArticleService from "../../../services/ArticleService";

import UserContext from "../../../context/UserContext";

const Title = styled.h1`
	font-size: 40px;
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

const NewArticleForm = () => {

	const articleService = new ArticleService();
	const userContext = useContext(UserContext);

	const [ error, setError ] = useState("");
	const [ pending, setPending ] = useState(false);
	const [ success, setSuccess ] = useState(false);
	const [ input, setInput ] = useState({
		title: "",
		category: "",
		content: ""
	});

	const handleInput = (e) => {
		setInput({
			...input,
			[e.target.name]: e.target.value
		})
	};

	const Submit = async (e) => {
		e.preventDefault();
	
		setPending(false);
		setError("");

		
		if(input.title.length === 0 || 
			input.category.length === 0|| 
			input.content.length === 0) {
			
			setError("يرجى املاء جميع الخانات");
			setPending(false);
				
		}
		else {

			try {
				
				await articleService.addArticle(userContext.uid, input.title, input.category, input.content);
				setSuccess(true);
			}
			catch(error) {
				setError(error.message);
			}
		}

	};

	return (
		<Form onSubmit={e => Submit(e)}>
			{ success && <Redirect to="/articles" /> }
			<Title>مقال جديد</Title>
			{ error && <Error>{error}</Error> }
			<InputField 
				displayName="العنوان" 
				name="title"
				type="text"
				width="100"
				direction="rtl"
				placeholder='كيف تكون نشاطي اكثر'
				disabled={pending}
				onChange={e => handleInput(e)}
			/>
			<InputField 
				displayName="الفئة" 
				name="category"
				type="text"
				width="100"
				direction="rtl"
				placeholder='برمجة'
				disabled={pending}
				onChange={e => handleInput(e)}
			/>
			<Label>المحتوى:</Label>
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
			>نشر المقال</Button>
		</Form>
	);
};

export default NewArticleForm;