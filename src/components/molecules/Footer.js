import React from "react";
import styled from "styled-components";

const FooterSection = styled.footer`
	text-align: center;
	color: rgb(100, 100, 100);
	font-weight: light;
	background: var(--secondary-background);
	padding: 20px 0;
`;


const Title = styled.p`
	font-size: 30px;
`;

const Copyright = styled.p`
	direction: ltr;
	font-size: 15px;
`;

const Footer = () => (

	<FooterSection>
		<Title>The Arab Future</Title>
		<Copyright>(c) The Arab Future {new Date().getFullYear()}. All Rights Reserved.</Copyright>
	</FooterSection>

);

export default Footer;