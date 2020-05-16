import React from 'react';
import { Modal, Segment } from 'semantic-ui-react';
import AddOccupationalEntryForm, { EntryFormOccupationalValues } from './AddEntryOccupationalForm';

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: EntryFormOccupationalValues) => void;
  error?: string;
}

const AddOccupationalEntryModal = ({ modalOpen, onClose, onSubmit, error }: Props) => (
  <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
    <Modal.Header>Add a new entry</Modal.Header>
    <Modal.Content>
      {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
      <AddOccupationalEntryForm onSubmit={onSubmit} onCancel={onClose} />
    </Modal.Content>
  </Modal>
  
);

export default AddOccupationalEntryModal;
