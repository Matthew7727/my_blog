
import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import About from '../views/About';
import Experience from '../views/Experience';
import Projects from '../views/Projects';
import RandomTools from '../views/RandomTools';
import DailyCodingChallenges from '../views/DailyCodingChallenges';
import Home from '../views/Home';
import Entries from '../views/Entries';

const router = createBrowserRouter([
    {
      path: '/',
      element: <App />,
      children: [
        { path: '/', element: <Home /> },
        { path: 'about', element: <About /> },
        { path: 'entries', element: <Entries /> },
        { path: 'my-experience', element: <Experience /> },
        { path: 'projects', element: <Projects /> },
        { path: 'random-tools', element: <RandomTools /> },
        { path: 'daily-coding-challenges', element: <DailyCodingChallenges /> }
      ]
    }
  ]);
  
  export default router;