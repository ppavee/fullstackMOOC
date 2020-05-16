import React from 'react';
import { Entry, HealthCheckRating } from '../types';
import { Header, Icon, SemanticCOLORS, Segment  } from 'semantic-ui-react';


interface EntryProps {
  entry: Entry;
}
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};


const HospitalEntry: React.FC<{date: string; description: string}> =
({ date, description }) => {
  return (
    <Segment>
      <Header as="h3">{date} <Icon name="hospital" /></Header>
      <p><em>{description}</em></p>
    </Segment>
  );
};

const OccupationalHealthcareEntry:
React.FC<{date: string; employerName: string; description: string}> =
({ date, employerName, description }) => {
  return (
    <Segment>
      <Header as="h3">{date} <Icon name="stethoscope" /> {employerName}</Header>
      <p><em>{description}</em></p>
    </Segment>
  );
};

const HealthCheckEntry: React.FC<{date: string; healthCheckRating: HealthCheckRating; description: string}> =
({ date, healthCheckRating, description }) => {
  let color: SemanticCOLORS  = 'black';
  switch(healthCheckRating) {
    case 0:
      color = "green";
      break;
    case 1:
      color = "yellow";
      break;
    case 2:
      color = "orange";
      break;
    case 3:
      color = "red";
      break;
  }
  return (
    <Segment>
      <Header as="h3">{date} <Icon name="doctor" /></Header>
      <p><em>{description}</em></p>
      <Icon name="heart" color={color} />
    </Segment>
  );
};



const EntryComponent: React.FC<EntryProps> = ({ entry }) => {
  switch(entry.type) {
    case "Hospital":
      return <HospitalEntry
        date={entry.date}
        description={entry.description}
      />;
    case "OccupationalHealthcare":
      return <OccupationalHealthcareEntry 
        date={entry.date}
        employerName={entry.employerName}
        description={entry.description}
        />;
    case "HealthCheck":
      return <HealthCheckEntry
      date={entry.date}
      healthCheckRating={entry.healthCheckRating}
      description={entry.description}
      />;
    default:
      return assertNever(entry);
  }
};

export default EntryComponent;