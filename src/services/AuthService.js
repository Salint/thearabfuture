import firebase from "./FirebaseService";

class AuthService {

	async createAccountWithEmail(email, username, password) {
		try {
			
			const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);

			await userCredential.user.sendEmailVerification();

			await firebase.firestore().collection("users").doc(userCredential.user.uid).set({
				username: username
			});

		}
		catch(error) {
			throw error;
		}
	}
	async LoginWithEmail(email, password) {
		try {
			
			await firebase.auth().signInWithEmailAndPassword(email, password);

		}
		catch(error) {
			throw error;
		}
	}
	async AuthWithThirdParty(authProvider) {
		try {
			let provider;

			switch (authProvider) {
				case "github":
					provider = new firebase.auth.GithubAuthProvider();
					break;
				case "facebook":
					provider = new firebase.auth.FacebookAuthProvider();
					break;
				case "google":
					provider = new firebase.auth.GoogleAuthProvider();
					break;
				default:
					const error  = new Error("Invalid provider");
					error.code = "auth/invalid-provider";
					throw new Error(error);
			}

			const userCredential = await firebase.auth().signInWithPopup(provider);

			await firebase.firestore().collection("users").doc(userCredential.user.uid).set({
				username: userCredential.user.displayName
			});

		}
		catch(error) {
			throw error;
		}
	}
	async logOut() {
		try {
			await firebase.auth().signOut();
		}
		catch(error) {
			throw error;
		}
	}

}

export default AuthService;