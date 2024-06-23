import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import About from '../views/About';
import Projects from '../views/Projects';
import RandomTools from '../views/RandomTools';
import DailyCodingChallenges from '../views/DailyCodingChallenges';
import Home from '../views/Home';
import Entries from '../views/Entries';
import ProjectOverview from '../features/ProjectComponents/ProjectOverview';
import PostDetails from '../features/PostComponents/PostDetails';
import ChallengeDetail from '../features/CodingChallengeComponents/ChallengeDetail';
import Contact from '../views/Contact';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'projects', element: <Projects /> },
      {
        path: 'projects/:repoName',
        element: <ProjectOverview />,
        loader: ({ params }) => {
          return params;
        }
      },
      { path: 'random-tools', element: <RandomTools /> },
      { path: 'daily-coding-challenges', element: <DailyCodingChallenges /> },
      {
        path: 'daily-coding-challenges/:number',
        element: <ChallengeDetail />
      },
      { path: 'entries', element: <Entries /> },
      { path: 'entries/:id', element: <PostDetails /> },  // Ensure this path is correct
      { path: 'contact', element: <Contact />}
    ]
  }
]);

export default router;