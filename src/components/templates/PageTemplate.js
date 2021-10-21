import React from "react";

import NavigationBar from "../organisms/Navbar";

const PageTemplate = ({ navbar, children }) => (
	<>
		{ navbar !== "off" && <NavigationBar float /> }
		{ children }
	</>
);

export default PageTemplate;