import React from 'react';
import Part from './Part';
import { CoursePart } from '../index';


interface ContentProps {
  courseParts: Array<CoursePart>;
}

const Content: React.FC<ContentProps> = ({ courseParts }) => {
  return (
    <div>
      {courseParts.map(part =>
        <Part key={part.name} coursePart={part} />
      )}
    </div>
  );
};

export default Content;