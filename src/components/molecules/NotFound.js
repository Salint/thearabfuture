import React from "react";
import styled from "styled-components";

import BaseContainer from "../atoms/Container";
import BaseButton from "../atoms/Button";

import ImageSource from "../../static/images/not-found.png";

const Container = styled(BaseContainer)`
	text-align: center;
	margin: 100px auto;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const Image = styled.img`
	width: 150px;
`;

const H1 = styled.h1`
	font-size: 30px;
`;

const Button = styled(BaseButton)`
	background: var(--main-color);
	color: white;
	margin-top: 20px;
`;

const NotFound = () => (

	<Container>
		<Image src={ImageSource} />
		<H1>هذه الصفحة غير موجوده!</H1>
		<Button to="/" highlighted>الصفحة الرئيسية</Button>
	</Container>

);

export default NotFound;