import firebase from "./FirebaseService";

class UserService {

	async fetchUser(uid) {

		try {
			
			const result = await firebase.firestore().collection("users").doc(uid).get();

			return {
				username: result.get("username"),
				about: result.get("about"),
				followers: 0,
				posts: 0
			}

		}
		catch(error) {
			throw error;
		}

	}

}

export default UserService;