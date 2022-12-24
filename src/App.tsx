import { BrowserRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Create from './pages/Create';
import Home from './pages/Home';

function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}>Home</Route>
        <Route path='/create' element={<Create />}></Route>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
