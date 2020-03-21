import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Title = ({ text }) => <h1>{text}</h1>


const Button = ({ text, handleClick }) => <button onClick={handleClick} >{text}</button>


const Statistics = ({ good, neutral, bad }) => {
  if (good || neutral || bad) {
    let feedbackAmount = good + neutral + bad
    return (
      <div>
        <Title text='statistics' />
        <table>
          <tbody>
            <StatisticsLine text='good' value={good} />
            <StatisticsLine text='neutral' value={neutral} />
            <StatisticsLine text='bad' value={bad} />
            <StatisticsLine text='all' value={feedbackAmount} />
            <StatisticsLine text='average' value={
              ((good * 1 + neutral * 0 + bad * -1) / feedbackAmount).toFixed(1) || 0
            }
            />
            <StatisticsLine text='positive' value={
              ((good / feedbackAmount) * 100 || 0).toFixed(1) + ' %'
            }
            />
          </tbody>
        </table>
      </div>
    )
  }

  return (
    <div>
      <Title text='statistics' />
      No feedback given
    </div>
  )

}


const StatisticsLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td><td>{value}</td>
    </tr>
  )
}


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
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)