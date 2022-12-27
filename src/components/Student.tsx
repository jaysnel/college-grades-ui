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
        className='hover:bg-black text-slate-200 hover:cursor-pointer border-b'>
            <td className="border-r">{individualStudent.name}</td>
            <td className="border-r">{individualStudent.age}</td>
            <td>{individualStudent.wallet}</td>
        </tr>
    )
}
