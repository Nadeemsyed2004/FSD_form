import logo from './logo.svg';
import './App.css';
import EmployeeForm from './components/EmployeeForm';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import ListUsers from './components/ListUsers';
import Home from './components/Home';

function App() {
  return (
    <Router>
      <div className="App">
      <Routes>
        <Route path='/' Component={Home}/>
        <Route path='/employees' Component={ListUsers} />
      </Routes>
      </div>
    </Router>
    
  );
}

export default App;
