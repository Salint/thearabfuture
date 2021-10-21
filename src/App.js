// Dependencies, lol
import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

// Pages
import HomePage from "./components/pages/HomePage";

// Cool styling ;)
import "./style.css";

const App = () => (
	<React.StrictMode>
		<BrowserRouter>
			<Switch>
				<Route exact path="/" component={HomePage} />
			</Switch>
		</BrowserRouter>
	</React.StrictMode>
);

export default App;