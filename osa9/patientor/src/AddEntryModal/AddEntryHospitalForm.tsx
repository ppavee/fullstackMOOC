import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";

//import { TextField, SelectField } from "./FormField";
import { TextField } from "./FormField";
import { Entry, Diagnosis } from "../types";
import { useStateValue } from "../state";
import { DiagnosisSelection} from "./FormField";

/*
 * use type Patient, but omit id and entries,
 * because those are irrelevant for new patient object.
 */
type EntryFormValuesBase = Omit<Entry, "id">;

export interface EntryFormHospitalValues {
  type: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
  disdate: string;
  criteria: string;
}

interface Props {
  onSubmit: (values: EntryFormHospitalValues) => void;
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


export const AddHospitalEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const [{ diagnosis }] = useStateValue();



  return (
    <Formik
      initialValues={{
        type: "Hospital",
        description: "",
        date: "",
        specialist: "",
        diagnosisCodes: [],
        disdate: "",
        criteria: ""

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
        if (!values.disdate) {
          errors.disdate = requiredError;
        }
        if (!values.criteria) {
          errors.criteria = requiredError;
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
            <fieldset>
              <legend>Discharge</legend>
              <Field
                label="Date"
                placeholder="YYYY-MM-DD"
                name="disdate"
                component={TextField}
              />
              <Field
                label="Criteria"
                placeholder="Criteria"
                name="criteria"
                component={TextField}
              />
            </fieldset>

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

export default AddHospitalEntryForm;
