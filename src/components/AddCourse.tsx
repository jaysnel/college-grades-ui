import React from 'react';
import Button from './Button'
import contractABI from '../utils/contractABI.json';
import collegeCourses from '../utils/collegeCourses.json';
import collegeCredits from '../utils/collegeCredits.json';
import Spinner from './Spinner';

declare const window: Window &
typeof globalThis & {
    ethereum: any
}

export default function AddCourse(props: {showModal: boolean; showCourseModal: any; studentId: number}) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const {showModal, showCourseModal, studentId} = props;
  const [validationMessage, setValidationMessage] = React.useState<string>('');
  const [successMessage, setSuccessMessage] = React.useState<string>('');
  const {ethers} = require('ethers');
  const contractAddress = '0x261d5ADa2C89369E1AfCAA98d52dEb124DD9f0Ff';
  const [courseName, setCourseName] = React.useState<string>('');
  const [courseCredit, setCourseCredit] = React.useState<string>('');
  const [courseGrade, setCourseGrade] = React.useState<any>(undefined); // Not something i want to do but i want to make sure the input starts as blank, otherwise the UX is bad since you have to highlight and delete. But ths does cause an error but it does not effect the application
  const min = 0;
  const max = 100;

  const formValidation = (data: {courseName: string; courseCredit: string; courseGrade: number}) => {
    if(data.courseName === '' || courseCredit === '' || courseGrade === undefined) return false;
    return true;
  }

  const updateCourseName = async (e: { target: { value: string; }; }) => {
    const value = e.target.value;
    setCourseName(value);
  }
  const updateCourseCredit = (e: { target: { value: string; }; }) => {
    const value = e.target.value;
    setCourseCredit(value);
  }
  const updateCourseGrade = (e: { target: { value: string; }; }) => {
    const value = Math.max(min, Math.min(max, Number(e.target.value)));
    // changing this to number. With typescript was running into weird error on using onChange. Not sure how to fix it at this moment.
    setCourseGrade(Number(value));
  }

  const addCourse = async () => {
    try {
      setIsLoading(true);
      setValidationMessage('');
        const {ethereum} = window;
          if(ethereum) {
            const provider = new ethers.providers.Web3Provider(ethereum);
            await provider.send("eth_requestAccounts", []);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(contractAddress, contractABI, signer);
            const studentCourseData = {
                id: studentId,
                courseName,
                courseCredit,
                courseGrade
            }
            const validated = formValidation(studentCourseData);
            if(validated) {
              await contract.addCourse(studentId, courseName, courseCredit, courseGrade);
              setSuccessMessage('Transaction has completed. Give this a few seconds/minutes to show');
            } else {
              setValidationMessage('All fields need to be filled out');
            }
          }
          setIsLoading(false);
        } catch (err) {
          console.log(err);
          setIsLoading(false);
        }
  }
  return (
    <div className={`${!showModal ? 'hidden': 'relative m-auto flex flex-col justify-center items-center min-h-80 border border-blue-300'}`}>
        <div 
        className='hover:cursor-pointer absolute top-0 right-0 mr-5 mt-5 p-1'
        onClick={() => {showCourseModal && showCourseModal()}}>X</div>
        <div className='w-60'>
            <h3 className='mt-5'>Student ID</h3>
            <input 
            value={studentId}
            className='w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' type="text" disabled placeholder="Student ID" name="studentId" id="" />
            <h3 className='mt-5'>Course Name</h3>
            <select 
            defaultValue='Select Course'
            onChange={updateCourseName} className='w-full shadow border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'>
            {
                collegeCourses.map((course, idx) => (
                    <option 
                    disabled={course.name === 'Select Course' ? true : false}
                    key={idx}
                    value={course.name}>{course.name}</option>
                ))
            }
            </select>
            <h3 className='mt-5'>Course Credit</h3>
            <select 
            defaultValue='Select Credit'
            onChange={updateCourseCredit} className='w-full shadow border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'>
            {
                collegeCredits.map((course, idx) => (
                    <option 
                    disabled={course.credit === 'Select Credit' ? true : false}
                    key={idx}
                    value={course.credit}>{course.credit}</option>
                ))
            }
            </select>
            <h3 className='mt-5'>Course Grade</h3>
            <input 
            onChange={updateCourseGrade}
            value={courseGrade}
            className='w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' type="number" placeholder="Course Grade" name="courseGrade" id="" />
        </div>
        <div className='w-60 my-5'>
            {validationMessage !== '' && <div className='text-center mb-5 text-red-400'>{validationMessage}</div>}
            {successMessage !== '' && <div className='text-center my-5 text-green-600'>{successMessage}</div> }
            {
              isLoading
              ? <div className="flex justify-center"><Spinner /></div>
              : <Button buttonFunction={addCourse} buttonText='Add'/>
            }
        </div>
    </div>
  )
}
