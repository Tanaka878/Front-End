import './App.css';
import React from 'react';
import LoginPage from './LoginPage/LoginPage';
import OptionLinkPage from './LoginPage/OptionLinkPage';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import FeesPayment from './OptionsRouting/FeesPayment';
import BuyAirTime from './OptionsRouting/BuyAirTime';
import InterBankTransfer from './OptionsRouting/InterBankTransfer';
import RequestBalance from './OptionsRouting/RequestBalance';
import NewUser from './LoginPage/NewUser';
import PayBills from './OptionsRouting/PayBills';
import MotorVehicle from './OptionsRouting/MotorVehicle';

function App() {


 const[userDetails, changeUserDetails] = React.useState({
  name:"",
  AccBalance:{},
  AccountHolder:{}
  


 })

 console.log("User Details from loging")
 console.log(`User name ${userDetails.name}`)
 console.log(`Bank balance ${userDetails.AccBalance}`)


 //function to borrow state from the Log In page
 function User(username,balance, AccHolder){


  changeUserDetails(function(prev){
    return {
      name:username,
      AccBalance:balance,
      AccountHolder:AccHolder
    

    };
  })
 }

  return (
    <div className="App">

      <Router>
        <Routes>
        <Route exact path='/' element={<LoginPage getDetails={User}/>}/>
         <Route exact path='/optionPage' element={<OptionLinkPage name={userDetails.name}
         bal={Math.trunc(userDetails.AccBalance)} AccountHolder={userDetails.AccountHolder} />}/>
         
         <Route exact path='/feesPayment' element={<FeesPayment name={userDetails.name}
         bal={Math.trunc(userDetails.AccBalance)} AccountHolder={userDetails.AccountHolder}/>}/>

        <Route exact path='/buyAirTime' element={<BuyAirTime name={userDetails.name}
         bal={Math.trunc(userDetails.AccBalance)} AccountHolder={userDetails.AccountHolder}/>}/>

        <Route exact path='/ZIPIT' element={<InterBankTransfer name={userDetails.name}
         bal={Math.trunc(userDetails.AccBalance)} AccountHolder={userDetails.AccountHolder}/>}/> 

         <Route exact path='/RequestBalance' element={<RequestBalance name={userDetails.name}
         bal={Math.trunc(userDetails.AccBalance)} AccountHolder={userDetails.AccountHolder}/>}/>

         <Route exact path='/newUser' element={<NewUser/>}/>

         <Route exact path='/PayBills' element={<PayBills name={userDetails.name}
         bal={Math.trunc(userDetails.AccBalance)} AccountHolder={userDetails.AccountHolder}/>} />
         


         <Route exact path='/MotorVehicle' element={<MotorVehicle name={userDetails.name} 
         bal={Math.trunc(userDetails.AccBalance)} 
         AccountHolder={userDetails.AccountHolder}/> }
         />


         
        </Routes>
      </Router>

      
    </div>
  );
}

export default App;
