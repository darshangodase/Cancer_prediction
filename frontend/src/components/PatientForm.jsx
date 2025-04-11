import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { sendPatientDataToMLModel } from '../api/predictAPI';

const PatientForm = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    age: 30,
    gender: '',
    bmi: 22.5,
    smoking: '',
    genetic_risk: '',
    activity: 5,
    alcohol_intake: 5,
    cancer_history: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (error) setError('');
  };

  const handleSliderChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const processedData = {
        ...formData,
        age: parseInt(formData.age),
        bmi: parseFloat(formData.bmi),
        activity: parseInt(formData.activity),
        alcohol_intake: parseInt(formData.alcohol_intake)
      };

      const result = await sendPatientDataToMLModel(processedData);
      navigate('/result', { 
        state: { 
          result,
          patientData: processedData
        } 
      });
    } catch (error) {
      console.error('Error processing prediction:', error);
      setError(error.message || 'Failed to get prediction. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 }
    }
  };

  const sliderVariants = {
    hover: { scale: 1.02 },
    tap: { scale: 0.98 }
  };

  return (
    <motion.div
      className="w-full max-w-2xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div 
        className="px-6 py-8 md:p-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h2 
          className="text-2xl font-bold text-gray-800 mb-6"
          variants={itemVariants}
        >
          Cancer Risk Assessment
        </motion.h2>
        
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md"
            >
              <p className="text-red-600">{error}</p>
            </motion.div>
          )}
        </AnimatePresence>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            variants={containerVariants}
          >
            <motion.div variants={itemVariants}>
              <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
                Age
              </label>
              <motion.div
                variants={sliderVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <input
                  type="range"
                  id="age"
                  name="age"
                  value={formData.age}
                  onChange={(e) => handleSliderChange('age', e.target.value)}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  min="20"
                  max="80"
                  step="1"
                />
              </motion.div>
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>20</span>
                <motion.span
                  key={formData.age}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  {formData.age}
                </motion.span>
                <span>80</span>
              </div>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
                Gender
              </label>
              <motion.select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                required
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </motion.select>
            </motion.div>

            <motion.div variants={itemVariants}>
              <label htmlFor="bmi" className="block text-sm font-medium text-gray-700 mb-1">
                BMI
              </label>
              <motion.div
                variants={sliderVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <input
                  type="range"
                  id="bmi"
                  name="bmi"
                  value={formData.bmi}
                  onChange={(e) => handleSliderChange('bmi', e.target.value)}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  min="15"
                  max="45"
                  step="0.1"
                />
              </motion.div>
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>15.0</span>
                <motion.span
                  key={formData.bmi}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  {formData.bmi}
                </motion.span>
                <span>45.0</span>
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <label htmlFor="smoking" className="block text-sm font-medium text-gray-700 mb-1">
                Smoking
              </label>
              <motion.select
                id="smoking"
                name="smoking"
                value={formData.smoking}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                required
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <option value="">Select status</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </motion.select>
            </motion.div>

            <motion.div variants={itemVariants}>
              <label htmlFor="genetic_risk" className="block text-sm font-medium text-gray-700 mb-1">
                Genetic Risk
              </label>
              <motion.select
                id="genetic_risk"
                name="genetic_risk"
                value={formData.genetic_risk}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                required
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <option value="">Select risk level</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </motion.select>
            </motion.div>

            <motion.div variants={itemVariants}>
              <label htmlFor="activity" className="block text-sm font-medium text-gray-700 mb-1">
                Physical Activity Level (1-10)
              </label>
              <motion.div
                variants={sliderVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <input
                  type="range"
                  id="activity"
                  name="activity"
                  value={formData.activity}
                  onChange={(e) => handleSliderChange('activity', e.target.value)}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  min="1"
                  max="10"
                  step="1"
                />
              </motion.div>
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>1</span>
                <motion.span
                  key={formData.activity}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  {formData.activity}
                </motion.span>
                <span>10</span>
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <label htmlFor="alcohol_intake" className="block text-sm font-medium text-gray-700 mb-1">
                Alcohol Intake Level (1-10)
              </label>
              <motion.div
                variants={sliderVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <input
                  type="range"
                  id="alcohol_intake"
                  name="alcohol_intake"
                  value={formData.alcohol_intake}
                  onChange={(e) => handleSliderChange('alcohol_intake', e.target.value)}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  min="1"
                  max="10"
                  step="1"
                />
              </motion.div>
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>1</span>
                <motion.span
                  key={formData.alcohol_intake}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  {formData.alcohol_intake}
                </motion.span>
                <span>10</span>
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <label htmlFor="cancer_history" className="block text-sm font-medium text-gray-700 mb-1">
                Family History of Cancer
              </label>
              <motion.select
                id="cancer_history"
                name="cancer_history"
                value={formData.cancer_history}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                required
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <option value="">Select history</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </motion.select>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="pt-4"
            variants={itemVariants}
          >
            <motion.button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-md transition-colors duration-300 flex items-center justify-center"
              whileHover={{ scale: 1.02, boxShadow: "0 4px 12px rgba(59, 130, 246, 0.3)" }}
              whileTap={{ scale: 0.98 }}
              animate={isLoading ? { opacity: 0.7 } : { opacity: 1 }}
            >
              {isLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </motion.div>
              ) : null}
              {isLoading ? 'Processing...' : 'Predict'}
            </motion.button>
          </motion.div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default PatientForm; 