import React from 'react'
type HangmanWordsProps = {
  wordToGuess:string,
  guessedLetters:string[],
  reveal?:boolean
}
const HangmanWords = ({guessedLetters,wordToGuess,reveal=false}:HangmanWordsProps) => {
  const word = wordToGuess;
  const guessedWord = guessedLetters;
  return (
    <div style={{
      display:'flex',
      gap:".25em",
      fontFamily:'monospace',
      fontWeight:'bold',
      fontSize:'6rem',
      textTransform:'uppercase'
    }}>
      {word.split("").map((letter,index)=>(
        <span style={{borderBottom:".1em solid black"}} key={index}>
          <span style={{
            visibility: guessedWord.includes(letter) || reveal ? 'visible': 'hidden',
            color: !guessedWord.includes(letter) && reveal ? 'red' : 'black'
          }}>{letter}</span>
        </span>
      ))}
    </div>
  )
}

export default HangmanWords