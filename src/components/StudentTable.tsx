import {StudentData} from '../pages/Home';

export default function StudentTable(props: { studentData: StudentData[]; }) {
    const {studentData} = props;
    console.log('Student Table: ', studentData)

  return (
    <div className=''>
    <h2>STUDENT TABLE</h2>
    <table className="table-auto bg-slate-800">
        <thead>
            <tr>
            <th className='border-b border-slate-600 font-medium text-slate-200 text-left'>Name</th>
            <th className='border-b border-slate-600 font-medium text-slate-200 text-left'>Age</th>
            <th className='border-b border-slate-600 font-medium text-slate-200 text-left'>Wallet</th>
            <th className='border-b border-slate-600 font-medium text-slate-200 text-left'>Courses</th>
            </tr>
        </thead>
        <tbody className='bg-slate-800'>
            {studentData.map((student, idx) => {
                return (
                    <tr key={idx} className='text-slate-200'>
                        <td>{student.name}</td>
                        <td>{student.age}</td>
                        <td>{student.wallet}</td>
                    </tr>
                )
            })}
        </tbody>
    </table>
</div>
  )
}
