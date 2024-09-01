/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import feesPayment from './Images/phone.png'
import { Link, useNavigate } from 'react-router-dom';



const BuyAirTime = (props) => {

  const nav = useNavigate()


  const[AirTimeData, changeAirTimeData] =React.useState({
    phoneNumber:"",
    amount:{}


  });

  //to determine when to display The error message
  const[conditionalRender, changeConditionalRender] = React.useState(false);

  //handling changes in user data
  function UpdateUserDetails(){

    fetch(`http://localhost:8080/${props.AccountHolder}?balance=${AirTimeData.amount}`,{
      method:"PUT",
      body:JSON.stringify(AirTimeData),
      headers:{
        "Content-type":"application/json; charset=UTF-8",
        },
      
    })
    


  }

  function sendTransationDetails(){
   
    let objectToSend = {
      accountHolder:props.AccountHolder,
      receiver:AirTimeData.phoneNumber,
      amount:AirTimeData.amount,
     

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

  //logging the value of feesData
  console.log(AirTimeData);
  function handleFormChange(event){

    changeAirTimeData((prev)=>{
      return {
        ...prev,
        [event.target.name ]:event.target.value

      };
    });
    
  }

  function handleSubmit(event){
    console.log("AirTime Successfully Bought");
    event.preventDefault()

    //logic for allowing the fees transaction
    let value = props.bal;

    if(AirTimeData.amount> value){
      console.log("Insuficient balance");
      changeConditionalRender(true);
    }else if(AirTimeData.phoneNumber.length===9  && AirTimeData.amount< value){
      UpdateUserDetails();
      sendTransationDetails();
      console.log("Transaction successful");
      nav('/optionPage')

    }else{
      console.log('The receiver details empty')
    }

  }

  return (
    <div >

        <nav>

        <img src={feesPayment} height={200} width={250} className='feesPayment'/>
        <h2>Buy Aitime</h2>

        </nav>
    

        <nav className='feesHeader'>
          <small>ACCOUNT HOLDER :{props.name}</small>
          
          <small>ACCOUNT NUMBER : {props.AccountHolder}</small>
         
          <small> REMAINING BALANCE : {props.bal}</small>
        </nav>
        
        
        <form onSubmit={handleSubmit} className='feesSubmitForm'>
          <nav className='feesNav'>
          <label htmlFor='phoneNumber'>Phone Number :</label>
          <input placeholder='0780001324' name='phoneNumber' size={30} onChange={handleFormChange}/>


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
            </nav> : <nav style={{color:'green'}}></nav>
          }

<Link to={'/optionPage'}>Home Page</Link>
      
    </div>
  )
}

export default BuyAirTime
