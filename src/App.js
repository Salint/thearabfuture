// Dependencies, lol
import React, { useEffect, useState } from "react";
import firebase from "./services/FirebaseService";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import AutoScroll from "./components/atoms/AutoScroll";

// Pages
import HomePage from "./components/pages/HomePage";

import Signup from "./components/pages/Signup";
import Login from "./components/pages/Login";

import Profile from "./components/pages/Profile";

import TermsOfService from "./components/pages/legal/TermsOfService";

import Settings from "./components/pages/Settings";
import SettingsProfilePicture from "./components/pages/settings/ProfilePicture";
import SettingsCoverPicture from "./components/pages/settings/CoverPicture";

import Projects from "./components/pages/Projects";

import Questions from "./components/pages/Questions";
import NewQuestion from "./components/pages/questions/NewQuestion";
import Question from "./components/pages/questions/Question";

import Articles from "./components/pages/Articles";
import NewArticle from "./components/pages/articles/NewArticle";
import Article from "./components/pages/articles/Article";

import NotFound from "./components/pages/NotFound";

// Cool styling ;)
import "./style.css";
import "./markdown.css";


import UserContext from "./context/UserContext";

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

						<Route exact path="/terms" component={TermsOfService} />

						<Route exact path="/settings" component={Settings} />
						<Route exact path="/settings/profile" component={SettingsProfilePicture} />
						<Route exact path="/settings/cover" component={SettingsCoverPicture} />

						<Route exact path="/projects" component={Projects} />

						<Route exact path="/questions" component={Questions} />
						<Route exact path="/questions/new" component={NewQuestion} />
						<Route path="/questions/:id" component={Question} />

						<Route exact path="/articles" component={Articles} />
						<Route exact path="/articles/new" component={NewArticle} />
						<Route path="/articles/:id" component={Article} />
						
						<Route component={NotFound} />
					</Switch>
				</BrowserRouter>
			</React.StrictMode>
		</UserContext.Provider>
	);
};

export default App;