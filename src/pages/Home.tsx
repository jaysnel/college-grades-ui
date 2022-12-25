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
        <StudentTable studentData={studentList}/>
    </>
  )
}
