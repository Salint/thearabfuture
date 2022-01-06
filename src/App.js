// Dependencies, lol
import React, { useEffect, useState } from "react";
import firebase from "./services/FirebaseService";
import { BrowserRouter, Switch, Route } from "react-router-dom";

// Pages
import HomePage from "./components/pages/HomePage";
import Signup from "./components/pages/Signup";
import Login from "./components/pages/Login";
import Profile from "./components/pages/Profile";
import NotFound from "./components/pages/NotFound";

import Settings from "./components/pages/Settings";
import SettingsProfilePicture from "./components/pages/settings/ProfilePicture";
import SettingsCoverPicture from "./components/pages/settings/CoverPicture";

import Projects from "./components/pages/Projects";

// Cool styling ;)
import "./style.css";
import "./markdown.css";


import UserContext from "./context/UserContext";
import QuestionsPageTemplate from "./components/templates/QuestionsPageTemplate";
import Questions from "./components/pages/Questions";
import Question from "./components/pages/Question";

const App = () => {

	const [ pending, setPending ] = useState(true);
	const [ user, setUser ] = useState(undefined);

	useEffect(() => {
		firebase.auth().onAuthStateChanged((user) => {
			setUser(user);
			setPending(false);
		});
	}, []);

	if(pending) {
		return <></>;
	}

	return (
		<UserContext.Provider value={user}>
			<React.StrictMode>
				<BrowserRouter>
					<Switch>
						<Route exact path="/" component={HomePage} />
						<Route exact path="/signup" component={Signup} />
						<Route exact path="/login" component={Login} />
						<Route path="/profile/:id" component={Profile} />

						<Route exact path="/settings" component={Settings} />
						<Route exact path="/settings/profile" component={SettingsProfilePicture} />
						<Route exact path="/settings/cover" component={SettingsCoverPicture} />

						<Route exact path="/projects" component={Projects} />

						<Route exact path="/questions" component={Questions} />
						<Route path="/questions/:id" component={Question} />
						
						<Route component={NotFound} />
					</Switch>
				</BrowserRouter>
			</React.StrictMode>
		</UserContext.Provider>
	);
};

export default App;