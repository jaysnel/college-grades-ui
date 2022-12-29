import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import contractABI from '../utils/contractABI.json';
import Button from "../components/Button";
import AddCourse from "../components/AddCourse";
import Spinner from "../components/Spinner";

declare const window: Window &
typeof globalThis & {
    ethereum: any
}

export default function Student() {
    const [isLoading, setIsLoading] = React.useState<boolean>(true);
    const [showModal, setShowModal] = React.useState<boolean>(false);
    const [studentDoesntExist, setStudetnDoesntExist] = React.useState<boolean>(false);
    const [studentGPA, setStudentGPA] = React.useState<number>(0);
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
    
    const showCourseModal = () => {
        setShowModal(showModal ? false : true);
    }

    const getStudentData = async () => {
        try {
        const {ethereum} = window;
          if(ethereum) {
            const provider = new ethers.providers.Web3Provider(ethereum);
            await provider.send("eth_requestAccounts", []);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(contractAddress, contractABI, signer)
            const student = await contract.getStudentData(studentIdNumber);
            if(student.name === '') {
                setStudetnDoesntExist(true)
            } else {
                setStudentInfo({
                    name: student.name, 
                    age: student.age.toString(),
                    wallet: student.wallet,
                    courses: student.courses
                })
            }
            // only set GPA if student has courses added, otherwise this errors out and breaks function
            if(student.courses.length > 0) {
                const studentGPA = await contract.getGPA(studentId);
                setStudentGPA(Number(studentGPA.toString()));
            }
            setIsLoading(false);
          }
        } catch (err) {
          console.log(err);
          setIsLoading(false);
        }
      }

      useEffect(() => {
        getStudentData();
      }, [])

      if(isLoading) {
        return (
            <div className="flex justify-center mt-5">
                <Spinner />
            </div>
        )
      }

  return (
    <>
    {
        studentDoesntExist 
        ?
        <div>Student Not Found</div>
        :
        <div className={`${showModal ? 'hidden' : 'm-auto flex flex-col justify-center items-center min-h-80 border border-blue-300'}`}>
            <div>
                <div className="my-3">
                    <div>
                        <b>Name:</b> {studentInfo.name}
                    </div>
                    <div>
                        <b>Age:</b> {studentInfo.age}
                    </div>
                    <div>
                        <b>Wallet:</b> {studentInfo.wallet}
                    </div>
                </div>
                <>
                <thead>
                    <tr>
                        <th className="pr-5">Courses</th>
                        <th className="pr-5">Credits</th>
                        <th className="pr-5">Grade</th>
                        <th className="pr-5">GPA</th>
                    </tr>
                </thead>
                <tbody className=''>
                {
                        studentInfo.courses.map((course, idx) =>{
                            return (
                                <tr key={idx}>
                                    <td className="pr-5">{course['name']}</td>
                                    <td className="pr-5">{Number(course['credits'])}</td>
                                    <td className="pr-5">{Number(course['grade'])}</td>
                                    {idx === 0 ? <td className="pr-5">{studentGPA}</td> : undefined}
                                </tr>
                            )
                        })
                    }
                </tbody>
                </>
            </div>
            <Button buttonFunction={showCourseModal} buttonText='Add Course'/>
        </div>
    }
    <AddCourse showModal={showModal} showCourseModal={showCourseModal} studentId={studentIdNumber}/>
    </>
  )
}
