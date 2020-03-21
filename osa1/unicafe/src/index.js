import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Title = ({text}) => <h1>{text}</h1>


const Button = ({text, handleClick}) => <button onClick={handleClick} >{text}</button>


const Stats = ({text, amount}) => <div>{text} {amount}</div>


const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const incrementGood = () => setGood(good + 1)
  const incrementNeutral = () => setNeutral(neutral + 1)
  const incrementBad = () => setBad(bad + 1)

  return (
    <div>
      <Title text='give feedback' />
      <Button text='good' handleClick={incrementGood} />
      <Button text='neutral' handleClick={incrementNeutral} />
      <Button text='bad' handleClick={incrementBad} />
      <Title text='statistics' />
      <Stats text='good' amount={good} />
      <Stats text='neutral' amount={neutral} />
      <Stats text='bad' amount={bad} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)