import firebase from "./FirebaseService";
import UserService from "./UserService";

class ProjectService {
  
	async fetchProjects() {
		
		const userService = new UserService();

		try {

			let projects = [];
			
			const projectsResults = await firebase.firestore().collection("projects").orderBy("date", "desc").get();
			
			for (const project of projectsResults.docs) {
				
				const user = await userService.fetchUser(project.get("user"));
				
				projects.push({
					id: project.id,
					title: project.get("title"),
					description: project.get("description"),
					date: project.get("date"),
					link: project.get("link"),
					email: project.get("email"),
					isActive: project.get("isActive"),
					userData: user
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