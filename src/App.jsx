import React from 'react'
import './App.css'
import Die from './components/Die'
import {nanoid} from 'nanoid'
import Confetti from 'react-confetti'
import Timer from './components/timer'
function App() {

  function diceObj(){
    return {value: Math.floor(Math.random() * 7) , isHeld: false, id: nanoid()}
  }
//generates an array with random 10 numbers
  function allNewDice(){
    const diceArray = []
    for(let i = 0; i < 10; i++) {
      diceArray.push(diceObj())
    }
  return diceArray
  }

//dice number state
  const [dice, setDice] = React.useState(allNewDice())

  const [tenzies, setTenzies] = React.useState(false)
    
  let result = dice.every((obj)=> obj.value === dice[0].value); 
  let result2 = dice.every((obj) => obj.isHeld === true)
  
    React.useEffect(() => {
   if (result === true && result2 === true){
    setTenzies(true)
       alert('You won!')
   } 
    }, [dice])

//function below is to re roll the dice
function roll(){
  setDice(prevDice => prevDice.map(die =>{
   return die.isHeld === true ? die : diceObj()
  }))
}



function toggleDice(id){
  setDice(diceVal => diceVal.map(diceItem => (
    diceItem.id === id ?  {...diceItem, isHeld: !diceItem.isHeld} : {...diceItem}
  ) 
  ))
  console.log(id)
  }

  //render the 10 dice together with numbers generated
  const dieElements = dice.map(item => (
    <Die toggle={()=> toggleDice(item.id)} isHeld={item.isHeld} key={item.id} value={item.value}  />
  ))

  function newGame(){
    setDice(diceVal => {
      if (result === true && result2 === true){
        const diceArray = []
        for(let i = 0; i < 10; i++) {
          diceArray.push(diceObj())
        }
      return diceArray
      }
    } 
  )
  setTenzies(false) 
}
  console.log(tenzies)

  const [inc, setInc] = React.useState(0);
  function noOfClick(){
    setInc(prevCount => prevCount + 1)
  }

  React.useEffect(() =>{
    if(tenzies === true){
      setInc(0)
    }
  },[tenzies])
  
  const [duration, setDuration] = React.useState(0)
  const [bestTime, setBestTime] = React.useState(0)


  const what = React.useEffect(() =>{
     if(tenzies === false){
       setTimeout(() =>setDuration(prevTime => prevTime + 1), 1000)
     }else if(tenzies === true){
      setDuration(0)
     }
     if(bestTime < duration){
      setBestTime(duration)
  }
    localStorage.setItem('bestTime', JSON.stringify(bestTime))
  },[duration])

  return (
    <main className="game-frame">
      {tenzies === true && <Confetti />}
      <h1 className="game-title">Tenzies</h1>
      <p>{duration}</p>
          <p>{JSON.parse(localStorage.getItem('bestTime'))}</p>
      <p className="game-instruction">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
     <div className="grid-container">
        {dieElements}
     </div> 
     <button className="btn-1" onClick={tenzies ? () => { newGame() ; what} : () => { roll() ; noOfClick()}}>{tenzies ? 'New Game' : 'Roll'}</button>
     <h6>{inc}</h6>
    
    </main>
  )
}

export default App
