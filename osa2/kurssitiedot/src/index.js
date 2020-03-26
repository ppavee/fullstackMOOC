import React from 'react'
import ReactDOM from 'react-dom'

const Header = ({name}) => {
    return (
        <h1>
            {name}
        </h1>
    )
}

const Content = ({parts}) => {
    const totalExercises = parts
        .map(part => part.exercises)
        .reduce((sum, value) => {
            return sum + value
        }, 0)
    return (
        <div>
            {parts.map(part =>
                <Part key={part.id} part={part} />
            )}
            <p>
                <b>total of {totalExercises} exercises</b>
            </p>
        </div>
    )
}

const Part = ({ part }) => {
    return (
        <p>
            {part.name} {part.exercises}
        </p>
    )
}

const Course = ({course}) => {
    return (
        <div>
            <Header name={course.name} />
            <Content parts={course.parts} /> 
        </div>
    )
}

const App = () => {
    const course = {
        name: 'Half Stack application development',
        id: 1,
        parts: [
            {
                name: 'Fundamentals of React',
                exercises: 10,
                id: 1
            },
            {
                name: 'Using props to pass data',
                exercises: 7,
                id: 2
            },
            {
                name: 'State of a component',
                exercises: 14,
                id: 3
            },
            {
                name: 'Redux',
                exercises: 11,
                id: 4
            },

      ]
    }
  
    return (
      <div>
        <Course course={course} />
      </div>
    )
  }

ReactDOM.render(<App />, document.getElementById('root'))
