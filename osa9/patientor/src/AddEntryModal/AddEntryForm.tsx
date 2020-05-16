import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";

//import { TextField, SelectField } from "./FormField";
import { TextField, NumberField } from "./FormField";
import { Entry, HealthCheckRating, Diagnosis } from "../types";
import { useStateValue } from "../state";
import { DiagnosisSelection} from "./FormField";

/*
 * use type Patient, but omit id and entries,
 * because those are irrelevant for new patient object.
 */
type EntryFormValuesBase = Omit<Entry, "id">;

export interface EntryFormValues {
  type: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
  healthCheckRating: HealthCheckRating;
}

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

// const entryOptions: EntryOption[] = [
//   { value: HospitalEntry, label: "Hospital" },
//   { value: HealthCheckEntry, label: "Health Check" },
//   { value: OccupationalHealthCareEntry, label: "Occupational Healthcare" }
// ];

// const initialValues= (value: string) => {
//   switch(value) {
//     case 'HealthCheck':
//       return {
//         healthCheckRating: -1
//       };
//     case 'Hospital':
//       return {

//           date: '',
//           criteria: ''

//       };
//     case 'OccupationalHealthcare':
//       return {
//         employername: '',

//           startDate: '',
//           endDate: ''

//       };
//   }
// };


export const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const [{ diagnosis }] = useStateValue();



  return (
    <Formik
      initialValues={{
        type: "HealthCheck",
        description: "",
        date: "",
        specialist: "",
        diagnosisCodes: [],
        healthCheckRating: -1

      }}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.type) {
          errors.type = requiredError;
        }
        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (values.healthCheckRating < 0 || values.healthCheckRating > 3) {
          errors.healthCheckRating = requiredError;
        }


        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className="form ui">
            <Field
              label="Type"
              placeholder="type"
              name="type"
              component={TextField}
            />
            <Field
              label="Description"
              placeholder="Description"
              name="description"
              component={TextField}
            />
            <Field
              label="Date"
              placeholder="YYYY-MM-DD"
              name="date"
              component={TextField}
            />
            <Field
              label="Specialist"
              placeholder="Specialist"
              name="specialist"
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnosis)}
            />

            <Field
              label="Health Check Rating"
              name="healthCheckRating"
              component={NumberField}
              min={0}
              max={3}
            />


            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;
