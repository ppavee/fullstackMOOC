import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Title = ({text}) => <h1>{text}</h1>


const Button = ({text, handleClick}) => <button onClick={handleClick} >{text}</button>


const Stats = ({text, value}) => <div>{text} {value}</div>


const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const incrementGood = () => setGood(good + 1)
  const incrementNeutral = () => setNeutral(neutral + 1)
  const incrementBad = () => setBad(bad + 1)

  let feedbackAmount = good + neutral + bad

  return (
    <div>
      <Title text='give feedback' />
      <Button text='good' handleClick={incrementGood} />
      <Button text='neutral' handleClick={incrementNeutral} />
      <Button text='bad' handleClick={incrementBad} />
      <Title text='statistics' />
      <Stats text='good' value={good} />
      <Stats text='neutral' value={neutral} />
      <Stats text='bad' value={bad} />
      <Stats text='all' value={feedbackAmount} />
      <Stats text='average' value={
          (good*1 + neutral*0 + bad*-1) / feedbackAmount || 0
          } 
      />
      <Stats text='positive' value={
          ((good/feedbackAmount)*100 || 0) +' %'
          } 
      />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)