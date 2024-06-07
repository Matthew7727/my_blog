import { Outlet } from 'react-router-dom';
import MyHeader from './features/header/header';
import './App.css'

const App = () => {
  return (
    <div>
      <MyHeader />
      <main>
          <Outlet />
      </main> 
    </div>
  );
};

export default App;