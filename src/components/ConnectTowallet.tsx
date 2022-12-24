import React from 'react'

export default function ConnectTowallet(props: { message: string; }) {
  const {message} = props;
    return (
    <>
        <div>{message}</div>
    </>
  )
}
