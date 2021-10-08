import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

const App = () => (
	<React.StrictMode>
		<BrowserRouter>
			<Switch>
				<Route exact path="/" component={() => <h1>Working</h1>} />
			</Switch>
		</BrowserRouter>
	</React.StrictMode>
);

export default App;