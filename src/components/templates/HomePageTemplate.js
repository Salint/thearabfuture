import React from "react";
import styled from "styled-components";

import PageTemplate from "./PageTemplate";

import NavigationBar from "../organisms/Navbar";

import HeaderImage from "../../static/images/header.png"

const Header = styled.nav`
	background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${HeaderImage}) center no-repeat;
	background-size: cover;
	color: white;
	height: 100vh;
`;
const Section = styled.section`
	text-align: center;
	padding-top: 30vh;
`;
const H1 = styled.section`
	font-size: 50px;
`;
const H4 = styled.section`
	font-size: 30px;
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
	</PageTemplate>
);

export default HomePageTemplate;