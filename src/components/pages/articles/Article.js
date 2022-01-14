import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import ArticleService from "../../../services/ArticleService";

import ArticlePageTemplate from "../../templates/articles/ArticlePageTemplate";

const Article = ({ match }) => {
	
	const articleService = new ArticleService();

	const [ article, setArticle ] = useState();
	const [ pending, setPending ] = useState(true);
	const [ error, setError ] = useState("");

	useEffect(() => {

		(async () => {

			setPending(true);
			try {
				const tempArticle = await articleService.getArticle(match.params.id);
				
				setArticle(tempArticle);
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
		return <ArticlePageTemplate pending={true} />;
	}
	
	if(!match.params.id) {
		return <Redirect to="/articles" />;
	}
	
	
	if(error.length > 0) {
		return <ArticlePageTemplate error={error} />;
	}
	
	return (
		<>
			<ArticlePageTemplate 
				article={article}
			/>
		</>
	)

};

export default Article;