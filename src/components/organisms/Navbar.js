import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Logo from "../../static/images/logo32.png";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const Nav = styled.nav`
	display: flex;
	padding: 10px 50px;
	height: 80px;
	align-items: center;
	color: ${props => props.theme === "light" ? "white" : "var(--main-text-color)" };
	${props => props.float && css`
		background: var(--primary-background);
		border-bottom: 1px solid rgb(220, 220, 220);
		position: fixed;
		width: 100%;
		top: 0;
		left: 0;
	`}

	@media (max-width: 1000px) {
		padding: 0px 20px;
	}
`;

const Container = styled.div`
	flex: 1;
	display: flex;
	align-items: center;
	justify-content: ${props => props.place};
	overflow: hidden;
`;

const BarContainer = styled.div`
	display: none;
	flex: 1;
	align-items: center;
	justify-content: flex-end;
	
	@media (max-width: 1000px) {
		display: flex;
	}
`;

const Image = styled.img`
	width: 32px;
`;

const UL = styled.ul`
	display: flex;
	align-items: center;
	list-style-type: none;

	@media (max-width: 1000px) {
		position: absolute;
		flex-direction: column;
		align-items: flex-start;
		background: rgba(0, 0, 0, 0.8);
		height: 100%;
		width: 30%;
		padding-top: 50px;
		z-index: 0;
		top: 0;
		left: ${props => props.active ? "0" : "-30%"};
		overflow: hidden;
		transition: left .5s;
	}
`;

const NavLink = styled(Link)`
	text-decoration: none;
	margin: 0 10px;
	font-size: 20px;
	color: ${props => props.theme === "light" ? "white" : "var(--main-text-color)" };
`;
const Button = styled.button`
	color: ${props => props.theme === "light" ? "white" : "var(--main-text-color)" };
	background: none;
	border: none;
	font-size: 32px;
	cursor: pointer;
	z-index: 1;
`;

const NavigationBar = ({ float, theme }) => {
	
	const [ active, setActive ] = useState(false);

	return (
		<Nav float={float} theme={theme}>
			<Container>
				<Link to="/"><Image src={Logo} alt="The Arab Future" /></Link>
			</Container>
			<Container place="flex-end">
				<UL active={active} theme={theme}>
					<NavLink to="/articles" theme={theme}><li>مقالات</li></NavLink>
					<NavLink to="/questions" theme={theme}><li>اسئلة</li></NavLink>
					<NavLink to="/projects" theme={theme}><li>المشاريع</li></NavLink>
				</UL>
			</Container>
			<BarContainer>
				<Button onClick={e => setActive(!active)}><FontAwesomeIcon icon={faBars} /></Button>
			</BarContainer>
		</Nav>
	);
};

export default NavigationBar;