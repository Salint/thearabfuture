import React, { useState } from "react";
import { Link } from "react-router-dom";
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


const Success = styled.p`
	width: ${props => props.width ? `${props.width}` : "100%"};
	text-align: center;
	color: black;
	background: rgba(100, 255, 100, 0.3);
	border-bottom: 3px solid lime;
	font-size: 17px;
	padding: 5px 0;
	border-radius: 5px;
`;

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

const ForgetPasswordForm = () => {

	const auth = new AuthService();

	const [ error, setError ] = useState("");
	const [ pending, setPending ] = useState(false);
	const [ success, setSuccess ] = useState(false);
	const [ input, setInput ] = useState("");

	const Submit = async (e) => {
		e.preventDefault();

		setPending(true);
		setError("");

		if(input.length === 0) {
			
			setError("يرجى إدخال بريدك الإلكتروني");
			setPending(false);
				
		}
		else {
			try {

				await auth.resetPassword(input);

				setSuccess(true);
			}
			catch({ code }) {
				setPending(false);

				if(code === "auth/invalid-email") {
					setError("هذا البريد الإلكتروني غير صحيح");
				}
				else if(code === "auth/user-not-found") {
					setError("لا يوجد حساب بهذا البريد");
				}
				else {
					setError("حذث خطأ, الرجاء المحاولة لاحقاً");
				}
			}
		}
	}

	return (
		<Form onSubmit={e => Submit(e)}>
			<H1>إعادة ضبط كلمة السر</H1>
			{ error && <Error width="70%">{error}</Error> }
			{ success && <Success width="70%">تم إرسال البريد بنجاح</Success> }
			<InputField 
				displayName="البريد الإلكتروني" 
				name="email"
				type="email"
				width="70"
				direction="ltr"
				placeholder="salintofficial@hotmail.com"
				disabled={pending}
				onChange={e => setInput(e.target.value)}
			/>
			<Button 
				type="submit"
				disabled={pending}
			>تسجيل الدخول</Button>
			<P><A to="/login">العوده إلى تسجيل الدخول</A>.</P>
		</Form>
	);

};

export default ForgetPasswordForm;