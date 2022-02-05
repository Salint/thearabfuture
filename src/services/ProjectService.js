import firebase from "./FirebaseService";

class ProjectService {
  
	async fetchProjects() {

		try {

			let projects = [];
			
			const projectsResults = await firebase.firestore().collection("projects").orderBy("date", "desc").get();
			
			for (const project of projectsResults.docs) {
				
				projects.push({
					id: project.id,
					title: project.get("title"),
					description: project.get("description"),
					date: project.get("date"),
					link: project.get("link"),
					email: project.get("email"),
					isActive: project.get("isActive"),
					userData: project.get("author")
				});
			}
			
			return projects;
		}
		catch (error) {
			throw error;
		}

	}

}

export default ProjectService;