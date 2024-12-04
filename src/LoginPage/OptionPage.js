/* eslint-disable jsx-a11y/alt-text */
import React from 'react'



const OptionPage = (props) => {
  return (
    <div className='optionPage' 
    onClick={()=>props.click(props.SelectionId)}
    style={{
      boxShadow: '0 0 12px 1px rgba(52, 105, 191)'

    }}>
      
      <img
  src={require(`./Images/${props.i}`)}
  alt="Dynamic user profile"
  height={100}
  width={100}
  
/>


      <h2>{props.text}</h2>
      {console.log("image file",props.i)}  
    </div>
  )
}

export default OptionPage
