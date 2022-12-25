import React from 'react'

export default function StudentTable(props: { studentData: object[]; }) {
    const {studentData} = props;
    console.log('Student Table: ', studentData)
  return (
    <div className=''>
    <h2>STUDENT TABLE</h2>
    <table className="table-auto bg-slate-800">
        <thead>
            <tr>
            <th className='border-b border-slate-600 font-medium text-slate-200 text-left'>Name</th>
            <th>Wallet</th>
            <th>Courses</th>
            </tr>
        </thead>
        <tbody className='bg-slate-800'>
            {/* {studentData.map((student, idx) => {
                return (
                    <td>{student.name}</td>
                )
            })} */}
            <tr>
            <td>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
            <td>Malcolm Lockyer</td>
            <td>1961</td>
            </tr>
            <tr>
            <td>Witchy Woman</td>
            <td>The Eagles</td>
            <td>1972</td>
            </tr>
            <tr>
            <td>Shining Star</td>
            <td>Earth, Wind, and Fire</td>
            <td>1975</td>
            </tr>
        </tbody>
    </table>
</div>
  )
}
