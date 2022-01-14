import React from "react";
import styled, { keyframes } from "styled-components";

import PageTemplate from "../PageTemplate";
import NotFound from "../../molecules/NotFound";

import LoadingPicture from "../../../static/images/loading.png";
import ArticleElement from "../../organisms/articles/ArticleElement";

const Rotate = keyframes`
	from {
		transform: rotate(0);
	}
	to {
		transform: rotate(360deg);
	}
`;

const Loading = styled.section`
	font-size: 100px;
	text-align: center;
	margin: 80px 0;
`;

const Image = styled.img`
	width: 100px;
	animation: ${Rotate} 1s infinite;
	animation-timing-function: linear;
	opacity: 0.5;
`;


const ArticlePageTemplate = ({ error, pending, article }) => (

	<PageTemplate>
		{ pending && <Loading><Image src={LoadingPicture} /></Loading> }
		{ (!pending && error === "article/article-not-found") && <NotFound /> }
		{ (!pending && !error) && <ArticleElement article={article} /> }
	</PageTemplate>
);

export default ArticlePageTemplate;