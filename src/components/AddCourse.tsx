import React from 'react';
import Button from './Button'
import contractABI from '../utils/contractABI.json';
import collegeCourses from '../utils/collegeCourses.json';
import collegeCredits from '../utils/collegeCredits.json';


declare const window: Window &
typeof globalThis & {
    ethereum: any
}

export default function AddCourse(props: {showModal: boolean; showCourseModal: any; studentId: number}) {
  const {showModal, showCourseModal, studentId} = props
  const {ethers} = require('ethers');
  const contractAddress = '0x261d5ADa2C89369E1AfCAA98d52dEb124DD9f0Ff';
  const [courseName, setCourseName] = React.useState<string>('');
  const [courseCredit, setCourseCredit] = React.useState<string>('');
  const [courseGrade, setCourseGrade] = React.useState<string>('');

  const updateCourseName = async (e: { target: { value: string; }; }) => {
    let value = e.target.value;
    setCourseName(value);
  }
  const updateCourseCredit = (e: { target: { value: string; }; }) => {
    let value = e.target.value;
    setCourseCredit(value);
  }
  const updateCourseGrade = (e: { target: { value: string; }; }) => {
    let value = e.target.value;
    setCourseGrade(value);
  }

  const addCourse = async () => {
    try {
        const {ethereum} = window;
          if(ethereum) {
            const provider = new ethers.providers.Web3Provider(ethereum);
            await provider.send("eth_requestAccounts", []);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(contractAddress, contractABI, signer)
            // const addStudentCourse = await contract.addCourse()
            // console.log(studentId, contract);
            const studentCourseData = {
                id: studentId,
                courseName,
                courseCredit,
                courseGrade
            }
            console.log(studentCourseData);
          }
        } catch (err) {
          console.log(err);
        }
  }
  return (
    <div className={`${!showModal ? 'hidden': 'relative m-auto flex flex-col justify-center items-center min-h-80 w-2/3 border border-blue-300'}`}>
        <div 
        className='hover:cursor-pointer absolute top-0 right-0 mr-5 mt-5 p-1 bg-blue-300'
        onClick={() => {showCourseModal && showCourseModal()}}>X</div>
        <div className='w-60'>
            <h3 className='mt-5'>Student ID</h3>
            <input 
            value={studentId}
            className='w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' type="text" disabled placeholder="Student ID" name="studentId" id="" />
            <h3 className='mt-5'>Course Name</h3>
            <select onChange={updateCourseName} className='w-full shadow border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'>
            {
                collegeCourses.map((course) => (
                    <option value={course.name}>{course.name}</option>
                ))
            }
            </select>
            <h3 className='mt-5'>Course Credit</h3>
            <select onChange={updateCourseCredit} className='w-full shadow border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'>
            {
                collegeCredits.map((course) => (
                    <option value={course.credit}>{course.credit}</option>
                ))
            }
            </select>
            <h3 className='mt-5'>Course Grade</h3>
            <input 
            onChange={updateCourseGrade}
            className='w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' type="text" placeholder="Course Grade" name="courseGrade" id="" />
        </div>
        <div className='w-60 my-5'>
            <Button buttonFunction={addCourse} buttonText='Add'/>
        </div>
    </div>
  )
}
