import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import QuestionService from "../../../services/QuestionService";

import QuestionPageTemplate from "../../templates/questions/QuestionPageTemplate";


const Question = ({ match }) => {
	
	const questionService = new QuestionService();

	const [ question, setQuestion ] = useState();
	const [ pending, setPending ] = useState(true);
	const [ error, setError ] = useState("");

	useEffect(() => {

		(async () => {

			setPending(true);
			try {
				const tempQuestion = await questionService.getQuestion(match.params.id);
				
				setQuestion(tempQuestion);
				setError("");
				setPending(false);
			}
			catch(error) {
				setError(error.code);
				setPending(false);
			}

		})();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [match.params.id]);
	
	if(pending) {
		return <QuestionPageTemplate pending={true} />;
	}
	
	if(!match.params.id) {
		return <Redirect to="/questions" />;
	}
	
	
	if(error.length > 0) {
		return <QuestionPageTemplate error={error} />;
	}
	
	return (
		<>
			<QuestionPageTemplate 
				question={question}
			/>
		</>
	)

};

export default Question;