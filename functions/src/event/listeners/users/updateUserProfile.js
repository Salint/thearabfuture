const functions = require("firebase-functions");
const admin = require("../../../util/admin");

module.exports.updateQuestionData = functions.firestore.document("/users/{uid}").onUpdate(async (change, context) => {
	return admin.firestore().collection("questions").where("author.uid", "==", context.params.uid).get().then(results => {
		results.forEach(doc => {
			const promises = [];

			promises.push(doc.ref.update({
				author: {
					...doc.data().author,
					username: change.after.data().username
				}
			}));
			
			return Promise.all(promises);
		});
	}).then(error => {
		functions.logger.error(error);
		return null;
	});
	
});