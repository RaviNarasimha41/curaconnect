import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Heart } from 'lucide-react';
import { Button } from '../ui/Button';

interface CTAProps {
  onGetStarted: () => void;
}

export function CTA({ onGetStarted }: CTAProps) {
  return (
    <section className="py-20 bg-gradient-to-r from-red-600 to-red-700 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M30 30c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zm0 0c0-11.046 8.954-20 20-20s20 8.954 20 20-8.954 20-20 20-20-8.954-20-20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-red-500 text-red-100 text-sm font-medium mb-8">
            <Heart className="h-4 w-4 mr-2" />
            🚀 Get Started with CuraConnect
          </div>

          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Ready to Transform Healthcare?
          </h2>

          <p className="text-xl text-red-100 mb-8 max-w-2xl mx-auto leading-relaxed">
            Join thousands of healthcare providers already using CuraConnect to 
            save lives with AI-powered predictions and blockchain security.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              onClick={onGetStarted}
              size="lg"
              className="bg-white text-red-600 hover:bg-gray-100 px-8 py-4 text-lg group"
            >
              Start Your Journey
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>

            <button 
              onClick={() => {
                const element = document.querySelector('#features');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="text-red-100 hover:text-white transition-colors px-6 py-3 text-lg font-medium"
            >
              Learn More About Features
            </button>
          </div>

          <div className="mt-12 grid md:grid-cols-3 gap-8 text-red-100">
            <div>
              <div className="text-2xl font-bold text-white">99.9%</div>
              <div className="text-sm">Uptime Guarantee</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">24/7</div>
              <div className="text-sm">Support Available</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">HIPAA</div>
              <div className="text-sm">Compliant & Secure</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}