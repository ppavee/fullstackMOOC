import patientsData from '../../data/patients';
import { Patient, PublicPatient, NewPatient } from '../types';
import { v1 as uuidv1} from 'uuid';

const getPatients = (): Array<Patient> => {
  return patientsData;
};

const getPublicPatients = (): Array<PublicPatient> => {
  return patientsData.map(({ id, name, dateOfBirth, gender, occupation}) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const getPatientById = (id: string): Patient | undefined => {
  return patientsData.find(p => p.id === id);
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
  getPublicPatients,
  addPatient,
  getPatientById
};