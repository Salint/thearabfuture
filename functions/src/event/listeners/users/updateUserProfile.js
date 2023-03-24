const functions = require("firebase-functions");
const admin = require("../../../util/admin");

const updateAuthor = (result, change) => {
	const promises = [];

	result.forEach(doc => {
		promises.push(doc.ref.update({
			author: {
				...doc.data().author,
				username: change.after.data().username
			}
		}));
	});

	return promises;
};

module.exports.updateQuestionData = functions.firestore.document("/users/{uid}").onUpdate(async (change, context) => {
	const promises = [];

	const questions = admin.firestore().collection("questions").where("author.uid", "==", context.params.uid).get();
	promises.push(questions);

	const answers = admin.firestore().collectionGroup("answers").get();
	promises.push(answers);

	questions.then(result => {
		promises.push(updateAuthor(result, change));

	}).catch(error => {
		console.log(error);
		return null;
	});
	answers.then(result => {
		promises.push(updateAuthor(result, change));
		
	}).catch(error => {
		console.log(error);
		return null;
	});

	return Promise.all(promises);
	
});