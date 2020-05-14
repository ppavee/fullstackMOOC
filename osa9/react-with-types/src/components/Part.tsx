import React from 'react';
import { CoursePart } from '../index';

interface PartProps {
  coursePart: CoursePart;
}

const Part: React.FC<PartProps> = ({ coursePart }) => {
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  switch(coursePart.name) {
    case "Fundamentals":
      return (
      <div>
        <h3>{coursePart.name}</h3>
        <p>Exercises: {coursePart.exerciseCount}</p>
        <p>{coursePart.description}</p>
      </div>
      );
    case "Using props to pass data":
      return (
        <div>
          <h3>{coursePart.name}</h3>
          <p>Exercises: {coursePart.exerciseCount}</p>
          <p>Group projects: {coursePart.groupProjectCount}</p>
        </div>
      );
    case "Deeper type usage":
      return (
        <div>
          <h3>{coursePart.name}</h3>
          <p>Exercises: {coursePart.exerciseCount}</p>
          <p>{coursePart.description}</p>
          <p>Exercise submissions: {coursePart.exerciseSubmissionLink}</p>
        </div>
      );
    case "Throw an error":
      return (
      <div>
        <h3>{coursePart.name}</h3>
        <p>Exercises: {coursePart.exerciseCount}</p>
        <p>{coursePart.description}</p>
      </div>
      );
    default:
      return assertNever(coursePart);
  }
};

export default Part;