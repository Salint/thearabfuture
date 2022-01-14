import React, { useContext, useEffect, useState } from "react";
import ArticleService from "../../services/ArticleService";
import UserService from "../../services/UserService";

import UserContext from "../../context/UserContext";

import ArticlesPageTemplate from "../templates/ArticlesPageTemplate";

const Articles = ({ match }) => {
	
	const articleService = new ArticleService();
	const userService = new UserService();

	const user = useContext(UserContext);

	const [ articles, setArticles ] = useState([]);
	const [ pending, setPending ] = useState(true);
	const [ isWriter, setWriter ] = useState(false);
	const [ error, setError ] = useState("");

	useEffect(() => {

		(async () => {

			setPending(true);
			try {
				const tempArticles = await articleService.fetchArticles();
				setArticles(tempArticles);
	
				const isWriterTemp = await userService.isUserWriter(user.uid);
				setWriter(isWriterTemp);

				setPending(false)
			}
			catch(error) {
				setError(error);
				setPending(false);
			}
	})();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	

	if(pending) {
		return <ArticlesPageTemplate 
			pending={true} 
			articles={[]}	
		/>;
	}
	
	if(error.length > 0) {

		console.log("error");
		return <ArticlesPageTemplate 
			error={error} 
			articles={[]}	
		/>;
		
	}
	
	return (
		<>
			<ArticlesPageTemplate 
				articles={articles}
				isWriter={isWriter}
			/>
		</>
	)

};

export default Articles;