import firebase from "./FirebaseService";

class UserService {

	async fetchUser(uid) {

		try {
			
			const result = await firebase.firestore().collection("users").doc(uid).get();

			const isModerator = await this.isUserModerator(uid);
			const profileURL = await this.getUserProfileURL(uid);

			return {
				username: result.get("username"),
				about: result.get("about"),
				moderator: isModerator,
				profileURL: profileURL,
				followers: 0,
				posts: 0
			}

		}
		catch(error) {
			throw error;
		}

	}
	async isUserModerator(uid) {

		try {
			
			const result = await firebase.firestore().collection("config").where("moderators", "array-contains", uid).get();

			if(!result.empty) {
				return true;
			}
			
			return false;

		}
		catch(error) {
			throw error;
		}

	}

	async getUserProfileURL(uid) {

		try {
			
			const result = await firebase.storage().ref("/users/" + uid).child("profile.jpg").getDownloadURL();
			
			return result;

		}
		catch(error) {
			return undefined;
		}

	}

}

export default UserService;