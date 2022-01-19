import firebase from "./FirebaseService";
import UserService from "./UserService";

class ArticleService {

	async fetchArticles() {

		const userService = new UserService();

		try {

			let articles = [];
			
			const articleData = await firebase.firestore().collection("articles").orderBy("date", "desc").get();

			for (const article of articleData.docs) {

				const author = await userService.fetchUser(article.get("author"));

				articles.push({
					id: article.id,
					title: article.get("title"),
					content: article.get("content"),
					category: article.get("category"),
					date: article.get("date").toDate(),
					userData: author
				});

			}

			return articles;
		}	
		catch(error) {
			throw new Error("حدث خطأ");
		}
	}

	async getArticle(id) {

		const userService = new UserService();

		try {
			
			const article = await firebase.firestore().collection("articles").doc(id).get();

			if(article.exists) {
	
				const author = await userService.fetchUser(article.get("author"));

				return {
					id: article.id,
					title: article.get("title"),
					content: article.get("content"),
					category: article.get("category"),
					date: article.get("date").toDate(),
					userData: author
				};
			}
			else {
				const error = new Error();
				error.code = "article/article-not-found";

				throw error;
			}
		}	
		catch(error) {
			throw error;
		}
	}

	async addArticle(uid, title, category, content) {

		try {
			await firebase.firestore().collection("articles").add({
				author: uid,
				title: title,
				category: category,
				content: content,
				date: firebase.firestore.FieldValue.serverTimestamp()
			});
		}
		catch(error) {
			throw new Error("حدث خطأ أثناء نشر السؤال");
		}
	}

}

export default ArticleService;