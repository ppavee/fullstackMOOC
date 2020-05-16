import patientsData from '../../data/patients';
import { Patient, PublicPatient, NewPatient, NewEntry, Entry } from '../types';
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
    entries: [],
    ...entry
  };
  patientsData.push(newPatient);
  return newPatient;
};

const addEntry = (id: string, entry: NewEntry): Entry => {
  const newEntry = {
    id: uuidv1(),
    ...entry
  };
  const patient = patientsData.find(p => p.id === id);
  console.log(patient);
  if(patient) {
    patient.entries = patient.entries.concat(newEntry);
    patientsData.map(p => p.id !== id ? p : patient);
    return newEntry;
  } else {
    throw new Error(`Patient with id ${id} doesn't exists.`);
  }
};

export default {
  getPatients,
  getPublicPatients,
  addPatient,
  getPatientById,
  addEntry
};