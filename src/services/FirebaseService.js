import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

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


export default firebase;