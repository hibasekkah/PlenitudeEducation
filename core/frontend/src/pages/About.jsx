import React from "react";
import p from '@/assets/images/photo1.webp';

export default function About(props) {
  return (
    <section id="about" className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          {/* Image Section */}
          <div className="w-full md:w-1/2">
            <img 
              src={p} 
              className="w-full h-auto rounded-lg shadow-xl object-cover"
              alt="About our company" 
            />
          </div>

          {/* Text Content */}
          <div className="w-full md:w-1/2">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                Qui somme nous?
              </h2>
              
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Acteur engagé de la formation professionnelle, nous aidons les entreprises à renforcer les compétences de leurs équipes, en proposant des solutions sur mesure pour favoriser l’évolution, la motivation et la performance de leurs collaborateurs.
              </p>

              <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
                Why Choose Us?
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* First List */}
                <ul className="space-y-3">
                  <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span className="text-gray-700 dark:text-gray-300">Lorem ipsum dolor</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span className="text-gray-700 dark:text-gray-300">Tempor incididunt</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span className="text-gray-700 dark:text-gray-300">Lorem ipsum dolor</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span className="text-gray-700 dark:text-gray-300">Lorem ipsum dolor</span>
                    </li>
                </ul>

                {/* Second List */}
                <ul className="space-y-3">
                  <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span className="text-gray-700 dark:text-gray-300">Aliquip ex ea commodo</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span className="text-gray-700 dark:text-gray-300">Aliquip ex ea commodo</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span className="text-gray-700 dark:text-gray-300">Aliquip ex ea commodo</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span className="text-gray-700 dark:text-gray-300">Aliquip ex ea commodo</span>
                    </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}