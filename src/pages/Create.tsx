import {useEffect} from 'react'
import contractABI from '../utils/contractABI.json';
import Button from '../components/Button';

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
                const addNewStudent = contract.addStudent('John', 55, '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266');
                await addNewStudent();
                console.log('Student added')
            }
        } catch (err: any) {
            console.log('ERROR: ', err);
        }
    }

    useEffect(() => {
        // addNewStudent();
    }, [])
  return (
    <>
        <div>Create</div>
        <Button buttonFunction={addNewStudent} buttonText="Add Student"/>
    </>
  )
}
