import {useEffect, useState} from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Create from './pages/Create';
import Student from './pages/Student';
import ConnectTowallet from './components/ConnectTowallet';

declare const window: Window &
  typeof globalThis & {
      ethereum: any
  }

function App() {
  const [walletConnected, setWalletConnected] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
    
  const checkIfWalletIsConnected = async () => {
    try {
      const {ethereum} = window;
      if(ethereum) {
        const accounts = await ethereum.request({method: 'eth_requestAccounts'});
        if(accounts.length !== 0) {
          setWalletConnected(true);
        } else {
          setErrorMessage('No wallet found. Connect to a wallet');
        }
      }
    } catch (err: any) {
      console.log(err);
      setErrorMessage(err.message);
    }
  }

  useEffect(() => {
    checkIfWalletIsConnected();
  }, [])


  if(!walletConnected) {
    return (
      <>
          <ConnectTowallet message={errorMessage}/>
      </>
    )
  }

  return (
    <div className="App">
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />}>Home</Route>
        <Route path='/create' element={<Create />}>Add Student</Route>
        <Route path='/student/:studentId' element={<Student />}>Student</Route>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
