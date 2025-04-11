import { motion } from 'framer-motion';
import AnimatedWrapper from '../components/AnimatedWrapper';

const About = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };
  
  return (
    <AnimatedWrapper>
      <div className="container mx-auto px-4 md:px-6 py-32">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              About <span className="text-blue-600">CancerPredict</span>
            </h1>
            <p className="text-lg text-gray-600">
              Empowering early cancer detection through advanced AI technology.
            </p>
          </motion.div>
          
          <motion.section
            className="mb-20"
            variants={fadeInUp}
            initial="initial"
            animate="animate"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Mission</h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              At CancerPredict, our mission is to leverage artificial intelligence and machine learning to revolutionize early cancer detection. We believe that early diagnosis is crucial for improving cancer treatment outcomes and saving lives.
            </p>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Our platform is designed to be an accessible first step in cancer screening, helping users identify potential warning signs that may warrant professional medical attention. We aim to complement traditional healthcare services by providing an initial risk assessment tool that anyone can use from the comfort of their home.
            </p>
          </motion.section>
          
          <motion.section
            className="mb-20"
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ delay: 0.1 }}
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-4">The Technology</h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Our predictive model is built upon extensive medical research and data analysis. By processing thousands of patient records and clinical outcomes, we've developed an AI system that can identify patterns and correlations that might indicate cancer risk.
            </p>
            <div className="bg-blue-50 p-6 rounded-lg mb-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">How Our AI Works:</h3>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Analyzes user-provided health data and risk factors</li>
                <li>Evaluates multiple parameters including age, gender, BMI, and lifestyle factors</li>
                <li>Considers genetic risk factors and family history</li>
                <li>Generates a personalized risk assessment with confidence score</li>
                <li>Provides recommendations based on the assessment results</li>
              </ul>
            </div>
            <p className="text-gray-600 leading-relaxed">
              We're constantly improving our model with new research findings and data, ensuring that our predictions become increasingly accurate over time.
            </p>
          </motion.section>
          
          <motion.section
            className="mb-20"
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Risk Factors We Consider</h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Our cancer risk assessment tool evaluates a comprehensive set of factors that research has shown to be associated with cancer risk:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Demographic Factors</h3>
                <ul className="list-disc pl-6 text-gray-600 space-y-1">
                  <li>Age (20-80 years)</li>
                  <li>Gender</li>
                  <li>Body Mass Index (BMI)</li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Lifestyle Factors</h3>
                <ul className="list-disc pl-6 text-gray-600 space-y-1">
                  <li>Smoking status</li>
                  <li>Physical activity level</li>
                  <li>Alcohol consumption</li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Genetic & Family History</h3>
                <ul className="list-disc pl-6 text-gray-600 space-y-1">
                  <li>Genetic risk factors</li>
                  <li>Family history of cancer</li>
                </ul>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Future Enhancements</h3>
                <ul className="list-disc pl-6 text-gray-600 space-y-1">
                  <li>Environmental exposure data</li>
                  <li>Dietary habits</li>
                  <li>Occupational risk factors</li>
                </ul>
              </div>
            </div>
          </motion.section>
          
          <motion.section
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Important Disclaimer</h2>
            <div className="bg-red-50 p-6 rounded-lg border border-red-100 text-gray-700">
              <p className="mb-3 font-medium">
                CancerPredict is designed to be an informational tool only and should not replace professional medical advice, diagnosis, or treatment.
              </p>
              <p>
                Our predictions are based on statistical models and should always be verified by healthcare professionals. If you're experiencing concerning symptoms, please consult with a doctor immediately, regardless of our platform's assessment.
              </p>
            </div>
          </motion.section>
        </div>
      </div>
    </AnimatedWrapper>
  );
};

export default About; 