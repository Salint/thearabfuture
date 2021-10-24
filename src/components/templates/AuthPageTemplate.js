import React from "react";
import styled from "styled-components";

import PageTemplate from "./PageTemplate";

const Title = styled.p`
	text-align: center;
	color: rgb(100, 100, 100);
`;

const AuthPageTemplate = ({ children }) => (
	<PageTemplate navbar="off">
		<Title>The Arab Future</Title>
		{ children }
	</PageTemplate>
);

export default AuthPageTemplate;