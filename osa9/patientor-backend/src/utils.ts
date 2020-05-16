/* eslint-disable @typescript-eslint/no-explicit-any */
import { NewPatient, Gender, NewEntry, HealthCheckRating, Discharge } from './types';

const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseString = (stringValue: any, field: string): string => {
  if(!stringValue || !isString(stringValue)) {
    throw new Error(`Incorrect or missing ${field}: ${stringValue}`);
  }
  return stringValue;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: any): string => {
  if(!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date of birth: ' + date);
  }
  return date;
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const parseGender = (gender: any): Gender => {
  if(!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

// const parseDiagnosisCodes = (diagnosisCodes: any): Array<Diagnose['code']> => {
//   if(!diagnosisCodes || !Array.isArray(diagnosisCodes)) {
//     throw new Error('Invalid diagnosis codes: ' + diagnosisCodes);
//   }
//   diagnosisCodes.forEach(dc => parseString(dc, 'diagnosis code'));
//   return diagnosisCodes;
// };

const parseDischarge = (discharge: any): Discharge => {
  if(!discharge || !discharge.disdate || !isDate(discharge.disdate) || !discharge.criteria || !isString(discharge.criteria)) {
    throw new Error('Incorrect or missing discharge: ' + discharge);
  }

  return discharge;
};

const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};

const parseHealthCheckRating = (healthCheckRating: any): HealthCheckRating => {
  if (healthCheckRating < 0 || healthCheckRating > 3 || !isHealthCheckRating(healthCheckRating)) {
      throw new Error('Incorrect or missing health check rating: ' + healthCheckRating);
  } 
  return healthCheckRating;
};

export const toNewPatient = (object: any): NewPatient => {
  return {
    name: parseString(object.name, 'name'),
    dateOfBirth: parseDate(object.dateOfBirth),
    ssn: parseString(object.ssn, 'ssn'),
    gender: parseGender(object.gender),
    occupation: parseString(object.occupation, 'occupation')
  };
};


export const toNewEntry = (object: any): NewEntry => {
  const baseEntry = {
    description: parseString(object.description, 'description'),
    date: parseDate(object.date),
    specialist: parseString(object.specialist, 'specialist'),
    diagnosisCodes: object.diagnosisCodes || []
  };

  const type = parseString(object.type, 'type');
  

  switch(type) {
    case "HealthCheck":
      return {
        type,
        ...baseEntry,
        healthCheckRating: parseHealthCheckRating(object.healthCheckRating)
      };
    case "OccupationalHealthcare":
      return {
        type,
        ...baseEntry,
        employerName: parseString(object.employerName, 'employer name'),
        sickLeave: object.sickLeave || {}
      };
    case "Hospital":
      return {
        type,
        ...baseEntry,
        discharge: parseDischarge(object.discharge)
      };
    default:
      throw new Error(
        `Invalid entry: ${object}`
      );
  }
};

//export default { toNewPatient, toNewEntry };