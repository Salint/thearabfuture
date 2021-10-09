import React from "react";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components"

import Logo from "../../static/images/logo32.png";

const Nav = styled.nav`
	display: flex;
	padding: 10px;
	height: 60px;
	align-items: center;
	${props => props.float && css`
		background: var(--primary-background);
		position: fixed;
		width: 100%;
		top: 0;
		left: 0;
	`}
`;

const Container = styled.div`
	flex: 1;
	display: flex;
	align-items: center;
	justify-content: ${props => props.place};
`;

const Image = styled.img`
	width: 32px;
`;

const UL = styled.ul`
	display: flex;
	align-items: center;
	list-style-type: none;
`;

const NavLink = styled(Link)`
	text-decoration: none;
	color: var(--main-text-color);
	margin: 0 10px;
	font-size: 20px;
`;

const NavigationBar = ({ float }) => (
	<Nav float={float}>
		<Container>
			<Link to="/"><Image src={Logo} alt="The Arab Future" /></Link>
		</Container>
		<Container place="center">
			<UL>
				<NavLink to="/articles"><li>مقالات</li></NavLink>
				<NavLink to="/questions"><li>اسئلة</li></NavLink>
				<NavLink to="/projects"><li>المشاريع</li></NavLink>
			</UL>
		</Container>
	</Nav>
);

export default NavigationBar;