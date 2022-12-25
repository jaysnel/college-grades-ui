import {StudentData} from '../pages/Home';
import Student from './Student';

export default function StudentTable(props: { studentData: StudentData[]; }) {
    const {studentData} = props;
    console.log('Student Table: ', studentData)
    const expandStudentData = (id: number) => {
        console.log(`/student/${id}`);
    }
    return (
        <div className=''>
        <h2>STUDENT TABLE</h2>
        <table className="table-auto bg-slate-800">
            <thead>
                <tr>
                <th className='border-b border-slate-600 font-medium text-slate-200 text-left'>Name</th>
                <th className='border-b border-slate-600 font-medium text-slate-200 text-left'>Age</th>
                <th className='border-b border-slate-600 font-medium text-slate-200 text-left'>Wallet</th>
                </tr>
            </thead>
            <tbody className='bg-slate-800'>
                {studentData.map((student, idx) => {
                    return (
                        <Student 
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
