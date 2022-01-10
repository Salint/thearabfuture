import firebase from "./FirebaseService";
import UserService from "./UserService";

class QuestionService {

	async fetchQuestions() {

		const userService = new UserService();

		try {

			let questions = [];
			
			const questionData = await firebase.firestore().collection("questions").orderBy("date", "desc").get();

			for (const question of questionData.docs) {

				const author = await userService.fetchUser(question.get("author"));

				questions.push({
					id: question.id,
					title: question.get("title"),
					content: question.get("content"),
					category: question.get("category"),
					date: question.get("date").toDate(),
					userData: author
				});

			}

			return questions;
		}	
		catch(error) {
			throw new Error("حدث خطأ");
		}
	}

	async getQuestion(id) {

		const userService = new UserService();

		try {
			
			const question = await firebase.firestore().collection("questions").doc(id).get();

			if(question.exists) {
				const author = await userService.fetchUser(question.get("author"));

				return {
					id: question.id,
					title: question.get("title"),
					content: question.get("content"),
					category: question.get("category"),
					date: question.get("date").toDate(),
					userData: author
				};
			}
			else {
				const error = new Error();
				error.code = "question/question-not-found";

				throw error;
			}
		}	
		catch(error) {
			throw new Error("حدث خطأ");
		}
	}

	async addQuestion(uid, title, category, content) {

		try {
			await firebase.firestore().collection("questions").add({
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

export default QuestionService;