import React from 'react'
import OptionPage from './OptionPage';
import OptionsData from './OptionsData';
import { useNavigate } from 'react-router-dom';
//A file that will handle the rendering of the divs containing the options to be selected

const OptionLinkPage = (props) => {
    const infoArray = OptionsData;
    const navigate = useNavigate()
    

  let d = infoArray.map(function(item){
    
    return <OptionPage
    SelectionId={item.id}
    bal={item.itemName}
    value={item.val}
    i={item.url}
    text={item.textValue}
    click={DivClick}


    />
    
  })

  function DivClick(itemId){
    console.log(`clicked ${itemId}`)

    if(itemId=== 2){
      navigate('/feesPayment')

    }else if(itemId ===3){
      navigate('/buyAirTime')
    }else if(itemId===4){
      navigate('/ZIPIT')
    }else if(itemId===1){
      navigate('/RequestBalance')
    }else if(itemId===5){
      navigate('/PayBills')
    }
  }

  return (
    <div >

      <nav style={{backgroundColor:'royalblue'}} className='OptionDivHeader'>
        <h6>NAME :{props.name}</h6>
        <h5>ACCOUNT HOLDER :{props.AccountHolder}</h5>
        <h5>ACCOUNT BALANCE :{props.bal}</h5>
      </nav>

      <div className='optionDivs'>
      {d}

      </div>

        

      
    </div>
  )
}

export default OptionLinkPage
