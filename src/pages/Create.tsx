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
                await provider.send("eth_requestAccounts", []);
                const signer = provider.getSigner();
                const contract = new ethers.Contract(contractAddress, contractABI, signer);
                console.log(contract);
            }
        } catch (err: any) {
        console.log(err);
        }
    }

    useEffect(() => {
        addNewStudent();
    }, [])
  return (
    <div>Create</div>
  )
}
