import express from 'express';
import { BmiCategory, calculateBmi } from './bmiCalculator';
import { Result, calculateExercises } from './exerciseCalculator';
const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  try {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);
    if(isNaN(height) || isNaN(weight)) {
      res.status(400).send({ error: 'malformatted parameters or parameters missing' });
    }
    const result: BmiCategory = calculateBmi(height, weight);
    res.status(200).send({
      weight, height, result
    });
  } catch (e) {
    res.status(500).send({ error: 'An unexpected error happened.' });
  }
});

app.post('/exercises', (req, res) => {
  try {
    const dailyExercises = req.body.daily_exercises;
    const target = req.body.target;
    
    if(!dailyExercises || !target) {
      res.status(400).json({ error: 'parameters missing' });
    }
    if(isNaN(target)) {
      res.status(400).json({ error: 'malformatted parameters' });
    }
    if(Array.isArray(dailyExercises)) {
      dailyExercises.forEach(value => {
        if(isNaN(value)) {
          res.status(400).json({ error: 'malformatted parameters' });
        }
      });
    } else {
      res.status(400).json({ error: 'malformatted parameters' });
    }

    const result: Result = calculateExercises(dailyExercises, target);
    res.status(200).json(result);
  } catch (e) {
    res.status(400).json({ error: 'Something unexpected happened while fulfilling the request.' });
  }
});

const PORT = 3002;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}.`);
});