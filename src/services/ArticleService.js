import firebase from "./FirebaseService";
import UserService from "./UserService";

class ArticleService {

	async fetchArticles() {
		
		
		try {
			
			let articles = [];
			
			const articleData = await firebase.firestore().collection("articles").orderBy("date", "desc").get();
			
			for (const article of articleData.docs) {
				
				articles.push({
					id: article.id,
					title: article.get("title"),
					content: article.get("content"),
					category: article.get("category"),
					date: article.get("date").toDate(),
					userData: article.get("author")
				});
				
			}
			
			return articles;
		}	
		catch(error) {
			throw new Error("حدث خطأ");
		}
	}
	
	async getArticle(id) {
		
		try {
			
			const article = await firebase.firestore().collection("articles").doc(id).get();
			
			if(article.exists) {
				
				return {
					id: article.id,
					title: article.get("title"),
					content: article.get("content"),
					category: article.get("category"),
					date: article.get("date").toDate(),
					userData: article.get("author")
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
		
		const userService = new UserService();

		try {
			const { username, profileURL } = await userService.fetchUser(uid);

			await firebase.firestore().collection("articles").add({
				author: {
					uid: uid,
					username: username,
					profileURL: profileURL ? profileURL : ""
				},
				title: title,
				category: category,
				content: content,
				date: firebase.firestore.FieldValue.serverTimestamp()
			});
		}
		catch(error) {
			console.error(error);
			throw new Error("حدث خطأ أثناء نشر السؤال");
		}
	}

}

export default ArticleService;