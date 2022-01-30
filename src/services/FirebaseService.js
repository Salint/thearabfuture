import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import "firebase/compat/analytics"

const firebaseConfig = {
	apiKey: "AIzaSyDfqoU3E3bTM0vB3yPJ9VlyQodCudaJmms",
	authDomain: "thearabfuture.firebaseapp.com",
	projectId: "thearabfuture",
	storageBucket: "thearabfuture.appspot.com",
	messagingSenderId: "135828096117",
	appId: "1:135828096117:web:448aebfac30fc8c872e43c",
	measurementId: "G-1GQE1KNQSD"
};

firebase.initializeApp(firebaseConfig);

firebase.auth().languageCode = "ar";

if(window.location.hostname === "localhost") {

	firebase.auth().useEmulator("http://localhost:9099"); // Authentication
	firebase.firestore().useEmulator("localhost", "8080"); // Firestore
	firebase.storage().useEmulator("localhost", "9199"); // Storage
}

export default firebase;