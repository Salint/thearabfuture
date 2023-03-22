import firebase from "./FirebaseService";
import UserService from "./UserService";

class QuestionService {

	async fetchQuestions() {


		try {
			
			const questions = await firebase.firestore().collection("questions").orderBy("date", "desc").get();

			return questions.docs;
		}	
		catch(error) {
			throw error;
		}
	}

	async fetchQuestionsByUser(uid) {

		const userService = new UserService();

		try {

			let questions = [];
			
			const questionData = await firebase.firestore().collection("questions").where("author", "==", uid).get();

			for (const question of questionData.docs) {

				let answers = [];

				const answerResult = await firebase.firestore().collection("questions").doc(question.id).collection("answers").orderBy("date", "asc").get();
				
				for (const answer of answerResult.docs) {
					
					const author = await userService.fetchUser(answer.get("author"));

					answers.push({
						id: answer.id,
						content: answer.get("content"),
						date: answer.get("date").toDate(),
						userData: author
					});
					
				}
				
				const author = await userService.fetchUser(question.get("author"));
				
				questions.push({
					id: question.id,
					title: question.get("title"),
					content: question.get("content"),
					category: question.get("category"),
					date: question.get("date").toDate(),
					answers: answers,
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
			
			const question = await firebase.firestore().collection("questions").doc(id).get();

			if(question.exists) {

				let answers = [];

				const answersResult = await firebase.firestore().collection("questions").doc(id).collection("answers").orderBy("date", "asc").get();
				
				answersResult.forEach(answer => {
					answers.push({
						...answer.data(),
						id: answer.id
					});
				});

				return {
					...question.data(),
					id: question.id,
					answers: answers,
				};
			}
			else {
				const error = new Error();
				error.code = "question/question-not-found";

				throw error;
			}
		}	
		catch(error) {
			throw error;
		}
	}

	async addQuestion(user, title, category, content) {

		try {
			await firebase.firestore().collection("questions").add({
				author: {
					uid: user.uid,
					username: user.displayName,
					photoURL: user.photoURL
				},
				title: title,
				category: category,
				content: content,
				date: firebase.firestore.FieldValue.serverTimestamp()
			});
		}
		catch(error) {
			throw error;
		}
	}

	async addAnswer(id, user, content) {
		try {
			await firebase.firestore().collection("questions").doc(id).collection("answers").add({
				author: {
					uid: user.uid,
					username: user.displayName,
					photoURL: user.photoURL
				},
				content: content,
				date: firebase.firestore.FieldValue.serverTimestamp()
			})
		}
		catch(error) {
			throw error;
		}
	}

}

export default QuestionService;
