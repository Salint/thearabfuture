import React from "react";
import styled from "styled-components";

import PageTemplate from "./PageTemplate";

import NavigationBar from "../organisms/Navbar";

import HeaderImage from "../../static/images/header.png"
import Introduction from "../molecules/home/Introduction";

const Header = styled.nav`
	background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${HeaderImage}) center no-repeat;
	background-size: cover;
	color: white;
	height: 100vh;
	overflow: hidden;
	position: relative;
`;
const Section = styled.section`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 80%;
`;
const H1 = styled.p`
	font-size: 50px;
	
	@media(max-width: 500px) {
		font-size: 30px;
	}
`;
const H4 = styled.p`
	font-size: 30px;

	@media(max-width: 500px) {
		font-size: 20px;
	}
`;

const HomePageTemplate = () => (
	<PageTemplate navbar="off">
		<Header>
			<NavigationBar theme="light" />
			<Section>
				<H1>The Arab Future</H1>
				<H4>مقر كل مبرمج عربي...</H4>
			</Section>
		</Header>
		<Introduction />
	</PageTemplate>
);

export default HomePageTemplate;