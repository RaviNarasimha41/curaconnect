import { useState } from 'react';
import { PredictionInput, PredictionResult } from '../types';

export function usePrediction() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const predict = async (input: PredictionInput) => {
    setIsLoading(true);
    setError(null);

    try {
      // Simulate API call with realistic delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Mock prediction logic based on input values
      const score = calculateMockScore(input);
      const eligible = score > 0.6;

      const mockResult: PredictionResult = {
        eligible,
        score,
        top_factors: [
          {
            feature: 'Donations Till Date',
            importance: 0.85,
            impact: input.donations_till_date > 3 ? 'positive' : 'negative',
          },
          {
            feature: 'Active Status',
            importance: 0.72,
            impact: input.active_status ? 'positive' : 'negative',
          },
          {
            feature: 'Donation Frequency',
            importance: 0.68,
            impact: input.frequency_in_days <= 60 ? 'positive' : 'negative',
          },
          {
            feature: 'Previous Experience',
            importance: 0.55,
            impact: input.donated_earlier ? 'positive' : 'negative',
          },
          {
            feature: 'Cycle Consistency',
            importance: 0.43,
            impact: input.cycle_of_donations > 2 ? 'positive' : 'negative',
          },
        ],
      };

      setResult(mockResult);
    } catch (err) {
      setError('Prediction failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const calculateMockScore = (input: PredictionInput): number => {
    let score = 0;
    
    // Donations count impact
    score += Math.min(input.donations_till_date * 0.1, 0.3);
    
    // Active status
    score += input.active_status ? 0.25 : -0.2;
    
    // Previous experience
    score += input.donated_earlier ? 0.15 : -0.1;
    
    // Frequency (lower is better)
    score += input.frequency_in_days <= 60 ? 0.2 : -0.15;
    
    // Cycle consistency
    score += input.cycle_of_donations > 2 ? 0.1 : -0.05;
    
    // Add some randomness but keep it realistic
    score += (Math.random() - 0.5) * 0.1;
    
    return Math.max(0, Math.min(1, score + 0.5));
  };

  return {
    predict,
    isLoading,
    result,
    error,
    clearResult: () => setResult(null),
  };
}