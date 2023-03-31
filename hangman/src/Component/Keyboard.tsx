import React from 'react'
import "./Keyboard.css";
const KEYS = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
]
type KeyboardProps ={
  activeWords : string[]
  inActiveWords : string[]
  addGussedLetters: (key : string)=> void
  disabled?:boolean
}
const Keyboard = ({activeWords ,inActiveWords ,addGussedLetters,disabled=false}: KeyboardProps) => {
  return(
    <div className='keyboard'>
    {KEYS.map(key=>{
      let active = activeWords.includes(key);
      let inActive = inActiveWords.includes(key);
      return(
        <button 
        key={key} 
        onClick={() => addGussedLetters(key)} 
        className={`btn ${active? 'active':''} ${inActive? 'inactive':''}`} 
        disabled={active || inActive || disabled}>{key}</button>
      )
    })}
  </div>
  )
}

export default Keyboard