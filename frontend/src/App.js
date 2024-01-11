
import { Route,  Routes } from 'react-router-dom';
import './App.css';
import ToDo from './pages/ToDo/ToDo';

function App() {
  return (
    <Routes>
      <Route path='/' element = {<ToDo/>} />
    </Routes>
  );
}

export default App;
