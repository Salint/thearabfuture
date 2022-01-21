import React, { useEffect } from "react";
import { withRouter } from "react-router-dom";

const AutoScroll = withRouter(function ({ history, children }) {

	useEffect(() => {

		const unlisten = history.listen(() => {
			
			window.scrollTo(0, 0);
		});
		return () => {

			unlisten();
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
  
	return <>{children}</>;
});

export default AutoScroll;