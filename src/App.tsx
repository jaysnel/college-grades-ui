import React, {useEffect, useState} from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Create from './pages/Create';
import Student from './pages/Student';
import ConnectTowallet from './components/ConnectTowallet';
import Spinner from './components/Spinner';

declare const window: Window &
  typeof globalThis & {
      ethereum: any
  }

function App() {
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
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
      setIsLoading(false);
    } catch (err: any) {
      console.log(err);
      setErrorMessage(err.message);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    checkIfWalletIsConnected();
  }, [])

  if(isLoading) {
    return (
      <div className="flex justify-center mt-5"><Spinner /></div>
    )
  }

  if(!walletConnected) {
    return (
      <>
        <div className="flex justify-center mt-5">
          <ConnectTowallet message={errorMessage}/>
        </div>
      </>
    )
  }

  return (
    <div className="nav-bar">
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />}>Directory</Route>
        <Route path='/create' element={<Create />}>Add Student</Route>
        <Route path='/student/:studentId' element={<Student />}>Student</Route>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
