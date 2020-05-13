/* eslint-disable @typescript-eslint/no-explicit-any */
import { NewPatient, Gender } from './types';

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

const parseDateOfBirth = (dateOfBirth: any): string => {
  if(!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)) {
    throw new Error('Incorrect or missing date of birth: ' + dateOfBirth);
  }
  return dateOfBirth;
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

const toNewPatient = (object: any): NewPatient => {
  return {
    name: parseString(object.name, 'name'),
    dateOfBirth: parseDateOfBirth(object.dateOfBirth),
    ssn: parseString(object.ssn, 'ssn'),
    gender: parseGender(object.gender),
    occupation: parseString(object.occupation, 'occupation')
  };
};

export default toNewPatient;