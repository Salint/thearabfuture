import React, { useState } from "react";
import { Redirect, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faFacebook } from "@fortawesome/free-brands-svg-icons";
import styled from "styled-components";
import AuthService from "../../services/AuthService";
import Error from "../atoms/Error";
import Field from "../molecules/InputField";

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

const ThirdPartyButton = styled.button`
	width: 70%;
	font-size: 16px;
	padding: 8px 0;
	border: none;
	color: white;
	margin: 2px 0;
	cursor: pointer;
`;

const GitHub = styled(ThirdPartyButton)`background: black;`;
const Facebook = styled(ThirdPartyButton)`background: #4267B2;`;

const InputField = styled(Field)`
	direction: ltr;
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
	margin-bottom: 20px;
	padding: 5px 0;
	width: 70%;
	cursor: pointer;
`;

const P = styled.p`
	font-size: 16px;
`;
const A = styled(Link)`
	color: #41abe8;
	text-decoration: none;

	&:hover {
		text-decoration: underline;
	}
`;

const SignupForm = () => {

	const auth = new AuthService();

	const [ error, setError ] = useState("");
	const [ pending, setPending ] = useState(false);
	const [ success, setSuccess ] = useState(false);
	const [ input, setInput ] = useState({
		username: "",
		email: "",
		password: "",
		passwordConfirm: "",
	});

	const handleInput = (e) => {
		setInput({
			...input,
			[e.target.name]: e.target.value
		})
	};

	const AuthWithThirdParty = async (e, provider) => {
		e.preventDefault();

		setPending(true); 
		
		try {

			await auth.AuthWithThirdParty(provider);

			setSuccess(true);
		}
		catch({ message }) {
			setPending(false);
			setError(message);
		}
	}

	const Submit = async (e) => {
		e.preventDefault();

		setPending(true);

		if(input.username.length === 0 || 
		input.email.length === 0 || 
		input.password.length === 0 || 
		input.passwordConfirm.length === 0) {
			
			setError("يرجى املاء جميع الخانات");
			setPending(false);
				
		}
		else if(input.password !== input.passwordConfirm) {
			setError("كلمات المرور غير متشابهه");
			setPending(false);
		}
		else {
			try {

				await auth.createAccountWithEmail(input.email, input.username, input.password);

				setSuccess(true);
			}
			catch({ message }) {
				setPending(false);
				setError(message);
			}
		}
	}

	return (
		<Form onSubmit={e => Submit(e)}>
			<H1>إنشاء حساب</H1>
			{ error && <Error width="70%">{error}</Error> }
			<GitHub type="button" onClick={e => AuthWithThirdParty(e, "github")} ><FontAwesomeIcon icon={faGithub} /> تسجيل الدخول بإستخدام GitHub</GitHub>
			<Facebook type="button" onClick={e => AuthWithThirdParty(e, "facebook")} ><FontAwesomeIcon icon={faFacebook} /> تسجيل الدخول بإستخدام Facebook</Facebook>
			<InputField 
				displayName="أسم المستخدم" 
				name="username"
				type="text"
				width="70"
				placeholder="Salint"
				disabled={pending}
				onChange={e => handleInput(e)}
			/>
			<InputField 
				displayName="البريد الإلكتروني" 
				name="email"
				type="email"
				width="70"
				placeholder="salintofficial@hotmail.com"
				disabled={pending}
				onChange={e => handleInput(e)}
			/>
			<InputField 
				displayName="كلمة السر" 
				name="password"
				type="password"
				width="70"
				placeholder="•••••••••"
				disabled={pending}
				onChange={e => handleInput(e)}
			/>
			<InputField 
				displayName="اعادة كلمة السر" 
				name="passwordConfirm"
				type="password"
				width="70"
				placeholder="•••••••••"
				disabled={pending}
				onChange={e => handleInput(e)}
			/>
			<Button 
				type="submit"
				disabled={pending}
			>أنشئ حساب</Button>
			<P>بإنشائك حساب, فأنت توافق على <A to="/terms">شروط الخدمة</A>.</P>
			<br />
			<P>لديك حساب بالفعل؟ <A to="/login">تسجيل الدخول</A></P>
			{ success && <Redirect to="/"/> }
		</Form>
	);

};

export default SignupForm;