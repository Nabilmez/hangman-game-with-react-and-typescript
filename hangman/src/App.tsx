import { useState, useCallback ,useEffect } from 'react';
import './App.css'
import Words from './Words.json';
import {HangmanDrawing,HangmanWords,Keyboard} from './Component/index';
function getWord(){
  return Words[Math.floor(Math.random() * Words.length)]
}
function App() {
  const [wordToGuess, setWordToGuess] = useState(getWord)
  const [guessedLetters , setguessedLetters] =useState<string[]>([]);
  const incorrectLetters = guessedLetters.filter(
    letter => !wordToGuess.includes(letter)
  )
  const correctLetters = guessedLetters.filter(
    letter => wordToGuess.includes(letter)
  )
  const isLoser= incorrectLetters.length >=6;
  const isWinner= wordToGuess.split("").every((letter)=>{
    return guessedLetters.includes(letter);
  })
  const addGussedLetters = useCallback((letter :string)=>{
    if(guessedLetters.includes(letter) || isLoser || isWinner) return;
    setguessedLetters(c =>[...c,letter])
  },[guessedLetters,isLoser,isWinner]);
  useEffect(()=>{
    let handler = (e : KeyboardEvent)=>{
      let key = e.key;
      if(!key.match(/^[a-z]/)) return;
      e.preventDefault();
      addGussedLetters(key)
    }
    document.addEventListener('keypress',handler);
    return ()=>{
      document.removeEventListener('keypress',handler)
    }
  },[])
  useEffect(()=>{
    let handler = (e : KeyboardEvent)=>{
      let key = e.key;
      if(key != "Enter") return;
      e.preventDefault();
      setguessedLetters([])
      setWordToGuess(getWord())
    }
    document.addEventListener('keypress',handler);
    return ()=>{
      document.removeEventListener('keypress',handler)
    }
  },[])
  return (
    <div style={{
      maxWidth:'800px',
      margin:"0 auto",
      display:"flex",
      flexDirection:"column",
      gap:"2rem",
      alignItems:'center'
    }}>
      <div style={{fontSize:'2rem',textAlign:'center'}}>
        {isWinner && "Winner! - Refresh to try again"}
        {isLoser && "Loser! - Refresh to try again"}
      </div>
      <HangmanDrawing numberOfGuesses={incorrectLetters.length}/>
      <HangmanWords 
      reveal={isLoser}
      wordToGuess={wordToGuess} 
      guessedLetters={guessedLetters}/>
      <div style={{
        alignSelf:"stretch"
      }}>
        <Keyboard 
        activeWords={correctLetters} 
        inActiveWords={incorrectLetters} 
        addGussedLetters={addGussedLetters}
        disabled={isWinner || isLoser}
        /> 
      </div>
    </div>
  )
}

export default App
