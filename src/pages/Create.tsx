import {useEffect} from 'react'
import contractABI from '../utils/contractABI.json';

declare const window: Window &
  typeof globalThis & {
    ethereum: any
}

export default function Create() {
    const {ethers} = require('ethers');
    const contractAddress = '0x261d5ADa2C89369E1AfCAA98d52dEb124DD9f0Ff'
    const addNewStudent = async () => {
        try {
            const {ethereum} = window;
            if(ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum);
                await provider.send("eth_accounts", []);
                const signer = await provider.getSigner();
                console.log(signer);
                const account = await ethereum.request({method: 'eth_accounts'});
                console.log(account[0]);
                const contract = new ethers.Contract(contractAddress, contractABI, signer);
                console.log(contract)
                const addNewStudent = contract.addStudent('Jaylan', 28, account[0]);
                await addNewStudent();
                console.log('Student added')
            }
        } catch (err: any) {
            console.log(err);
        }
    }

    useEffect(() => {
        // addNewStudent();
    }, [])
  return (
    <>
        <div>Create</div>
        <button className='btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={() => {addNewStudent()}}>Add Student</button>
    </>
  )
}
