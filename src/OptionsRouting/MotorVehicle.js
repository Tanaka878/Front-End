/* eslint-disable react/jsx-no-comment-textnodes */
import React from 'react'

const MotorVehicle = (props) => {

    const[paymentDetails, changeState] = React.useState({
        amount:{},
        registrationNumber:"",
        receiver: "ZINARA"

    })

    //holding state for displaying error message
    const[conditionalRender, changeConditionalRender] = React.useState(true)

    function SendData(){
        //using the useEffect for interaction with external env
        let objectToSend = {
            accountHolder:props.AccountHolder,
            receiver:paymentDetails.receiver,
            amount:paymentDetails.amount,
            registrationNumber:paymentDetails.registrationNumber
           
      
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
    //function for handling submission of the form

    function handleSubmit(event){
        event.preventDefault();

        let amount = paymentDetails.amount;
        let registrationNumber = paymentDetails.registrationNumber;

        //checking to see if the user has the amount to perform the transaction

        if(amount > props.bal)
            {
                console.log("Insufficient Funds to perfom transaction");
                changeConditionalRender(false);

            }
           else if( (amount < props.bal) && (registrationNumber ==! null)){

            console.log("Transaction Processed");
            SendData();
           }



    }


    //function for handling form change
    function handleFormChange(event){
        //event.preventDefault();

        changeState((prevData)=>{

            return{
                ...prevData, 
                [event.target.name] :[event.target.value]
            }
        

        })

    }


  return (
    <div>

        <header className='vehicleInsurerance'>Accute Banking Services</header>

        <nav>
            <div style={{display:'flex'}}>
                <h2>Name :</h2>
                <h2>{props.name}</h2>
            </div>

            <div style={{display:'flex'}}>
                <h2>Account Number :</h2>
                <h2>{props.AccountHolder}</h2>
            </div>

            <div style={{display:'flex'}}>
                <h2>Balance :</h2>
                <h2>{props.bal}</h2>
            </div>
           

        </nav>

        <nav>
            <h1>
            Pay MotorVehicle Insurerance
            </h1>

            <form onChange={handleFormChange}>
                <label htmlFor='registrationNumber'>Registration Number</label>
                <input type='text' required placeholder='ABC1234' id='registrationNumber'/>

                //label for selecting longevity of licence

                <label htmlFor='amount'>Select Package</label>
                <input type='text' placeholder='Enter amount in USD' required id='amount'/>

                {
                    conditionalRender ? <h1 style={{color:'red'}}>Insufficient Funds</h1> :
                    <nav></nav>
                }

                <button onClick={handleSubmit}>Proceed Payment</button>
                
            </form>
            
        </nav>

        <footer className='footer'>
            Accute Banking Services. All rights reserved 2024
        </footer>
      
    </div>
  )
}

export default MotorVehicle
