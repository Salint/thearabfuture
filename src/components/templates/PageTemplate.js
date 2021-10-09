import React from "react";

import NavigationBar from "../organisms/Navbar";

const PageTemplate = ({ navbar }) => (
	<>
		{ navbar !== "off" && <NavigationBar float /> }
	</>
);

export default PageTemplate;