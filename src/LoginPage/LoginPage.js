import React from 'react'
import {Link, useNavigate} from 'react-router-dom'


const LoginPage = (props) => {
    let value1 = null;
    const navigate = useNavigate()

    const[count, chnageCount] = React.useState(20000);

    // a new state to save the values from the form

    const[enteredValues, setEnteredValues] = React.useState({
        accountNumber:"",
        Pin:"",
        

    })
    //the function to store changes in the form inputs
    const[userData, setUserData] = React.useState({
        id:"",
        name:"",
        surname:"",
        email:"",
        accountNumber:{},
        password:"",
        balance:{}
    })

    React.useEffect(function(){
        console.log(count)
        fetch(`http://localhost:8080/${count}`)
        .then(res=>res.json()
        .then(data=> setUserData(function(prev){

            return {
                
                id: data.id,
                name:data.name,
                surname:data.surname,
                email:data.email,
                accountNumber:data.accountNumber,
                password:data.password,
                balance:data.balance


            }


        })))

    },[count])

    console.log(userData)
   
    const[conditionalRender, changeConditionalRender] = React.useState(false)
    
    // func to handle data submission

    function submitButton(event){
      event.preventDefault();
       
       console.log("submitted")
      

       chnageCount(function(prevCount){
        
        return enteredValues.accountNumber
       })
       console.log("count state updated");

       if(userData.password === enteredValues.Pin){
        navigate('/optionPage')

        console.log('Authenticated');
       }else{
        console.log("Failed to authenticate")
        changeConditionalRender(()=>{
            return true;
        })
       }

    }

    //func used to manipulate the state of userData

    function handleChange(event){

        setEnteredValues(function(prevData){
            return {
                ...prevData,
                [event.target.name]:event.target.value
            }
        })
    }
  return (
    <div>
        <form onSubmit={submitButton} className='loginPage'>
        <h1 className='LoginHeader'>Welcome To Accute banking online services</h1>

        <label htmlFor='AccountNumber'>Account Number #:</label>
        <input type='text' 
        placeholder='Enter Account Number'
         id='AccountNumber' 
         name='accountNumber'
        onChange={handleChange}/>
        <br></br>
        <br></br>

        <label htmlFor='pinNumber'>PIN Number# :</label>
        <input type='password' id='pinNumber' 
        placeholder='Enter Pin ' name='Pin'
        onChange={handleChange}/>

        {conditionalRender? <nav className='conditionalRender'>Wrong Credentilas</nav> : <nav></nav>}

        <br></br>
        <br></br>

        <button className='submitButton' onClick={()=>props.getDetails(userData.name, userData.balance,userData.accountNumber)
        }>Login</button>
      
    </form>

    <footer>
        <br></br>
        <Link to={'/newUser'}>Register</Link>
        <br></br>
        <br></br>
        <small>@Copyright AccuteBanking 2023</small>
        <br></br>
        
        <small>All Rights Reserved</small>
    </footer>

    </div>
    

  )
}

export default LoginPage
