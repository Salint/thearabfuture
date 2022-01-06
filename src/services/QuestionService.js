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
			throw error;
		}
	}

	async getQuestion(id) {

		const userService = new UserService();

		try {

			let question = {};
			
			const questionData = await firebase.firestore().collection("questions").doc(id).get();

			const author = await userService.fetchUser(questionData.get("author"));

			question = {
				id: questionData.id,
				title: questionData.get("title"),
				content: questionData.get("content"),
				category: questionData.get("category"),
				date: questionData.get("date").toDate(),
				userData: author
			};

			console.log("test");

			return question;
		}	
		catch(error) {
			throw error;
		}
	}

}

export default QuestionService;