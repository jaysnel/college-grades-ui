import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import contractABI from '../utils/contractABI.json';

declare const window: Window &
typeof globalThis & {
    ethereum: any
}

export default function Student() {
    const [studentDoesntExist, setStudetnDoesntExist] = React.useState<boolean>(false);
    const [studentInfo, setStudentInfo] = useState<{
        name: string,
        age: string,
        wallet: string,
        courses: []
    }>({name: '', age: '', wallet: '', courses: []})

    const { studentId } = useParams();
    const studentIdNumber = Number(studentId);
    const {ethers} = require('ethers');
    const contractAddress = '0x261d5ADa2C89369E1AfCAA98d52dEb124DD9f0Ff';
    
    const getStudentData = async () => {
        try {
        const {ethereum} = window;
          if(ethereum) {
            const provider = new ethers.providers.Web3Provider(ethereum);
            await provider.send("eth_requestAccounts", []);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(contractAddress, contractABI, signer)
            const student = await contract.getStudentData(studentIdNumber);
            console.log('Student: ', student);
            if(student.name === '') {
                setStudetnDoesntExist(true)
            } else {
                setStudentInfo({
                    name: student.name, 
                    age: student.age.toString(),
                    wallet: student.wallet,
                    courses: []
                })
            }
          }
        } catch (err) {
          console.log(err);
        }
      }

      useEffect(() => {
        getStudentData();
      }, [])

  return (
    <>
    {
        studentDoesntExist 
        ?
        <div>Student Not Found</div>
        :
        <div>
            {studentInfo.name}
            {studentInfo.age}
            {studentInfo.wallet}
        </div>
    }
    </>
  )
}
