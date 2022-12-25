import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import Create from './pages/Create';
import Home from './pages/Home';

function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />}>Home</Route>
        <Route path='/create' element={<Create />}>Add Student</Route>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
