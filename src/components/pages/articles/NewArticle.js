import React from "react";
import { Redirect } from "react-router-dom";
import { AuthProvider, IfFirebaseAuthed, IfFirebaseUnAuthed } from "../../../context/FirebaseAuthContext";

import PageTemplate from "../../templates/PageTemplate";

import NewArticleForm from "../../organisms/articles/NewArticleForm";

const NewArticle = () => (
	<AuthProvider>
		<IfFirebaseUnAuthed>
			<Redirect to="/login" />
		</IfFirebaseUnAuthed>
		<IfFirebaseAuthed>
			<PageTemplate>
				<NewArticleForm />
			</PageTemplate>
		</IfFirebaseAuthed>
	</AuthProvider>

);

export default NewArticle;