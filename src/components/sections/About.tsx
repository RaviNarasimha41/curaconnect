import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Shield, Users, Zap } from 'lucide-react';

const stats = [
  { label: 'Lives Saved', value: '50K+', icon: Heart },
  { label: 'Secure Records', value: '100K+', icon: Shield },
  { label: 'Active Users', value: '25K+', icon: Users },
  { label: 'AI Predictions', value: '1M+', icon: Zap },
];

export function About() {
  return (
    <section id="about" className="py-20 bg-gradient-to-br from-red-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Transforming Healthcare with
                <span className="text-red-600 block mt-2">
                  Innovation & Trust
                </span>
              </h2>
              
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                CuraConnect represents the future of healthcare management, where artificial 
                intelligence meets blockchain security to create a seamless, trustworthy 
                ecosystem for patients, donors, and healthcare providers.
              </p>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-red-100 rounded-lg mt-1">
                    <Heart className="h-5 w-5 text-red-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      AI-Powered Predictions
                    </h3>
                    <p className="text-gray-600">
                      Our advanced machine learning models provide accurate donor eligibility 
                      predictions with explainable results, helping healthcare providers make 
                      informed decisions quickly.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-blue-100 rounded-lg mt-1">
                    <Shield className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Blockchain Security
                    </h3>
                    <p className="text-gray-600">
                      Patient records are secured using blockchain technology on Polygon 
                      network, ensuring immutability, transparency, and trust while 
                      maintaining privacy compliance.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-green-100 rounded-lg mt-1">
                    <Users className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Secure Communications
                    </h3>
                    <p className="text-gray-600">
                      End-to-end encrypted P2P chat enables secure communication between 
                      stakeholders, while our AI chatbot provides instant healthcare guidance 
                      powered by Gemini.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Content - Stats */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-2 gap-8"
            >
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                    className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center hover:shadow-xl transition-shadow duration-300"
                  >
                    <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-2">
                      {stat.value}
                    </div>
                    <div className="text-sm font-medium text-gray-600">
                      {stat.label}
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-12 bg-white rounded-2xl p-8 shadow-lg border border-gray-100"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Our Mission
              </h3>
              <p className="text-gray-600 leading-relaxed">
                To revolutionize healthcare by leveraging cutting-edge technology to create 
                a more efficient, secure, and accessible healthcare ecosystem that saves lives 
                and improves patient outcomes worldwide.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}