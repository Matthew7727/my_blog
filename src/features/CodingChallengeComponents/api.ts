import axios from 'axios';

export interface Challenge {
  id: number;
  number: number;
  dateCompleted: string;
  description: string;
  language: string;
  difficulty: string;
  solutionPath: string;
}

const GITHUB_API_BASE_URL = import.meta.env.VITE_GITHUB_API_URL;
const GITHUB_RAW_BASE_URL = import.meta.env.VITE_GITHUB_RAW_URL;

export const fetchChallenges = async (): Promise<Challenge[]> => {
  const response = await axios.get(GITHUB_API_BASE_URL);
  const folders: { name: string }[] = response.data;

  const challenges: Challenge[] = await Promise.all(folders.map(async (folder) => {
    const number = parseInt(folder.name, 10);
    const descriptionResponse = await axios.get(`${GITHUB_RAW_BASE_URL}Challenges/${folder.name}/description.json`);
    const descriptionData = descriptionResponse.data;

    let solutionFileExtension;
    switch (descriptionData.language.toLowerCase()) {
      case 'python':
        solutionFileExtension = 'py';
        break;
      case 'java':
        solutionFileExtension = 'java';
        break;
      case 'go':
        solutionFileExtension = 'go';
        break;
      default:
        solutionFileExtension = '';
    }

    return {
      id: number,  
      number,
      dateCompleted: descriptionData.date,
      description: descriptionData.description,
      language: descriptionData.language,
      difficulty: descriptionData.difficulty,
      solutionPath: `Challenges/${folder.name}/solution.${solutionFileExtension}`
    };
  }));

  return challenges;
};