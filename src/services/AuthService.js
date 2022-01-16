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
					const error  = new Error("حدث خطأ, الرجاء المحاولة لاحقاً");
					error.code = "auth/invalid-provider";
					throw new Error(error);
			}

			const userCredential = await firebase.auth().signInWithPopup(provider);

			await firebase.firestore().collection("users").doc(userCredential.user.uid).set({
				username: userCredential.user.displayName
			});

		}
		catch(error) {
			if(error.code === "auth/account-exists-with-different-credential") {
				throw new Error("يوجد حساب بهذا البريد بالفعل");
			}
			else if(error.code === "auth/popup-blocked") {
				throw new Error("تم حظر الـ Popup بواسطة المتصفح");
			}
			else if(error.code === "auth/popup-closed-by-user") {
				throw new Error("تم إغلاق الـ Popup بواسطة المستخدم");
			}
			else {
				throw new Error("حدث خطأ, الرجاء المحاولة لاحقاً");
			}
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