import React, { useEffect, useState } from "react";
import QuestionService from "../../services/QuestionService";

import QuestionsPageTemplate from "../templates/QuestionsPageTemplate";

const Questions = () => {
	
	const questionService = new QuestionService();

	const [ questions, setQuestions ] = useState([]);
	const [ pending, setPending ] = useState(true);
	const [ error, setError ] = useState("");

	useEffect(() => {

		(async () => {

			setPending(true);
			try {
				const tempQuestions = await questionService.fetchQuestions();
				
				setQuestions(tempQuestions);
				setPending(false)
			}
			catch(error) {
				setError("question/unknown-error");
				setPending(false);
			}
	})();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	

	if(pending) {
		return <QuestionsPageTemplate 
			pending={true} 
			questions={[]}	
		/>;
	}
	
	if(error.length > 0) {

		return <QuestionsPageTemplate 
			error={error} 
			questions={[]}	
		/>;
		
	}
	
	return (
		<>
			<QuestionsPageTemplate 
				questions={questions}
			/>
		</>
	)

};

export default Questions;