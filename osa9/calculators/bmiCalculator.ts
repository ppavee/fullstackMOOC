interface BmiArguments {
  height: number;
  weight: number;
}

export type BmiCategory = 'Very severely underweight' | 'Severely underweight' | 'Underweight'
  | 'Normal (healthy weight)' | 'Overweight' | 'Obese Class I (Moderately obese)'
  | 'Obese Class II (Severely obese)' | 'Obese Class III (Very severely obese)';

const parseArguments = (args: Array<string>): BmiArguments => {
  if(args.length < 4) throw new Error('Not enough arguments.');
  if(args.length > 4) throw new Error('Too many arguments.');

  if(!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

export const calculateBmi = (height: number, weight: number): BmiCategory => {
  const heightInMeters: number = height/100;
  const bmi: number = weight / (heightInMeters*heightInMeters);
  if(bmi < 15) {
    return 'Very severely underweight';
  } else if(bmi < 16) {
    return 'Severely underweight';
  } else if(bmi < 18.5) {
    return 'Underweight';
  } else if(bmi < 25) {
    return 'Normal (healthy weight)';
  } else if(bmi < 30) {
    return 'Overweight';
  } else if(bmi < 35) {
    return 'Obese Class I (Moderately obese)';
  } else if(bmi < 40) {
    return 'Obese Class II (Severely obese)';
  } else {
    return 'Obese Class III (Very severely obese)';
  }
};

if (!process.argv[1] && process.argv[1] === 'bmiCalculator.ts') {
  try {
    const { height, weight }: BmiArguments = parseArguments(process.argv);
    console.log(calculateBmi(height, weight));
  } catch (e) {
    console.log('An error stopped the execution of the program. Message:', e.message);
  }
}
