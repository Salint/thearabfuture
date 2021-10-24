import React, { Component, createContext }  from "react";
import firebaseApp from "../services/FirebaseService";

export const AuthContext = createContext();

export class AuthProvider extends Component {
	state = {
		pending: true,
		user: {}
	};

	componentDidMount() {
		firebaseApp.auth().onAuthStateChanged((user) => {
			this.setState({
				pending: false,
				user
			});
		});
	}

	render() {
		const { children } = this.props;
		const { user, pending } = this.state;

		if(pending) {
			return <></>;
		}

		return (
			<AuthContext.Provider value={{user}}>
				{children}
			</AuthContext.Provider>
		);
	}
}

export function IfFirebaseAuthed({ children }) {
	return (
		<FirebaseAuthConsumer>
			{({ user }) => user ? children : <></>}
		</FirebaseAuthConsumer>
	);
}

export function IfFirebaseUnAuthed({ children }) {
	return (
		<FirebaseAuthConsumer>
			{({ user }) => user ? <></> : children}
		</FirebaseAuthConsumer>
	);
}

export function FirebaseAuthConsumer({ children }) {
	return (
		<AuthContext.Consumer>
			{children}
		</AuthContext.Consumer>
	);
}