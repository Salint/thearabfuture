import firebase from "./FirebaseService";

class UserService {

	async fetchUser(uid) {

		try {
			
			const result = await firebase.firestore().collection("users").doc(uid).get();

			if(result.exists) {
				const [ isModerator, 
					isWriter,
					profileURL,
					bannerURL,
					postCount
				] = await Promise.all([
					this.isUserModerator(uid),
					this.isUserWriter(uid),
					this.getUserProfileURL(uid),
					this.getUserBannerURL(uid),
					this.getUserPostCount(uid)
				]);

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
			const db = firebase.firestore();

			const [ 
				questions,
				articles
			] = await Promise.all([
				db.collection("questions").where("author", "==", uid).get(),
				db.collection("articles").where("author", "==", uid).get()
			]);


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
			
			const ref = await firebase.storage().ref("users").child(uid).child("profile.jpg");
			
			await ref.put(profileData, { contentType: "image/jpeg" });

			return (await ref.getDownloadURL());
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