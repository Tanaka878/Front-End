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
import TopUp from './OptionsRouting/TopUp';
import ResetPassword from './OptionsRouting/ResetPassword'
import ChangePassword from './OptionsRouting/ChangePassword';

function App() {


 const[userDetails, changeUserDetails] = React.useState({
  name:"",
  AccBalance:{},
  AccountHolder:{},
  Email:""
  


 })

 console.log();
 console.log("User Details from loging")
 console.log(`User name ${userDetails.name} +:: ${userDetails.accountNumber}`)
 


 //function to borrow state from the Log In page
 function User(username,balance, AccHolder, userEmail){


  changeUserDetails(function(prev){
    return {
      name:username,
      AccBalance:balance,
      AccountHolder:AccHolder,
      Email:userEmail

    

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

        <Route exact path='/TopUp' element={<TopUp name={userDetails.name} 
                bal={Math.trunc(userDetails.AccBalance)} 
                AccountHolder={userDetails.AccountHolder}/> }
                />

        <Route exact path='/ResetPassword' element={<ResetPassword name={userDetails.name} 
                bal={Math.trunc(userDetails.AccBalance)} 
                AccountHolder={userDetails.AccountHolder}/> }
                />

        <Route exact path='/ChangePassword' element={<ChangePassword name={userDetails.name} 
                        bal={Math.trunc(userDetails.AccBalance)} 
                        AccountHolder={userDetails.AccountHolder}
                        Email={userDetails.Email}/> 
                    }
                        />


         
        </Routes>
      </Router>

      
    </div>
  );
}

export default App;
