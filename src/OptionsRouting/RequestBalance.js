import React from "react";
import { Link } from "react-router-dom";

const RequestBalance = (props) => {

  

  const[userData, changeUserData] = React.useState([])

    //fetching the data from the server
    React.useEffect(function (){
      fetch(`http://localhost:8080/history/${props.AccountHolder}`)
      .then(res=> res.json())
      .then(result=>{
      // eslint-disable-next-line react-hooks/exhaustive-deps
        result.map((item)=>{
        
        changeUserData((prevData)=>{
          return [
            ...prevData, item
          ]

        });
        })
      })
  
    },[])
  
  return (

    <div>
      <table class="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">AccountHolder</th>
      <th scope="col">Reciver</th>
      <th scope="col">Amount</th>
      <th scope='col'>localDate</th>
    </tr>
  </thead>
  <tbody>
    {
      userData.map((item)=>{

        return (
          <tr>
          <th scope="row">{item.id}</th>
    
    <td>{item.accountHolder}</td>
    <td>{item.receiver}</td>
    <td>{item.amount}</td>
    <td>{item.localDate}</td>
    
       </tr>

        )
      })
      
    }
  </tbody>
</table>

<Link to='/optionPage'>Home</Link>

    </div>
  )
}

export default RequestBalance
