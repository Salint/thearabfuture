import React from "react";
import { Redirect } from "react-router-dom";
import { AuthProvider, IfFirebaseAuthed, IfFirebaseUnAuthed } from "../../../context/FirebaseAuthContext";

import PageTemplate from "../../templates/PageTemplate";

import NewQuestionForm from "../../organisms/questions/NewQuestionForm";

const NewQuestion = () => (
	<AuthProvider>
		<IfFirebaseUnAuthed>
			<Redirect to="/login" />
		</IfFirebaseUnAuthed>
		<IfFirebaseAuthed>
			<PageTemplate>
				<NewQuestionForm />
			</PageTemplate>
		</IfFirebaseAuthed>
	</AuthProvider>

);

export default NewQuestion;