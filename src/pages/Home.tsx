import {useEffect, useState} from 'react'
import StudentTable from '../components/StudentTable';
import contractABI from '../utils/contractABI.json';

    declare const window: Window &
    typeof globalThis & {
        ethereum: any
    }
    export interface StudentData {
        name: string; 
        age: string; 
        wallet: string; 
        courses: number;
    };

export default function Home() {
    const {ethers} = require('ethers');
    const contractAddress = '0x261d5ADa2C89369E1AfCAA98d52dEb124DD9f0Ff'
    const [studentList, setStudentList] = useState<StudentData[]>([]);
    const [filteredStudentList, setFilteredStudentList] = useState<StudentData[]>([]);
    
    const searchStudentNames = (e: any) => {
      const value = e.target.value;
      const filtered = studentList.filter((name) => name.name.toLowerCase().includes(value.toLowerCase()));
      setFilteredStudentList(filtered);
    }

    const searchStudentAges = (e: any) => {
      const value = e.target.value;
      const filtered = studentList.filter((name) => name.age.toLowerCase().includes(value.toLowerCase()));
      setFilteredStudentList(filtered);
    }

    const searchStudentWallets = (e: any) => {
      const value = e.target.value;
      const filtered = studentList.filter((name) => name.wallet.toLowerCase().includes(value.toLowerCase()));
      setFilteredStudentList(filtered);
    }

    const getAllStudentData = async () => {
      try {
      const {ethereum} = window;
        if(ethereum) {
          const provider = new ethers.providers.Web3Provider(ethereum);
          await provider.send("eth_requestAccounts", []);
          const signer = provider.getSigner();
          const contract = new ethers.Contract(contractAddress, contractABI, signer)
          const studentCount = await contract.getTotalStudentCount();
          for(let i = 0; i < studentCount.toString(); i++) {
            let student = await contract.getStudentData(i);
            const studentData: StudentData = {
                name: student.name,
                age: student.age.toString(),
                wallet: student.wallet,
                courses: student.courses
            }
            setStudentList(prevStudentList => [...prevStudentList, studentData])
          }
        }
      } catch (err) {
        console.log(err);
      }
    }
  
    useEffect(() => {
      getAllStudentData();
    }, [])

  return (
    <>
        <div className='flex flex-row my-5'>
          <input 
          onChange={searchStudentNames}
          className='ml-5 w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' 
          placeholder='Search Name'
          type="text" name="Search Name" id="" />
          <input 
          onChange={searchStudentAges}
          className='mx-5 w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' 
          placeholder='Search Age'
          type="text" name="Search Age" id="" />
          <input 
          onChange={searchStudentWallets}
          className='mr-5 w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' 
          placeholder='Search Wallet'
          type="text" name="Search Wallet" id="" />
        </div>
        <StudentTable studentData={filteredStudentList.length === 0 ? studentList : filteredStudentList}/>
    </>
  )
}
