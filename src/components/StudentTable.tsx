import { useNavigate } from "react-router-dom"
import {StudentData} from '../pages/Home';
import IndividualStudent from './IndividualStudent';

export default function StudentTable(props: { studentData: StudentData[]; }) {
    const navigate = useNavigate()
    const {studentData} = props;
    console.log('Student Table: ', studentData)
    const expandStudentData = (id: number) => {
        navigate(`/student/${id}`);
    }
    return (
        <div>
        <table className="w-full table-auto bg-slate-800">
            <thead>
                <tr>
                <th className='border-b border-r font-medium text-slate-200 text-left'>Name</th>
                <th className='border-b border-r font-medium text-slate-200 text-left'>Age</th>
                <th className='border-b font-medium text-slate-200 text-left'>Wallet</th>
                </tr>
            </thead>
            <tbody className='bg-slate-800'>
                {studentData.map((student, idx) => {
                    return (
                        <IndividualStudent 
                        studentFunction={expandStudentData}
                        key={idx}
                        id={idx}
                        individualStudent={student}/>
                    )
                })}
        </tbody>
        </table>
        </div>
    )
}
