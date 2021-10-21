import React from "react";

import NavigationBar from "../organisms/Navbar";

const PageTemplate = ({ navbar }) => (
	<>
		{ navbar !== "off" && <NavigationBar float theme="light"/> }
	</>
);

export default PageTemplate;