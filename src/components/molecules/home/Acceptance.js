import React from "react";
import styled from "styled-components";

import BaseContainer from "../../atoms/Container";
import BaseButton from "../../atoms/Button";

const Container = styled(BaseContainer)`
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 100px auto;
	flex-direction: column;
	text-align: center;
	
`;

const Button = styled(BaseButton)`
	margin: 0 10px;
`;

const H1 = styled.h1`
	font-size: 30px;
	
	@media(max-width: 500px) {
		font-size: 30px;
	}
`;

const P = styled.p`
	font-size: 20px;
	margin-bottom: 20px;

	@media(max-width: 500px) {
		font-size: 20px;
	}
`;

const Acceptance = () => (

	<Container>
		<H1>الكل مُرحب به هنا</H1>
		<P>من مبتدئين لخبراء, من خبرة عدة ايام إلى سنوات, الكل  متاح له استخدام "The Arab Future"</P>
		<Button to="/privacy" highlighted width="200">سياسة الخصوصية</Button>
	</Container>

);

export default Acceptance;