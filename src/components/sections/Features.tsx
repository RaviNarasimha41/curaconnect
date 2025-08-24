import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Shield, MessageCircle, BarChart3, Users, Zap } from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: 'AI Donor Prediction',
    description: 'Advanced machine learning models analyze donor patterns and predict eligibility with high accuracy and explainable results.',
    gradient: 'from-red-500 to-pink-600',
  },
  {
    icon: Shield,
    title: 'Blockchain Security',
    description: 'Immutable patient records secured on Polygon blockchain with cryptographic hashing and transparent verification.',
    gradient: 'from-blue-500 to-indigo-600',
  },
  {
    icon: MessageCircle,
    title: 'P2P Secure Chat',
    description: 'End-to-end encrypted communication between donors, patients, and healthcare providers using WebRTC technology.',
    gradient: 'from-green-500 to-emerald-600',
  },
  {
    icon: BarChart3,
    title: 'Smart Analytics',
    description: 'Comprehensive dashboards with real-time insights, donation tracking, and predictive healthcare analytics.',
    gradient: 'from-purple-500 to-violet-600',
  },
  {
    icon: Users,
    title: 'Multi-Role System',
    description: 'Role-based access control for patients, donors, healthcare providers, and administrators with secure authentication.',
    gradient: 'from-orange-500 to-red-600',
  },
  {
    icon: Zap,
    title: 'Real-time Updates',
    description: 'Live notifications, real-time record verification, and instant AI-powered responses for critical healthcare decisions.',
    gradient: 'from-yellow-500 to-orange-600',
  },
];

export function Features() {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          >
            Revolutionizing Healthcare Management
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Our cutting-edge platform combines artificial intelligence, blockchain technology, 
            and secure communications to transform healthcare operations.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="group relative bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-2xl" 
                     style={{ backgroundImage: `linear-gradient(135deg, var(--tw-gradient-stops))` }} />
                
                <div className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="h-8 w-8 text-white" />
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {feature.title}
                </h3>

                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>

                {/* Decorative element */}
                <div className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-r opacity-10 group-hover:opacity-20 transition-opacity duration-300 rounded-full" 
                     style={{ backgroundImage: `linear-gradient(135deg, ${feature.gradient})` }} />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}