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
		catch({ code }) {
			if(code === "auth/email-already-in-use") {
				throw new Error("يوجد حساب بهذا البريد بالفعل");
			}
			else if(code === "auth/invalid-email") {
				throw new Error("يوجد حساب بهذا البريد بالفعل");
			}
			else if(code === "auth/weak-password") {
				throw new Error("كلمة السر ضعيفة");
			}
			else {
				throw new Error("حذث خطأ, الرجاء المحاولة لاحقاً");
			}
		}
	}

}

export default AuthService;