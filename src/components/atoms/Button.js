import { Link } from "react-router-dom";
import styled, { css } from "styled-components";

const Button = styled(Link)`
	font-size: 17px;
	text-decoration: none;
	display: block;
	width: ${props => props.width ? `${props.width}px` : "150px"};
	text-align: center;
	padding: 8px 16px;
	border-radius: 5px;
	color: ${props => props.highlighted ? "var(--primary-background)" : "var(--primary-text)"};
	${props => props.highlighted && css`
		background: var(--primary-text);
	`}
	${props => !props.highlighted && css`
		border: 2px solid var(--primary-text);
	`}

`;

export default Button;

