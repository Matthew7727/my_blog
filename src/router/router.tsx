
import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import About from '../views/About';
import Projects from '../views/Projects';
import RandomTools from '../views/RandomTools';
import DailyCodingChallenges from '../views/DailyCodingChallenges';
import Home from '../views/Home';
import Entries from '../views/Entries';
import ProjectDetails from '../features/ProjectComponents/ProjectDetails';

const router = createBrowserRouter([
    {
      path: '/',
      element: <App />,
      children: [
        { path: '/', element: <Home /> },
        { path: 'about', element: <About /> },
        { path: 'projects', element: <Projects /> },
        {
          path: 'projects/:id',
          element: <ProjectDetails />,
          loader: ({ params }) => {
            return params;
          }
        },
        { path: 'random-tools', element: <RandomTools /> },
        { path: 'daily-coding-challenges', element: <DailyCodingChallenges /> },
        { path: 'entries', element: <Entries /> },
      ]
    }
  ]);
  
  export default router;