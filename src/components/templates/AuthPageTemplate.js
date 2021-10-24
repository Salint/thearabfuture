import React from "react";
import { Redirect } from "react-router";
import styled from "styled-components";
import { AuthProvider, IfFirebaseAuthed, IfFirebaseUnAuthed } from "../../context/FirebaseAuthContext";

import PageTemplate from "./PageTemplate";

const Title = styled.p`
	text-align: center;
	color: rgb(150, 150, 150);
	font-size: 40px;
	margin: 60px 0;
`;

const AuthPageTemplate = ({ children }) => (
	<AuthProvider>
		<IfFirebaseAuthed>
			<Redirect to="/" />
		</IfFirebaseAuthed>
		<IfFirebaseUnAuthed>
			<PageTemplate navbar="off">
				<Title>The Arab Future</Title>
				{ children }
			</PageTemplate>
		</IfFirebaseUnAuthed>
	</AuthProvider>
);

export default AuthPageTemplate;