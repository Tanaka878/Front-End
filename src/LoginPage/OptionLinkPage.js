import React from 'react';
import OptionPage from './OptionPage';
import OptionsData from './OptionsData';
import { useNavigate } from 'react-router-dom';

const OptionLinkPage = (props) => {
    const infoArray = OptionsData;
    const navigate = useNavigate();

    let d = infoArray.map(function(item) {
        return (
            <OptionPage
                key={item.id}  // Add a key to avoid React warnings
                SelectionId={item.id}
                bal={item.itemName}
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
        }else if(itemId){
            navigate("/Maps");


        }
    }

    // Function to handle logout
    const handleLogout = () => {
        // You can clear any session or localStorage data if necessary
        // localStorage.removeItem("userData");  // Example if user data is stored in localStorage
        navigate('/');  // Redirect to home page
    };

    return (
        <div className="optionPageContainer">
            <nav className="OptionDivHeader">
                <h6>NAME: {props.name}</h6>
                <h5>ACCOUNT HOLDER: {props.AccountHolder}</h5>
                <h5>ACCOUNT BALANCE: {props.bal}</h5>
            </nav>

            <div className="optionDivs">
                {d}
            </div>

            {/* Logout Button placed at the bottom of the form */}
            <div className="logout-container">
                <button className="logout-btn" onClick={handleLogout}>Logout</button>
            </div>

            {/* Adding only the logout button styles, keeping other styles unchanged */}
            <style>
                {`
                    .logout-btn {
                        background-color: #f44336;
                        color: white;
                        border: none;
                        padding: 12px;
                        border-radius: 8px;
                        cursor: pointer;
                        font-size: 18px;
                        transition: background-color 0.3s ease;
                    }

                    .logout-btn:hover {
                        background-color: #d32f2f;
                    }

                    .logout-container {
                        width: 100%;
                        display: flex;
                        justify-content: center;
                        margin-top: 20px;
                    }
                `}
            </style>
        </div>
    );
};

export default OptionLinkPage;
