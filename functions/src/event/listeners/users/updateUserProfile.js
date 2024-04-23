const functions = require("firebase-functions");
const admin = require("../../../util/admin");

const updateAuthor = (result, change) => {
	let promise;

	result.forEach(doc => {
		promise = doc.ref.update({
			author: {
				...doc.data().author,
				username: change.after.data().username
			}
		});
	});

	return promise;
};

const updatePicture = (result, change) => {
	let promise;

	result.forEach(doc => {
		promise = doc.ref.update({
			author: {
				...doc.data().author,
				username: change.after.data().username
			}
		});
	});

	return promise;
};

module.exports.updateQuestionData = functions.firestore.document("/users/{uid}").onUpdate(async (change, context) => {
	const promises = [];

	const questions = admin.firestore().collection("questions").where("author.uid", "==", context.params.uid).get();
	promises.push(questions);

	const answers = admin.firestore().collectionGroup("answers").where("author.uid", "==", context.params.uid).get();
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
module.exports.updateQuestionsPictures = functions.storage.object(). onUpdate(async (change, context) => {
	const promises = [];

	const questions = admin.firestore().collection("questions").where("author.uid", "==", context.params.uid).get();
	promises.push(questions);

	const answers = admin.firestore().collectionGroup("answers").where("author.uid", "==", context.params.uid).get();
	promises.push(answers);

	questions.then(result => {
		result.forEach(doc => {
			const link = await context
		});

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