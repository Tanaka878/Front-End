/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import feesPayment from './Images/PayFees.png'
import { Link, useNavigate } from 'react-router-dom'

const FeesPayment = (props) => {

  const nav = useNavigate();

  

  //to hold the state of the data being entered in the form
  const[feesData, changeFeesData] =React.useState({
    schoolAccount:"",
    amount:{}


  });

  //a function to send the data to the server for storage
  function sendTransationDetails(){
   
    let objectToSend = {
      accountHolder:props.AccountHolder,
      receiver:feesData.schoolAccount,
      amount:feesData.amount,
     

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



  function UpdateUserDetails(){

    fetch(`http://localhost:8080/${props.AccountHolder}?balance=${feesData.amount}`,{
      method:"PUT",
      body:JSON.stringify(feesData),
      headers:{
        "Content-type":"application/json; charset=UTF-8",
        },
      
    })

  }

  //to determine when to display The error message
  const[conditionalRender, changeConditionalRender] = React.useState(false);
  

  //logging the value of feesData
  console.log(feesData);
  function handleFormChange(event){

    changeFeesData((prev)=>{
      return {
        ...prev,
        [event.target.name ]:event.target.value

      };
    });
    
  }

  function handleSubmit(event){
    console.log("fees Payed");
    event.preventDefault()

    //logic for allowing the fees transaction
    let value = props.bal;

    if(feesData.amount> value){
      console.log("Insuficient balance");

      changeConditionalRender(true);
      

    }else if(feesData.schoolAccount.length>4 && feesData.amount<value){
      nav('/optionPage');

      sendTransationDetails();
      UpdateUserDetails();

    }else{
      console.log('Error in The receiver account Number');
    }

  }

  return (
    <div >

        

        <img src={feesPayment} height={200} width={250} className='feesPayment'/>

        <nav className='feesHeader'>
          <small>Account Holder :{props.name}</small>
          <hr></hr>
          <small> Remaining Balance : {props.bal}</small>
        </nav>
        
        <form onSubmit={handleSubmit} className='feesSubmitForm'>
          <nav className='feesNav'>
          <label htmlFor='schoolAccount'>Account Number :</label>
          <input placeholder='School Account Number' name='schoolAccount' size={30} onChange={handleFormChange}/>


          </nav>

          <nav2>
          <label htmlFor='amount'> Amount :</label>
          <input placeholder='Enter Amount' name='amount' size={35} onChange={handleFormChange}/>
          </nav2>

          <nav>
          <button className='feesSubmitButton'>Transact</button>

          </nav>
        
        </form>
        {
            conditionalRender ? <nav style={{color:'red'}}>Insuficient funds
            </nav> : <nav></nav>
        }

          

<Link to={'/OptionPage'}>Home Page</Link>
      
      
    </div>
  )
}

export default FeesPayment
