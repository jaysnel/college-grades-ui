import React from 'react'

export default function Spinner() {
  return (
    <svg height={60} width={60} className='animate-spin' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
      <title>gray spinner</title>
      <path d='M12 24a12 12 0 0 0 12-12h-3a9 9 0 0 1-9 9Z' fillOpacity='.1'/>
      <path d='M0 12a12 12 0 0 0 12 12v-3a9 9 0 1 1 9-9h3a12 12 0 0 0-24 0Z' fillOpacity='.5'/>
    </svg>
  )
}
