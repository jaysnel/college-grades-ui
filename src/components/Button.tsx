import React from 'react'

export default function Button(props: { buttonFunction: any; buttonText: string; }) {
    const {buttonFunction, buttonText} = props
  return (
    <button className='btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full' 
    onClick={() => {buttonFunction && buttonFunction()}}>{buttonText}</button>
  )
}
