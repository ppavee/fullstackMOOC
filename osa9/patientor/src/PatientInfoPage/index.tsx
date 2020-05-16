import React from 'react';
import { Container, Header, Icon, Button } from "semantic-ui-react";
import axios from 'axios';
import { Patient, Diagnosis, Entry } from '../types';
import { apiBaseUrl } from '../constants';
import { useStateValue, setPatient } from "../state";
import { useParams } from 'react-router-dom';
import EntryComponent from '../components/Entry';
import AddEntryModal from '../AddEntryModal';
import AddHospitalEntryModal from '../AddEntryModal/indexHospitalEntry';
import AddOccupationalEntryModal from '../AddEntryModal/indexOccupationalEntry';
import { EntryFormValues } from '../AddEntryModal/AddEntryForm';
import { EntryFormHospitalValues } from '../AddEntryModal/AddEntryHospitalForm';
import { EntryFormOccupationalValues } from '../AddEntryModal/AddEntryOccupationalForm';

const PatientInfoPage: React.FC = () => {
  const [{ patient, diagnosis }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();

  React.useEffect(() => {
    const fetchPatientById = async () => {
      try {
        const { data: patientFromApi } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        dispatch(setPatient(patientFromApi));
      } catch (e) {
        console.error(e);
      }
    };
    if(!patient || patient.id !== id) {
      fetchPatientById();
    }
  }, [dispatch, id, patient]);

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [modalOpenHospital, setModalOpenHospital] = React.useState<boolean>(false);
  const [modalOpenOccupational, setModalOpenOccupational] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  const openModal = (): void => setModalOpen(true);
  const openModalHospital = (): void => setModalOpenHospital(true);
  const openModalOccupational = (): void => setModalOpenOccupational(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const closeModalHospital = (): void => {
    setModalOpenHospital(false);
    setError(undefined);
  };

  const closeModalOccupational = (): void => {
    setModalOpenOccupational(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      console.log(values);
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      console.log(newEntry);
      closeModal();
    } catch (e) {
      console.error(e.response.data);
      setError(e.response.data.error);
    }
  };

  const submitNewHospitalEntry = async (values: EntryFormHospitalValues) => {
    try {
      console.log(values);
      const newValues = {
        type: values.type,
        description: values.description,
        date: values.date,
        specialist: values.specialist,
        diagnosisCodes: values.diagnosisCodes,
        discharge: {
          disdate: values.disdate,
          criteria: values.criteria
        }
      };
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${id}/entries`,
        newValues
      );
      console.log(newEntry);
      closeModal();
    } catch (e) {
      console.error(e.response.data);
      setError(e.response.data.error);
    }
  };

  const submitNewOccupationalEntry = async (values: EntryFormOccupationalValues) => {
    try {
      console.log(values);
      const newValues = {
        type: values.type,
        description: values.description,
        date: values.date,
        specialist: values.specialist,
        diagnosisCodes: values.diagnosisCodes,
        employerName: values.employerName,
        sickLeave: {
          startDate: values.startDate,
          endDate: values.endDate
        }
      };
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${id}/entries`,
        newValues
      );
      console.log(newEntry);
      closeModal();
    } catch (e) {
      console.error(e.response.data);
      setError(e.response.data.error);
    }
  };

  let renderIcon = false;
  if(patient && patient.gender !== 'other') {
    renderIcon = true;
  }
  let diagnosisOfPatient: Diagnosis[];
  const patientsDiagnosis = patient?.entries.map(e => e.diagnosisCodes); // array of diagnosiscode by patient
  if(patientsDiagnosis) {
    diagnosisOfPatient = diagnosis.filter(dia => patientsDiagnosis[0]?.includes(dia.code));
  }

  return (
    <div className="App">
      <Container>
        <Header as="h2">
          {patient?.name}
          {renderIcon &&
            <Icon name={(
              patient?.gender === 'male' ? 'mars' : 'venus')} />
          }
        </Header>
        <div style={{ fontSize: '1.15em' }}>
          ssn: {patient?.ssn} <br />
          occupation: {patient?.occupation}
        </div>
        <Header as="h3">entries</Header>
        {patient?.entries.map(e =>
          <div key={e.id}>
            <EntryComponent entry={e} />
            {diagnosisOfPatient &&
              <ul>
                {diagnosisOfPatient.map(dc =>
                  <li key={dc.code}>
                    {dc.code} {dc.name}
                  </li>
                )}
              </ul>
            }
          </div>
        )}
      </Container>
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      
      <Button onClick={() => openModal()}>Add New Health Check Entry</Button>
      <AddHospitalEntryModal
        modalOpen={modalOpenHospital}
        onSubmit={submitNewHospitalEntry}
        error={error}
        onClose={closeModalHospital}
      />
      
      <Button onClick={() => openModalHospital()}>Add New Hospital Entry</Button>

      <AddOccupationalEntryModal
        modalOpen={modalOpenOccupational}
        onSubmit={submitNewOccupationalEntry}
        error={error}
        onClose={closeModalOccupational}
      />
      
      <Button onClick={() => openModalOccupational()}>Add New Occupational Health Care Entry</Button>
    </div>
  );
};

export default PatientInfoPage;