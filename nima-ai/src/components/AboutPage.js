import React from 'react';
import { ArrowRight, Shield, AlertTriangle, CheckCircle } from 'lucide-react';

function AboutPage() {
  return (
    <section className="bg-gradient-to-b from-white to-blue-50 py-16">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-blue-800 mb-4">About Nima AI</h1>
          <div className="h-1 w-24 bg-blue-500 mx-auto rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div className="bg-white p-8 rounded-lg shadow-lg transform transition-transform hover:scale-105">
            <div className="flex items-center mb-6">
              <Shield className="text-blue-600 w-10 h-10 mr-4" />
              <h2 className="text-2xl font-semibold text-gray-800">Our Mission</h2>
            </div>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Every year, millions of people worldwide suffer from food allergies, 
              some of which lead to life-threatening reactions such as anaphylaxis. 
              The biggest challenge for individuals with allergies is identifying 
              hidden allergens in packaged foods, restaurant meals, and online orders.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Nima AI's mission is to empower individuals with food allergies by 
              providing real-time allergen detection and personalized dietary insights.
            </p>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 bg-blue-200 rounded-lg transform rotate-3"></div>
            <div className="relative bg-white p-8 rounded-lg shadow-lg">
              <div className="flex items-center mb-6">
                <AlertTriangle className="text-amber-500 w-10 h-10 mr-4" />
                <h2 className="text-2xl font-semibold text-gray-800">The Challenge</h2>
              </div>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-blue-700 mb-2">Complex Ingredient Terminology</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Food labels often use technical or scientific names for ingredients, 
                    making it difficult for consumers to recognize allergens.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-blue-700 mb-2">Inconsistent Labeling Standards</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Different countries and brands follow varying food labeling regulations, 
                    making it hard for consumers to interpret packaging.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-blue-700 mb-2">Cross-Contamination Risks</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Even if an allergen is not an intentional ingredient, it can still end 
                    up in a product due to shared manufacturing equipment.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-blue-500 to-teal-400 rounded-xl p-1">
          <div className="bg-white rounded-lg p-8">
            <div className="flex items-center mb-6">
              <CheckCircle className="text-green-500 w-10 h-10 mr-4" />
              <h2 className="text-2xl font-semibold text-gray-800">Our Solution</h2>
            </div>
            <div className="md:flex gap-8">
              <div className="md:w-2/3">
                <p className="text-gray-600 mb-4 leading-relaxed">
                  Nima AI is a smart application that scans food labels, restaurant menus, 
                  and online food orders to detect allergens instantly. With just a simple 
                  scan using a smartphone camera, the app extracts text from food packaging 
                  using Optical Character Recognition (OCR) and cross-references the data 
                  with an extensive food allergen database.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  By leveraging AI and machine learning, Nima AI ensures that users can 
                  make safe, informed food choices, significantly reducing the risks of 
                  allergic reactions and improving their quality of life.
                </p>
              </div>
              <div className="md:w-1/3 mt-6 md:mt-0 flex justify-center items-center">
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutPage;