import React from 'react';
import { useState } from 'react';
import OptionPage from './OptionPage';
import OptionsData from './OptionsData';
import { useNavigate } from 'react-router-dom';

const OptionLinkPage = (props) => {
    const infoArray = OptionsData;
    const navigate = useNavigate();
    const [balance, setBalance] = useState(props.bal);

    let d = infoArray.map(function(item) {
        return (
            <OptionPage
                key={item.id}  // Add a key to avoid React warnings
                SelectionId={item.id}
                bal={balance}
                value={item.val}
                i={item.url}
                text={item.textValue}
                click={DivClick}
            />
        );
    });

    function DivClick(itemId) {
        console.log(`clicked ${itemId}`);
        if (itemId === 2) {
            navigate('/feesPayment');
        } else if (itemId === 3) {
            navigate('/buyAirTime');
        } else if (itemId === 4) {
            navigate('/ZIPIT');
        } else if (itemId === 1) {
            navigate('/TransactionHistory');
        } else if (itemId === 5) {
            navigate('/PayBills');
        } else if(itemId ===6){
            navigate('/TopUp');
        } else if(itemId ===7){
            navigate('/ChangePassword');
        }else if(itemId===8){
            navigate("/Maps");
        }
        else if(itemId ==9){
            navigate("/LoanServices")
        }
        else if(itemId === 10){
            navigate("/Profile")
        }
    }

    // Separate fetchBalance function
  const fetchBalance = async () => {
    try {
      const response = await fetch(`https://distinguished-happiness-production.up.railway.app/banking/getBalance/${props.Email}`);
      const updatedBalance = await response.text();
      setBalance(updatedBalance);
    } catch (error) {
      console.error("Failed to fetch balance:", error);
    }
  };
    // Function to handle logout
    const handleLogout = () => {
        
        navigate('/');  // Redirect to home page
    };

    return (
        <div className="optionPageContainer">
            <nav className="OptionDivHeader">
                <h6>NAME: {props.name}</h6>
                <h5>ACCOUNT HOLDER: {props.AccountHolder}</h5>
                <h5>ACCOUNT BALANCE: {balance}</h5>
            </nav>

            <div className="optionDivs" style={{padding:"30px"}}>
                {d}
            </div>

            {/* Logout Button placed at the bottom of the form */}
            <div className="logout-container">
                <button className="logout-btn" onClick={handleLogout}>Logout</button>
            </div>

            {/* Adding only the logout button styles, keeping other styles unchanged */}
            <style>
{`
    .optionPageContainer {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 20px;
        width: 100vw;
        height: 100vh;
        box-sizing: border-box;
        background-color: #f9fafb;
    }

    .OptionDivHeader {
        width: 90%;
        max-width: 500px;
        background-color: #3f51b5;
        color: white;
        padding: 15px;
        border-radius: 8px;
        text-align: center;
        margin-bottom: 20px;
    }

    .OptionDivHeader h5, .OptionDivHeader h6 {
        margin: 5px 0;
        font-weight: 400;
    }

    .optionDivs {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        gap: 20px;
        width: 100%;
        max-width: 900px; /* Further increased max-width for larger screens */
        justify-items: center;
        align-items: center;
    }

    .optionDivs > div {
        background-color: #ffffff;
        padding: 12px; /* Increased padding for extra space */
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 150px; /* Slightly larger width */
        height: 150px; /* Slightly larger height */
        text-align: center;
        font-size: 14px;
        transition: transform 0.3s ease;
        overflow: hidden;
        word-wrap: break-word;
    }

    .optionDivs > div img {
        max-width: 65px; /* Adjusted for larger container */
        max-height: 65px;
        margin-bottom: 8px;
        object-fit: contain;
    }

    .optionDivs > div p {
        margin: 0;
        font-size: 13px;
        text-align: center;
        line-height: 1.2;
        white-space: normal; /* Ensures text wraps within the container */
        overflow-wrap: break-word;
        word-break: break-word;
    }

    .optionDivs > div:hover {
        transform: scale(1.05);
    }

    .logout-container {
        width: 100%;
        display: flex;
        justify-content: center;
        margin-top: 20px;
    }

    .logout-btn {
        background-color: #f44336;
        color: white;
        border: none;
        padding: 12px 24px;
        border-radius: 8px;
        cursor: pointer;
        font-size: 18px;
        transition: background-color 0.3s ease;
    }

    .logout-btn:hover {
        background-color: #d32f2f;
    }

    @media (max-width: 768px) {
        .OptionDivHeader h5, .OptionDivHeader h6 {
            font-size: 1rem;
        }
        .logout-btn {
            width: 80%;
            font-size: 16px;
        }
    }
`}
</style>

        </div>
    );
};

export default OptionLinkPage;
