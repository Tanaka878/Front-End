/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react'
import {Link, useNavigate} from 'react-router-dom'



const LoginPage = (props) => {
    
    const navigate = useNavigate()

    const[count, chnageCount] = React.useState();

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
        fetch(`https://distinguished-happiness-production.up.railway.app/customer/${count}`)
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
    <img src="/src/LoginPage/Images/Money.png" alt="Bank Images" />

        <form onSubmit={submitButton} className='loginPage'>
        <h1 className='LoginHeader'>Welcome To Accute banking online services</h1>

        <label htmlFor='AccountNumber'>Email :</label>
        <input type='text' 
        
         id='AccountNumber' 
         name='accountNumber'
         placeholder='someone@gmail.com'

        onChange={handleChange}/>
        <br></br>
        <br></br>

        <label htmlFor='pinNumber'>Password :</label>
        <input type='password' id='pinNumber' 
        placeholder='Enter Pin ' name='Pin'
        onChange={handleChange}/>

        {conditionalRender? <nav className='conditionalRender'>Wrong Credentilas</nav> : <nav></nav>}

        <br></br>
        <br></br>

        <button className='submitButton' onClick={()=>props.getDetails(userData.name, userData.balance,userData.accountNumber)
        }>Login</button>

<footer>
        <br></br>
        <Link to={'/newUser'}>Register</Link>
        <br></br>
        <br></br>
        <small>@Copyright AccuteBanking 2023</small>
        <br></br>
        
        <small>All Rights Reserved</small>
    </footer>
      
    </form>

    

    </div>
    

  )
}

export default LoginPage
