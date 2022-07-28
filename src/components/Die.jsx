import React from 'react'
import './Die.css'

function App(props) {
  return (
           <div className="box">
              <h5>{props.value}</h5>
           </div>
  )
}

export default App