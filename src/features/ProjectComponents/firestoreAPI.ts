import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";

interface ToDo {
  title: string;
  description: string;
  priority: string;
}

export interface FirestoreProject {
  repoName: string;
  name: string;
  imageUrl: string;
  toDos: ToDo[];
  projectDescription: string;
}

export const fetchFirestoreProjects = async (): Promise<FirestoreProject[]> => {
  const docRef = doc(db, "projects", "Personal");
  const docSnap = await getDoc(docRef);
  const projects: FirestoreProject[] = [];
  
  if (docSnap.exists()) {
    const data = docSnap.data();
    for (const repoName in data) {
      projects.push({ repoName, ...data[repoName] });
    }
  }
  
  return projects;
};

export const fetchFirestoreProjectDetails = async (repoName: string): Promise<FirestoreProject | null> => {
  const docRef = doc(db, "projects", "Personal");
  const docSnap = await getDoc(docRef);
  
  if (docSnap.exists()) {
    const data = docSnap.data();
    if (data[repoName]) {
      return { repoName, ...data[repoName] } as FirestoreProject;
    }
  }
  
  return null;
};