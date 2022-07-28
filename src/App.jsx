import React from 'react'
import './App.css'
import Die from './components/Die'
import {nanoid} from 'nanoid'


function App() {
//generates an array with random 10 numbers
  function allNewDice(){
    const diceArray = []
    for(let i = 0; i < 10; i++) {
      diceArray.push({value: Math.floor(Math.random() * 7) , isHeld: false, id: nanoid()})
    }
  return diceArray
  }
//dice number state
  const [diceArray, setDiceArray] = React.useState(allNewDice())
  //render the 10 dice together with numbers generated
  const dieElements = diceArray.map(item => (
  <Die key={item.id} value={item.value}  />
))
//function below is to re roll the dice
function roll(){
  setDiceArray(prevDiceArray => allNewDice())
}
  return (
    <main className="game-frame">
     <div className="grid-container">
        {dieElements}
     </div> 
     <button className="btn-1" onClick={roll}>Roll</button>
    </main>
  )
}

export default App
