import axios from 'axios';

const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_API_TOKEN

export interface GitHubRepo {
    name: string;
    description: string;
    created_at: string;
    pushed_at: string;
    language: string;
    html_url: string;
    owner: {
      login: string;
      avatar_url: string;
    };
  }

  export interface CommitFile {
    additions: number;
    deletions: number;
  }
  
  export interface GitHubCommit {
    sha: string;
    commit: {
      message: string;
      author: {
        name: string;
        email: string;
        date: string;
      };
    };
    author: {
      login: string;
      avatar_url: string;
      html_url: string;
    };
    url: string;
    files: CommitFile[];
  }

  const axiosInstance = axios.create({
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`
    }
  });
  
  export const fetchGitHubRepos = async (username: string): Promise<GitHubRepo[]> => {
    const response = await axiosInstance.get(`https://api.github.com/users/${username}/repos`);
    return response.data;
  };
  
  export const fetchGitHubRepoDetails = async (repoName: string): Promise<GitHubRepo> => {
    const response = await axiosInstance.get(`https://api.github.com/repos/${repoName}`);
    return response.data;
  };
  
  export const fetchGitHubRepoCommits = async (repoName: string): Promise<GitHubCommit[]> => {
    const response = await axiosInstance.get(`https://api.github.com/repos/${repoName}/commits`);
    const commits: GitHubCommit[] = response.data;
  
    // Fetch detailed commit information for each commit to get file changes
    const detailedCommits = await Promise.all(
      commits.map(async (commit) => {
        const commitDetailResponse = await axiosInstance.get(commit.url);
        const files: CommitFile[] = commitDetailResponse.data.files.map((file: { additions: number; deletions: number }) => ({
          additions: file.additions,
          deletions: file.deletions,
        }));
  
        return {
          ...commit,
          files,
        };
      })
    );
  
    return detailedCommits;
  };
  
  export const fetchGitHubRepoLanguages = async (repoName: string): Promise<string[]> => {
    const response = await axiosInstance.get(`https://api.github.com/repos/${repoName}/languages`);
    return Object.keys(response.data);
  };