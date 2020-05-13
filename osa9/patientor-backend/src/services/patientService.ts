import patientsData from '../../data/patients';
import { Patient, PatientExludeSsn, NewPatient } from '../types';
import { v1 as uuidv1} from 'uuid';

const getPatients = (): Array<Patient> => {
  return patientsData;
};

const getPatientsExludeSsn = (): Array<PatientExludeSsn> => {
  return patientsData.map(({ id, name, dateOfBirth, gender, occupation}) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const addPatient = (entry: NewPatient): Patient => {
  const newPatient = {
    id: uuidv1(),
    ...entry
  };
  patientsData.push(newPatient);
  return newPatient;
};

export default {
  getPatients,
  getPatientsExludeSsn,
  addPatient
};