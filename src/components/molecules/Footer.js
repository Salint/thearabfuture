import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram, faTwitter, faGithub } from "@fortawesome/free-brands-svg-icons";

import Logo from "../../static/images/logo_footer.png";

const FooterSection = styled.footer`
	color: rgb(100, 100, 100);
	font-weight: light;
	background: var(--secondary-background);
	padding: 50px 50px 20px 50px;
	border-top: 1px solid var(--primary-border);
`;
const LinksSection = styled.section`
	display: flex;
	flex-direction: row-reverse;

	@media (max-width: 900px) {
		display: block;
	}
`;
const Container = styled.div`
	flex: 1;
`;
const SummaryContainer = styled(Container)`
	direction: ltr;

	@media (max-width: 900px) {
		text-align: center;
	}
`;
const Image = styled.img`
	opacity: 0.5;
	width: 240px;
	transition: opacity .5s;

	&:hover {
		opacity: 0.6;
	}
`;
const Socials = styled.div`
	text-align: center;
	width: 240px;
	position: relative;
	direction: ltr;

	@media (max-width: 900px) {
		margin: 0 auto 20px auto;
	}
`;

const SocialLink = styled.a`
	font-size: 30px;
	margin: 0 6.4%;
	color: rgb(120, 120, 120);
	transition: color .5s;

	&:hover {
		color: rgb(90, 90, 80);
	}
`;
const LinksContainer = styled(Container)`
	flex: 5;
	display: flex;	
`;

const List = styled.ul`
	flex: 1;
	list-style-type: none;

	@media (max-width: 700px) {
		text-align: center;
	}
`;

const ListTitle = styled.h1`
	font-size: 18px;
	color: var(--main-color);
	margin-bottom: 10px;
`;
const ListLink = styled(Link)`
	font-size: 18px;
	color: rgb(100, 100, 100);
	text-decoration: none;

	&:hover {
		text-decoration: underline;
	}
`;
const CopyrightNotice = styled.p`
	text-align: center;
	font-size: 15px;
	border-top: 1px solid rgb(200, 200, 200);
	margin-top: 20px;
	padding-top: 20px;
	
`

const Footer = () => (

	<FooterSection>
		<LinksSection>
			<SummaryContainer>
				<Image src={Logo} alt="Logo" />
				<Socials>
					<SocialLink href="https://facebook.com/thearabfuture"><FontAwesomeIcon icon={faFacebook} /></SocialLink>
					<SocialLink href="https://instagram.com/thearabfuture"><FontAwesomeIcon icon={faInstagram} /></SocialLink>
					<SocialLink href="https://twitter.com/thearabfuture"><FontAwesomeIcon icon={faTwitter} /></SocialLink>
					<SocialLink href="https://github.com/thearabfuture"><FontAwesomeIcon icon={faGithub} /></SocialLink>
				</Socials>
			</SummaryContainer>
			<LinksContainer>
				<List>
					<ListTitle>الموقع</ListTitle>
					<li><ListLink to="/projects">المشاريع</ListLink></li>
					<li><ListLink to="/questions">الأسئلة</ListLink></li>
					<li><ListLink to="/articles">المقالات</ListLink></li>
				</List>
				<List>
					<ListTitle>السياسات</ListTitle>
					<li><ListLink to="/terms">شروط الخدمة</ListLink></li>
					<li><ListLink to="/privacy">سياسة الخصوصية</ListLink></li>
				</List>
				<List>
					<ListTitle>للمطورين</ListTitle>
					<li><ListLink to="/help/api">API</ListLink></li>
				</List>
			</LinksContainer>
		</LinksSection>
		<CopyrightNotice>The Arab Future © {new Date().getFullYear()}</CopyrightNotice>
	</FooterSection>

);

export default Footer;