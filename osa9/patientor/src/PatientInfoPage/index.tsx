import React from 'react';
import { Container, Header, Icon } from "semantic-ui-react";
import axios from 'axios';
import { Patient } from '../types';
import { apiBaseUrl } from '../constants';
import { useStateValue } from "../state";
import { useParams } from 'react-router-dom';

const PatientInfoPage: React.FC = () => {
  const [{ patient }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();

  React.useEffect(() => {
    const fetchPatientById = async () => {
      try {
        const { data: patientFromApi } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        dispatch({ type: "SET_PATIENT", payload: patientFromApi });
      } catch (e) {
        console.error(e);
      }
    };
    if(!patient || patient.id !== id) {
      fetchPatientById();
    }
  }, [dispatch, id, patient]);

  let renderIcon = false;
  if(patient && patient.gender !== 'other') {
    renderIcon = true;
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
      </Container>
    </div>
  );
};

export default PatientInfoPage;