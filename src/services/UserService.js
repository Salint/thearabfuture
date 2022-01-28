import firebase from "./FirebaseService";

class UserService {

	async fetchUser(uid) {

		try {
			
			const result = await firebase.firestore().collection("users").doc(uid).get();

			if(result.exists) {
				const isModerator = await this.isUserModerator(uid);
				const isWriter = await this.isUserWriter(uid);
				const profileURL = await this.getUserProfileURL(uid);
				const bannerURL = await this.getUserBannerURL(uid);
				const postCount = await this.getUserPostCount(uid);

				return {
					uid: uid,
					username: result.get("username"),
					about: result.get("about"),
					moderator: isModerator,
					writer: isWriter,
					profileURL: profileURL,
					bannerURL: bannerURL,
					posts: postCount
				}
			}
			else {
				const error = new Error();
				error.code = "user/user-not-found";

				throw error;
				
			}

		}
		catch(error) {
			
			if(error.code === "user/user-not-found") {
				throw error;
			}
			else {
				const errorCustom = new Error();
				errorCustom.code = "user/unknown-error";

				throw errorCustom;
			}
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

	async isUserWriter(uid) {

		try {
			
			const result = await firebase.firestore().collection("config").where("writers", "array-contains", uid).get();

			if(!result.empty) {
				return true;
			}
			
			return false;

		}
		catch(error) {
			throw error;
		}

	}

	async getUserPostCount(uid) {
		
		try {
			
			const questions = await firebase.firestore().collection("questions").where("author", "==", uid).get();
			
			const articles = await firebase.firestore().collection("articles").where("author", "==", uid).get();

			return (questions.size + articles.size);

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

	async getUserBannerURL(uid) {

		try {
			
			const result = await firebase.storage().ref("/users/" + uid).child("banner.jpg").getDownloadURL();
			
			return result;

		}
		catch(error) {
			return undefined;
		}

	}
	async updateUser(uid, username, about) {

		try {
			
			await firebase.firestore().collection("users").doc(uid).update({
				username: username,
				about: about
			});

		}
		catch(error) {
			throw error;
		}

	}
	async updateProfilePicture(uid, profileData) {
		
		try {
			
			await firebase.storage().ref("users").child(uid).child("profile.jpg").put(profileData, { contentType: "image/jpeg" });
		}
		catch(error) {
			throw error;
		}

	}

	async updateBanner(uid, bannerData) {

		try {
			
			await firebase.storage().ref("users").child(uid).child("banner.jpg").put(bannerData, { contentType: "image/jpeg" });
		}
		catch(error) {
			throw error;
		}

	}

}

export default UserService;