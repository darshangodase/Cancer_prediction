import { motion } from 'framer-motion';
import AnimatedWrapper from '../components/AnimatedWrapper';
import PatientForm from '../components/PatientForm';

const Predict = () => {
  return (
    <AnimatedWrapper>
      <div className="container mx-auto px-4 md:px-6 py-32">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Cancer Risk Assessment
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Please provide your health information below for an AI-powered cancer risk assessment. 
            This tool helps evaluate various risk factors based on scientific research.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <PatientForm />
        </motion.div>

        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="max-w-2xl mx-auto p-6 bg-blue-50 rounded-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">Assessment Parameters</h2>
            <p className="text-gray-600 mb-4">
              This risk assessment tool considers the following factors:
            </p>
            <ul className="text-left text-gray-600 space-y-2 mb-4 pl-6 list-disc">
              <li><strong>Age:</strong> Range from 20 to 80 years</li>
              <li><strong>Gender:</strong> Male or Female</li>
              <li><strong>BMI:</strong> Body Mass Index from 15.0 to 45.0</li>
              <li><strong>Smoking:</strong> Yes or No</li>
              <li><strong>Genetic Risk:</strong> Yes or No</li>
              <li><strong>Physical Activity Level:</strong> Scale from 1 (low) to 10 (high)</li>
              <li><strong>Alcohol Intake Level:</strong> Scale from 1 (low) to 10 (high)</li>
              <li><strong>Family History of Cancer:</strong> Yes or No</li>
            </ul>
            <p className="text-gray-700 font-medium">
              This assessment is for informational purposes only and should not replace professional medical advice. 
              Always consult with healthcare professionals for medical diagnosis and treatment.
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatedWrapper>
  );
};

export default Predict; 