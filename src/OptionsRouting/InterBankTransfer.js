/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import feesPayment from './Images/Money.png'
import { Link, useNavigate } from 'react-router-dom';

const InterBankTransfer = (props) => {

  const nav =useNavigate();

  const[InterBankData, changeInterBankData] =React.useState({
    AccountNumber:"",
    amount:{}


  });
  //function to send the transaction details to the server for storage

  function sendTransationDetails(){
   
    let objectToSend = {
      accountHolder:props.AccountHolder,
      receiver:InterBankData.AccountNumber,
      amount: InterBankData.amount,
    };
    //sending the data
    fetch(`http://localhost:8080/receiveHistory`,{
      method:"POST",
      body:JSON.stringify(objectToSend),
      headers:{
        "Content-type":"application/json; charset=UTF-8",
        },
      
    }).then(response=>response.text())
    .then(data=>alert(data)) 
  }


  //to determine when to display The error message
  const[conditionalRender, changeConditionalRender] = React.useState(false);

  //handling change in user deatils
  function UpdateUserDetails(){

    fetch(`http://localhost:8080/${props.AccountHolder}?balance=${InterBankData.amount}`,{
      method:"PUT",
      body:JSON.stringify(InterBankData),
      headers:{
        "Content-type":"application/json; charset=UTF-8",
        },
      
    });

  }

  //logging the value of feesData
  console.log(InterBankData);
  function handleFormChange(event){

    changeInterBankData((prev)=>{
      return {
        ...prev,
        [event.target.name ]:event.target.value

      };
    });
    
  }

  function handleSubmit(event){
    console.log("AirTime Successfully Bought");
    event.preventDefault();

    //logic for allowing the fees transaction
    let value = props.bal;

    if(InterBankData.amount> value){
      console.log("Insuficient balance");
      changeConditionalRender(true);

    }else if(InterBankData.AccountNumber.length>10 && InterBankData.amount < value){
      UpdateUserDetails();
      sendTransationDetails();
      console.log("Transaction successful");
      nav('/optionPage');

    }else{
      console.log('Something went wrong on Receiver details');
    }

  }

  return (
    <div >

        <nav>

        <img src={feesPayment} height={200} width={250} className='feesPayment'/>
        <h2>ZIP IT Transfer</h2>

        </nav>

        
        <nav className='feesHeader'>
          <small>Account Holder :{props.name}</small>
          <hr></hr>
          <small> Remaining Balance : {props.bal}</small>
        </nav>
        

        <form onSubmit={handleSubmit} className='feesSubmitForm'>
          <nav className='feesNav'>
          <label htmlFor='AccountNUmber'>Receiver Account :</label>
          <input placeholder='0780001324' name='AccountNumber' size={30} onChange={handleFormChange}/>


          </nav>

          <nav2>
          <label htmlFor='amount'> Amount :</label>
          <input placeholder='Enter Amount' name='amount' size={35} onChange={handleFormChange}/>

          </nav2>

          <nav>
          <button className='AirTimeSubmitButton'>Transact</button>

          </nav>

        </form>
        {
            conditionalRender ? <nav style={{color:'red'}}>Insuficient funds
            </nav> : <nav></nav>
          }

          
          <Link to={'/optionPage'}>Home Page</Link>
      
    </div>
  )
}

export default InterBankTransfer
