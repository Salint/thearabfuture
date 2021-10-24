import styled from "styled-components";

import TextInput from "../atoms/TextInput";

const Container = styled.div`
	width: ${props => props.width ? `${props.width}%` : "100%"};
	padding: 10px 0;
`;
const Label = styled.label`
	font-size: 15px;
`;

const InputField = (props) => (
	<Container width={props.width}>
		<Label>{props.displayName}:</Label>
		<br />
		<TextInput {...props} />
	</Container>
);

export default InputField;

