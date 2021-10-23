import React from "react";
import Footer from "../molecules/Footer";

import NavigationBar from "../organisms/Navbar";

const PageTemplate = ({ navbar, footer, children }) => (
	<>
		{ navbar !== "off" && <NavigationBar float /> }
		{ children }
		{ footer !== "off" && <Footer /> }
	</>
);

export default PageTemplate;