import axios from 'axios';

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
    files: {
      additions: number;
      deletions: number;
    }[];
  }

export const fetchGitHubRepos = async (username: string): Promise<GitHubRepo[]> => {
  const response = await axios.get(`https://api.github.com/users/${username}/repos`);
  return response.data;
};

export const fetchGitHubRepoDetails = async (repoName: string): Promise<GitHubRepo> => {
  const response = await axios.get(`https://api.github.com/repos/${repoName}`);
  return response.data;
};

export const fetchGitHubRepoCommits = async (repoName: string): Promise<GitHubCommit[]> => {
  const response = await axios.get(`https://api.github.com/repos/${repoName}/commits`);
  return response.data;
};

export const fetchGitHubRepoLanguages = async (repoName: string): Promise<string[]> => {
  const response = await axios.get(`https://api.github.com/repos/${repoName}/languages`);
  return Object.keys(response.data);
};