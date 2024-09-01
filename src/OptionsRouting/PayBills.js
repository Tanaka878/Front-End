/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/jsx-no-comment-textnodes */
import React from 'react'
import BillImage from './Images/paying.webp'
import { Link } from 'react-router-dom';

const PayBills = (props) => {
    // amount in the account before transaction
    let value = props.bal;

    const[transactionData, changeTransactionData] = React.useState({
        receiverOption:"",
        amountTobePayed:{}
    })
    console.log(transactionData);


    //function to update the details
    function updateDetails(){
    //
        fetch(`http://localhost:8080/${props.AccountHolder}?balance=${value-transactionData.amountTobePayed}`,{
      method:"PUT",
      body:JSON.stringify(transactionData),
      headers:{
        "Content-type":"application/json; charset=UTF-8",
        },
      
    })
    }

    //function to send to transaction history
    function sendTransactionHistory(){

        let objectToSend ={
            accountHolder:props.AccountHolder,
            receiver:transactionData.receiverOption,
            amount:transactionData.amountTobePayed,
        };

        fetch(`http://localhost:8080/receiveHistory`,{
      method:"POST",
      body:JSON.stringify(objectToSend),
      headers:{
        "Content-type":"application/json; charset=UTF-8",
        },
      
    }).then(response=>response.text())
    .then(data=>alert(data))
    }

    function transaction(){
        updateDetails();
        sendTransactionHistory();
    }


    function handleSubmit(event){
        event.preventDefault()

        //makin decisions on wether to process the transaction
        if(props.bal> transactionData.amountTobePayed ){
            transaction();

        }else{
            console.log("Insufficient Funds");
            console.log(props.bal)
        } 
        console.log("submited");
    }


    function handleFormChange(event){
        const{name, value, checked,type} = event.target
        changeTransactionData((prev)=>{
            return {
                ...prev,
                [name] : type==='checkbox' ? checked: value
            }

        })
        
    }
    
  return (
    <div>

        <img src={BillImage} height={200} width={250}/>

        <form onSubmit={handleSubmit}>
            <label htmlFor='receiverOption'>Select Receiver</label>
            <select id='receiverOption' onChange={handleFormChange}
            name='receiverOption'
            value={transactionData.receiverOption}>
                <option value='ZINARA'>ZINARA</option>
                <option value='ZIMRA'>ZIMRA</option>
                <option value='ZINWA'>ZINWA</option>
                <option value='ZESA'>ZESA</option>
                <option value='LIQUID TELCOM'>LIQUID TELCOM</option>
                <option value='TEL-ONE'>TEL-ONE</option>
            </select>
            <label htmlFor='amountTobePayed'>Amount $ :</label>
            <input type='text' placeholder='Amount $' name='amountTobePayed' onChange={handleFormChange}/>

            <button className='payBills'>Transact</button>
        </form>

        <Link to={'/OptionPage'}>Home Page</Link>

      
    </div>
  )
}

export default PayBills
