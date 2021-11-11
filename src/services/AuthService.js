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
				throw new Error("الرجاء ادخال بريد صحيح");
			}
			else if(code === "auth/weak-password") {
				throw new Error("كلمة السر ضعيفة");
			}
			else {
				throw new Error("حذث خطأ, الرجاء المحاولة لاحقاً");
			}
		}
	}
	async LoginWithEmail(email, password) {
		try {
			
			await firebase.auth().signInWithEmailAndPassword(email, password);

		}
		catch({ code }) {
			if(code === "auth/user-disabled") {
				throw new Error("تم حظر هذا الحساب");
			}
			else if(code === "auth/invalid-email") {
				throw new Error("يوجد حساب بهذا البريد بالفعل");
			}
			else if(code === "auth/user-not-found") {
				throw new Error("لا يوجد حساب بهذا البريد");
			}
			else if(code === "auth/wrong-password") {
				throw new Error("كلمة المرور غير صحيحة");
			}
			else {
				throw new Error("حذث خطأ, الرجاء المحاولة لاحقاً");
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