type RatingValue = 1 | 2 | 3;
type RatingDescription = 'Those are rookie numbers.' | 'Not too bad but could be better.' | 'Great! Target achieved.';

interface ExerciseArguments {
  exerciseTarget: number;
  exerciseValues: Array<number>;
}

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: RatingValue;
  ratingDescription: RatingDescription;
  target: number;
  average: number;
}

const parseInput = (args: Array<string>): ExerciseArguments => {
  if(args.length < 4) throw new Error('Not enough arguments provided.');
  const exludeTarget: Array<string> = args.slice(3);

  if(isNaN(Number(args[2]))) {
    throw new Error('Target value wasn\'t a number.');
  }

  let exludeTargetNumbers: Array<number> = new Array<number>();
  exludeTarget.forEach(val => {
    if(isNaN(Number(val))) {
      throw new Error('A given exercise value wasn\'t a number.');
    } else {
      exludeTargetNumbers.push(Number(val));
    }
  });

  return {
    exerciseTarget: Number(args[2]),
    exerciseValues: exludeTargetNumbers
  };
}

const calculateExercises = (exerciseHours: number[], target: number): Result => {
  const periodLength: number = exerciseHours.length;
  const trainingDays: number = exerciseHours.filter(dailyHours => dailyHours > 0).length;
  const average: number = (exerciseHours.reduce((prev, curr) => prev + curr)) / periodLength; 
  const success: boolean = target <= average;

  /*
  * If average is greater than or equal to target, rating is 3.
  * Else if average is greater than or equal to 75% of target, rating is 2.
  * Else rating will be 1.
  * Rating description is set accordingly.
  */
  let rating: RatingValue;
  let ratingDescription: RatingDescription;
  if(success) {
    rating = 3;
    ratingDescription = 'Great! Target achieved.';
  } else if( (target*0.75) <= average) {
    rating = 2;
    ratingDescription = 'Not too bad but could be better.';
  } else {
    rating = 1;
    ratingDescription = 'Those are rookie numbers.';
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  };
};

try {
  const { exerciseTarget, exerciseValues }: ExerciseArguments = parseInput(process.argv);
  console.log(calculateExercises(exerciseValues, exerciseTarget));
} catch (e) {
  console.log('An error happened while executing the program. Message:', e.message);
}