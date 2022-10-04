import React from 'react'
import './Die.css'

function App(props) {
  return (
           <div onClick={props.toggle} className={props.isHeld ? 'green-face' : "box"}>
              <h5 className='value'>{props.value}</h5>
           </div>
  )
}

export default App