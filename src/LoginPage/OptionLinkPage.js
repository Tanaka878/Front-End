import React, { useState, useEffect } from 'react';
import OptionPage from './OptionPage';
import OptionsData from './OptionsData';
import { useNavigate } from 'react-router-dom';

const OptionLinkPage = (props) => {
    const infoArray = OptionsData;
    const navigate = useNavigate();
    const [balance, setBalance] = useState(props.bal);

    
    const fetchBalance = async () => {
        try {
            const response = await fetch(`https://distinguished-happiness-production.up.railway.app/banking/getBalance/${props.Email}`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const updatedBalance = await response.text();
            console.log("The balanace :",updatedBalance);
            setBalance(updatedBalance);
        } catch (error) {
            console.error("Failed to fetch balance:", error);
        }
    };

   
    useEffect(() => {
        fetchBalance();
    }, []); 

    const d = infoArray.map((item) => (
        <OptionPage
            key={item.id} 
            SelectionId={item.id}
            bal={balance}
            value={item.val}
            i={item.url}
            text={item.textValue}
            click={DivClick}
        />
    ));

    function DivClick(itemId) {
        console.log(`clicked ${itemId}`);
        const routes = {
            1: '/TransactionHistory',
            2: '/feesPayment',
            3: '/buyAirTime',
            4: '/ZIPIT',
            5: '/PayBills',
            6: '/TopUp',
            7: '/ChangePassword',
            8: '/Maps',
            9: '/LoanServices',
            10: '/Profile',
        };
        if (routes[itemId]) {
            navigate(routes[itemId]);
        }
    }

   
    const handleLogout = () => {
        navigate('/');
    };

    
    function getGreeting() {
        const now = new Date();
        const hours = now.getHours(); 

        if (hours >= 5 && hours < 12) {
            return "Good Morning";
        } else if (hours >= 12 && hours < 18) {
            return "Good Afternoon";
        } else if (hours >= 18 && hours < 22) {
            return "Good Evening";
        } else {
            return "Good Night"; 
        }
    }

    const greeting = getGreeting();

    return (
        <div className="optionPageContainer">
            <nav className="OptionDivHeader">
                <h2>{greeting} {props.name}</h2>
                <h5>ACCOUNT HOLDER: {props.AccountHolder}</h5>
                <h5>ACCOUNT BALANCE: {balance}</h5>
                <button className="refresh-btn" onClick={fetchBalance}>Refresh Balance</button>
            </nav>

            <div className="optionDivs" style={{ padding: "30px" }}>
                {d}
            </div>

            <div className="logout-container">
                <button className="logout-btn" onClick={handleLogout}>Logout</button>
            </div>

            <style>
                {`
                    .refresh-btn {
                        background-color: #4caf50;
                        color: white;
                        border: none;
                        padding: 8px 16px;
                        border-radius: 4px;
                        cursor: pointer;
                        font-size: 14px;
                        margin-top: 10px;
                    }
                    .refresh-btn:hover {
                        background-color: #45a049;
                    }
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
        max-width: 900px; 
        justify-items: center;
        align-items: center;
    }

    .optionDivs > div {
        background-color: #ffffff;
        padding: 12px; 
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 150px; 
        height: 150px;
        text-align: center;
        font-size: 14px;
        transition: transform 0.3s ease;
        overflow: hidden;
        word-wrap: break-word;
    }

    .optionDivs > div img {
        max-width: 65px; 
        max-height: 65px;
        margin-bottom: 8px;
        object-fit: contain;
    }

    .optionDivs > div p {
        margin: 0;
        font-size: 13px;
        text-align: center;
        line-height: 1.2;
        white-space: normal; 
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
}
                `}
            </style>
        </div>
    );
};

export default OptionLinkPage;
