import React, {useEffect} from 'react'
import contractABI from '../utils/contractABI.json';
import Button from '../components/Button';
import Spinner from '../components/Spinner';

declare const window: Window &
  typeof globalThis & {
    ethereum: any
}

export default function Create() {
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [validationMessage, setValidationMessage] = React.useState<string>('');
    const [successMessage, setSuccessMessage] = React.useState<string>('');
    const {ethers} = require('ethers');
    const contractAddress = '0x261d5ADa2C89369E1AfCAA98d52dEb124DD9f0Ff'
    const [studentName, setStudentName] = React.useState<string>('');
    const [studentAge, setStudentAge] = React.useState<number>(0);
    const [studentWallet, setStudentWallet] = React.useState<string>('');
    
    const formValidation = (data: {studentName: string; studentAge: number; studentWallet: string}) => {
        if(data.studentName === '' || studentAge === 0 || studentWallet === '') return false;
        return true;
    }

    const updateStudentName = (e: { target: { value: string; }; }) => {
        const value = e.target.value;
        setStudentName(value);
    }
    const updateStudentAge = (e: { target: { value: string; }; }) => {
        const value = e.target.value;
        setStudentAge(Number(value));
    }
    const updateStudentWallet = (e: { target: { value: string; }; }) => {
        const value = e.target.value;
        setStudentWallet(value);
    }

    const addNewStudent = async () => {
        try {
            setIsLoading(true);
            setValidationMessage('');
            const {ethereum} = window;
            if(ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum);
                await provider.send("eth_accounts", []);
                const signer = await provider.getSigner();
                // const account = await ethereum.request({method: 'eth_accounts'});
                const contract = new ethers.Contract(contractAddress, contractABI, signer);
                const studentData = {
                    studentName,
                    studentAge, 
                    studentWallet
                }
                const validated = formValidation(studentData);
                if(validated) {
                    await contract.addStudent(studentName, studentAge, studentWallet);
                    setSuccessMessage('Transaction has completed. Give this a few seconds/minutes to show');
                } else {
                    setValidationMessage('All fields need to be filled out');
                }
            }
            setIsLoading(false);
        } catch (err: any) {
            console.log('ERROR: ', err);
            setIsLoading(false);
        }
    }

  return (
    <>
        <h3 className='mt-5'>Student Name</h3>
        <input 
        onChange={updateStudentName}
        value={studentName}
        className='w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' type="text" placeholder="Student Name" name="studentName" id="" />
        <h3 className='mt-5'>Student Age</h3>
        <input 
        onChange={updateStudentAge}
        value={studentAge}
        className='w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' type="number" placeholder="Student Age" name="studentAge" id="" />
        <h3 className='mt-5'>Student Wallet</h3>
        <input 
        onChange={updateStudentWallet}
        value={studentWallet}
        className='w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' type="text" placeholder="Student Wallet" name="studentWallet" id="" />
        {validationMessage !== '' && <div className='text-center my-5 text-red-400'>{validationMessage}</div>}
        {successMessage !== '' && <div className='text-center my-5 text-green-400'>{successMessage}</div> }
        {
            isLoading
            ? <div className="flex justify-center mt-5"><Spinner /></div>
            : <div className="mt-5"><Button buttonFunction={addNewStudent} buttonText="Add Student"/></div>
        }
    </>
  )
}
