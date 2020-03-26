import React from 'react'

const Header = ({ name }) => {
    return (
        <h2>
            {name}
        </h2>
    )
}

const Content = ({ parts }) => {
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

const Course = ({ course }) => {
    return (
        <div>
            <Header name={course.name} />
            <Content parts={course.parts} />
        </div>
    )
}

export default Course