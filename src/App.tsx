import {useEffect, useState} from 'react'
import './App.css';
import contractABI from './utils/contractABI.json';
import StudentTable from './components/StudentTable';
import ConnectTowallet from './components/ConnectTowallet';

declare const window: Window &
  typeof globalThis & {
    ethereum: any
}

interface IntroData {
  title: string;
  id: number;
}

const introData: IntroData = {
  title: "College Grades",
  id: 0,
};

console.log(contractABI);

function App() {
  const {ethers} = require('ethers');
  const [walletConnected, setWalletConnected] = useState(false);
  const [currentAccount, setCurrentAccount] = useState('');
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const checkIfWalletIsConnected = async () => {
    try {
      const {ethereum} = window;
      if(ethereum) {
        const accounts = await ethereum.request({method: 'eth_requestAccounts'});
        if(accounts.length !== 0) {
          setCurrentAccount(accounts[0]);
          setWalletConnected(true);
        } else {
          setIsError(true)
          setErrorMessage('No wallet found. Connect to a wallet');
        }
      }
    } catch (err: any) {
      console.log(err);
      setErrorMessage(err.message);
    }
  }

  const getAllStudentData = () => {
    try {
    const {ethereum} = window;
      if(ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        console.log(provider)
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    checkIfWalletIsConnected();
    getAllStudentData();
  })

  if(!walletConnected) {
    return (
      <>
      <ConnectTowallet message={errorMessage}/>
      </>
    )
  }

  return (
    <div className="App">
      <h1>{introData.title}</h1>
      <StudentTable studentData='5'/>
    </div>
  );
}

export default App;
