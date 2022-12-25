import {useEffect, useState} from 'react'
import StudentTable from '../components/StudentTable';
import contractABI from '../utils/contractABI.json';
import ConnectTowallet from '../components/ConnectTowallet';

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
  
  type StudentData = {
    name: string; 
    age: string; 
    wallet: string; 
    courses: number;
};

export default function Home() {
    const {ethers} = require('ethers');
    const contractAddress = '0x261d5ADa2C89369E1AfCAA98d52dEb124DD9f0Ff'
    const [walletConnected, setWalletConnected] = useState(false);
    const [currentAccount, setCurrentAccount] = useState('');
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [studentList, setStudentList] = useState<StudentData[]>([]);
  
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
  
    const getAllStudentData = async () => {
      try {
      const {ethereum} = window;
        if(ethereum) {
          const provider = new ethers.providers.Web3Provider(ethereum);
          await provider.send("eth_requestAccounts", []);
          const signer = provider.getSigner();
          const contract = new ethers.Contract(contractAddress, contractABI, signer)
          // console.log(contract)
          const studentCount = await contract.getTotalStudentCount();
          // console.log(studentCount.toString());
          for(let i = 0; i < studentCount.toString(); i++) {
            let student = await contract.getStudentData(i);

            const studentData = {
                name: student.name,
                age: student.age.toString(),
                wallet: student.wallet,
                courses: student.courses
            }
            console.log(studentData)
            // setStudentList([...studentList, studentData])
            studentList.push(studentData);
            console.log('Student Data: ', studentList)
          }
        }
      } catch (err) {
        console.log(err);
      }
    }
  
    useEffect(() => {
      checkIfWalletIsConnected();
      getAllStudentData();
    }, [])
  
    if(!walletConnected) {
      return (
        <>
            <ConnectTowallet message={errorMessage}/>
        </>
      )
    }

    // console.log(contractABI);

  return (
    <>
        <h1>{introData.title}</h1>
        <StudentTable studentData={studentList}/>
    </>
  )
}
