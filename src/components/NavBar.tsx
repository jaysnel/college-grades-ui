import { Link } from 'react-router-dom';

export default function NavBar() {
  return (
    <div className='flex justify-center content-between my-5'>
        <Link className='px-2 hover:bg-slate-200' to="/">Directory</Link>
        <Link className='px-2 hover:bg-slate-200' to="/create">Add Student</Link>
    </div>
  )
}
