import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import AnimatedWrapper from '../components/AnimatedWrapper';

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Check if we have the required data
  if (!location.state || !location.state.result || !location.state.patientData) {
    return (
      <AnimatedWrapper>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">No Result Data Available</h1>
          <p className="text-gray-600 mb-6">Please complete the assessment form first.</p>
          <button
            onClick={() => navigate('/predict')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md"
          >
            Go to Assessment Form
          </button>
        </div>
      </AnimatedWrapper>
    );
  }

  const { result, patientData } = location.state;
  const riskLevel = result.risk;
  const isHighRisk = riskLevel === 'high';

  return (
    <AnimatedWrapper>
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden"
        >
          <div className="p-8">
            <div className={`text-center mb-8 p-6 rounded-lg ${isHighRisk ? 'bg-red-50' : 'bg-green-50'}`}>
              <h1 className="text-3xl font-bold mb-4">
                {isHighRisk ? 'High Risk Assessment' : 'Low Risk Assessment'}
              </h1>
              <p className="text-lg mb-2">
                Based on your provided information, your cancer risk is assessed as:
              </p>
              <p className={`text-2xl font-bold ${isHighRisk ? 'text-red-600' : 'text-green-600'}`}>
                {isHighRisk ? 'HIGH RISK' : 'LOW RISK'}
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Your Assessment Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">Age</p>
                  <p className="font-medium">{patientData.age} years</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">Gender</p>
                  <p className="font-medium">{patientData.gender}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">BMI</p>
                  <p className="font-medium">{patientData.bmi}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">Smoking Status</p>
                  <p className="font-medium">{patientData.smoking}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">Genetic Risk</p>
                  <p className="font-medium">{patientData.genetic_risk}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">Physical Activity</p>
                  <p className="font-medium">{patientData.activity} hours/week</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">Alcohol Intake</p>
                  <p className="font-medium">{patientData.alcohol_intake} units/week</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">Cancer History</p>
                  <p className="font-medium">{patientData.cancer_history}</p>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Recommendations</h2>
              {isHighRisk ? (
                <div className="p-4 bg-red-50 rounded-lg">
                  <p className="text-red-700 font-medium mb-2">Based on your assessment, you are at a higher risk for cancer.</p>
                  <ul className="list-disc pl-5 text-gray-700 space-y-2">
                    <li>Schedule a consultation with your healthcare provider as soon as possible.</li>
                    <li>Consider more frequent cancer screenings based on your risk factors.</li>
                    <li>Review your lifestyle choices that may contribute to increased risk.</li>
                    <li>Discuss family history with your doctor to determine if genetic testing is appropriate.</li>
                  </ul>
                </div>
              ) : (
                <div className="p-4 bg-green-50 rounded-lg">
                  <p className="text-green-700 font-medium mb-2">Based on your assessment, you are at a lower risk for cancer.</p>
                  <ul className="list-disc pl-5 text-gray-700 space-y-2">
                    <li>Continue with regular health check-ups and recommended screenings.</li>
                    <li>Maintain a healthy lifestyle with regular exercise and a balanced diet.</li>
                    <li>Stay informed about cancer prevention strategies.</li>
                    <li>Be aware of any changes in your health and consult a healthcare provider if concerned.</li>
                  </ul>
                </div>
              )}
            </div>

            <div className="text-center">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => navigate('/predict')}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md"
                >
                  New Assessment
                </button>
                <button
                  onClick={() => navigate('/')}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-6 rounded-md"
                >
                  Return Home
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatedWrapper>
  );
};

export default Result; 