import styled from "styled-components";

const Input = styled.input`
	width: 100%;
	font-size: 17px;
	border: 1px solid var(--primary-border);
	border-bottom: 5px solid var(--primary-border);
	padding: 5px 10px;
	margin-top: 5px;
	border-radius: 5px;

	&:focus {
		border: 1px solid var(--secondary-color);
		border-bottom: 5px solid var(--secondary-color);
		outline: none;
	}
`;

const TextInput = (props) => (
	
	<Input {...props} />

);

export default TextInput;

