import React from 'react'

const TopUp = (props) => {

  const[TopUp, changeData] = React.useState({
    number:'0780001234',
    amount:'10'
  })

    function HandleTopUp(){

    fetch(`http://localhost:8082/accountNumber${props.AccountHolder}?balance=${TopUp.amount}?phoneNumber=${TopUp.number}`,{
      method:"PUT",
      body:JSON.stringify(),
      headers:{
        "Content-type":"application/json; charset=UTF-8",
        },
      
    })
        
    }

  return (
    <div>
       
        <form onSubmit={HandleTopUp}>
                <h1>TopUp Account with ecocash</h1>
                <label htmlFor='ecocashNumber'>Ecocash Number : </label>
                <input type='text' placeholder='Enter phone number' />

                <br></br>

                <label htmlFor='amount'>Amount :</label>
                <input type='number' placeholder='Enter Amount' />

                <button>Top Up</button>



        </form>
      
    </div>
  )
}

export default TopUp
