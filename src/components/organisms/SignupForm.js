import React from "react";
import styled from "styled-components";
import InputField from "../molecules/InputField";

const Form = styled.form`
	
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 500px;
	margin: 0 auto 50px auto;
	background: var(--secondary-background);
	border: 1px solid var(--primary-border);
	position: relative;
	padding: 30px;

	@media (max-width: 600px) {
		width: 90%;
	}
`;

const H1 = styled.h1`
	font-size: 30px;
	margin-bottom: 20px;
`;

const Button = styled.button`
	background: var(--main-color);
	color: white;
	border: none;
	font-size: 18px;
	position: relative;
	top: 10px;
	padding: 5px 0;
	width: 70%;
`;

const SignupForm = () => {

	return (
		<Form>
			<H1>إنشاء حساب</H1>
			<InputField 
				displayName="أسم المستخدم" 
				name="username"
				type="text"
				width="70"
				placeholder="Salint"
			/>
			<InputField 
				displayName="البريد الإلكتروني" 
				name="email"
				type="email"
				width="70"
				placeholder="salintofficial@hotmail.com"
			/>
			<InputField 
				displayName="كلمة السر" 
				name="password"
				type="password"
				width="70"
				placeholder="•••••••••"
			/>
			<InputField 
				displayName="اعادة كلمة السر" 
				name="passwordConfirm"
				type="password"
				width="70"
				placeholder="•••••••••"
			/>
			<Button 
				type="submit"
			>أنشئ حساب</Button>
		</Form>
	);

};

export default SignupForm;