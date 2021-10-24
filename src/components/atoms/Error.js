import styled from "styled-components";

const Error = styled.p`
	width: ${props => props.width ? `${props.width}` : "100%"};
	text-align: center;
	color: red;
	background: rgba(255, 0, 0, 0.3);
	border-bottom: 3px solid red;
	font-size: 17px;
	padding: 5px 0;
	border-radius: 5px;
`;

export default Error;