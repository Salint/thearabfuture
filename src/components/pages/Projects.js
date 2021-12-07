import React, { useEffect, useState } from "react";
import ProjectService from "../../services/ProjectService";

import ProjectsPageTemplate from "../templates/ProjectsPageTemplate";

const Projects = ({ match }) => {
	
	const projectService = new ProjectService();

	const [ projects, setProjects ] = useState([]);
	const [ pending, setPending ] = useState(true);
	const [ error, setError ] = useState("");

	useEffect(() => {

		(async () => {

			setPending(true);
			try {
				const tempProjects = await projectService.fetchProjects();
				
				setProjects(tempProjects);
				setPending(false)
			}
			catch(error) {
				setError(error);
				setPending(false);
			}
	})();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	

	if(pending) {
		return <ProjectsPageTemplate 
			pending={true} 
			projects={[]}	
		/>;
	}
	
	if(error.length > 0) {
		return <ProjectsPageTemplate 
			error={error} 
			projects={[]}	
		/>;
	}
	
	return (
		<>
			<ProjectsPageTemplate 
				projects={projects}
			/>
		</>
	)

};

export default Projects;