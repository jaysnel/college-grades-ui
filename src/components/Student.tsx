interface IndividualStudent {
    name: string; 
    age: string; 
    wallet: string; 
}
export default function Student(props: { individualStudent: IndividualStudent; id: number; studentFunction: Function}) {
    const {individualStudent, id, studentFunction} = props
    return (
        <tr 
        onClick={() => {studentFunction && studentFunction(id)}}
        className='text-slate-200 hover:cursor-pointer'>
            <td>{individualStudent.name}</td>
            <td>{individualStudent.age}</td>
            <td>{individualStudent.wallet}</td>
        </tr>
    )
}
