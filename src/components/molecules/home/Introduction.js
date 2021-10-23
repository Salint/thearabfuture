import React from "react";
import styled from "styled-components";

import BaseContainer from "../../atoms/Container";
import BaseButton from "../../atoms/Button";

import SupportImage from "../../../static/images/support.png";

const Container = styled(BaseContainer)`
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 100px auto;

	@media (max-width: 700px) {
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;
	}
`;

const Image = styled.img`
	width: 200px;
	margin-left: 30px;
	
	@media (max-width: 700px) {
		margin: 0 0 50px 0;
	}
`;

const Section = styled.section`
	margin: 0;
`;

const ButtonSection = styled.section`
	display: flex;
	align-items: center;
	
	@media (max-width: 700px) {
		justify-content: center;
	}
`;

const Button = styled(BaseButton)`
	margin-left: 20px;

	@media (max-width: 700px) {
		margin: 0 10px;
	}
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

const Introduction = () => (

	<Container>
		<Image src={SupportImage} />
		<Section>
			<H1>احصل على مساعدة دائمة</H1>
			<P>اطرح سؤالا في اي لغة برمجة او قم بمساعدة الآخرين في مشاكلهم!</P>
			<ButtonSection>
				<Button to="/auth/signup" highlighted width="160">أنشئ حسابًا</Button>
				<Button to="/tos" width="160">شروط الإستخدام</Button>
			</ButtonSection>
		</Section>
	</Container>

);

export default Introduction;