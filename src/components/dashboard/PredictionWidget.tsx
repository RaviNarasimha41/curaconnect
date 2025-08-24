import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, CheckCircle, XCircle, Info, Save } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Modal } from '../ui/Modal';
import { usePrediction } from '../../hooks/usePrediction';
import { useAuth } from '../../contexts/AuthContext';
import { PredictionInput } from '../../types';

export function PredictionWidget() {
  const { user } = useAuth();
  const { predict, isLoading, result, error } = usePrediction();
  const [showExplanation, setShowExplanation] = useState(false);
  const [formData, setFormData] = useState<PredictionInput>({
    donations_till_date: 0,
    cycle_of_donations: 0,
    frequency_in_days: 0,
    donated_earlier: false,
    active_status: true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await predict(formData);
  };

  const handleSaveRecord = async () => {
    if (!result || user?.role !== 'admin') return;
    
    // Mock save to blockchain
    alert('Record saved and anchored to blockchain successfully!');
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-red-100 rounded-lg">
            <Brain className="h-6 w-6 text-red-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Donor Eligibility Predictor (AI)
            </h2>
            <p className="text-sm text-gray-600">
              Advanced ML predictions with explainable results
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <Input
            type="number"
            label="Donations Till Date"
            min="0"
            value={formData.donations_till_date}
            onChange={(e) => setFormData({
              ...formData,
              donations_till_date: parseInt(e.target.value) || 0
            })}
            required
          />
          
          <Input
            type="number"
            label="Cycle of Donations"
            min="0"
            value={formData.cycle_of_donations}
            onChange={(e) => setFormData({
              ...formData,
              cycle_of_donations: parseInt(e.target.value) || 0
            })}
            required
          />
          
          <Input
            type="number"
            label="Frequency (Days)"
            min="0"
            value={formData.frequency_in_days}
            onChange={(e) => setFormData({
              ...formData,
              frequency_in_days: parseInt(e.target.value) || 0
            })}
            required
          />
          
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="donated_earlier"
                checked={formData.donated_earlier}
                onChange={(e) => setFormData({
                  ...formData,
                  donated_earlier: e.target.checked
                })}
                className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
              />
              <label htmlFor="donated_earlier" className="text-sm font-medium text-gray-700">
                Donated Earlier
              </label>
            </div>
            
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="active_status"
                checked={formData.active_status}
                onChange={(e) => setFormData({
                  ...formData,
                  active_status: e.target.checked
                })}
                className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
              />
              <label htmlFor="active_status" className="text-sm font-medium text-gray-700">
                Active Status
              </label>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 pt-4">
          <Button
            type="submit"
            loading={isLoading}
            className="flex-1 sm:flex-initial"
          >
            Predict Eligibility
          </Button>
          
          {result && (
            <>
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowExplanation(true)}
                className="flex items-center space-x-2"
              >
                <Info className="h-4 w-4" />
                <span>Explainability</span>
              </Button>
              
              {user?.role === 'admin' && (
                <Button
                  type="button"
                  variant="secondary"
                  onClick={handleSaveRecord}
                  className="flex items-center space-x-2"
                >
                  <Save className="h-4 w-4" />
                  <span>Save as Record</span>
                </Button>
              )}
            </>
          )}
        </div>

        {error && (
          <div className="rounded-lg bg-red-50 border border-red-200 p-4">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`rounded-lg border p-4 ${
              result.eligible
                ? 'bg-green-50 border-green-200'
                : 'bg-red-50 border-red-200'
            }`}
          >
            <div className="flex items-center space-x-3">
              {result.eligible ? (
                <CheckCircle className="h-6 w-6 text-green-600" />
              ) : (
                <XCircle className="h-6 w-6 text-red-600" />
              )}
              <div>
                <h3 className={`font-semibold ${
                  result.eligible ? 'text-green-800' : 'text-red-800'
                }`}>
                  {result.eligible ? '✅ Eligible to Donate' : '❌ Not Eligible Yet'}
                </h3>
                <p className="text-sm text-gray-600">
                  Confidence Score: {(result.score * 100).toFixed(1)}%
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </form>

      {/* Explainability Modal */}
      <Modal
        isOpen={showExplanation}
        onClose={() => setShowExplanation(false)}
        title="Prediction Explainability"
        size="lg"
      >
        {result && (
          <div className="space-y-4">
            <p className="text-gray-600">
              These factors contributed most to the prediction:
            </p>
            <div className="space-y-3">
              {result.top_factors.map((factor, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <span className="font-medium text-gray-900">
                      {factor.feature}
                    </span>
                    <div className="flex items-center mt-1">
                      <div className="flex-1 bg-gray-200 rounded-full h-2 mr-3">
                        <div
                          className={`h-2 rounded-full ${
                            factor.impact === 'positive' ? 'bg-green-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${factor.importance * 100}%` }}
                        />
                      </div>
                      <span className="text-sm text-gray-600">
                        {(factor.importance * 100).toFixed(0)}%
                      </span>
                    </div>
                  </div>
                  <div className={`ml-4 px-2 py-1 rounded-full text-xs font-medium ${
                    factor.impact === 'positive'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {factor.impact === 'positive' ? '+' : '-'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}