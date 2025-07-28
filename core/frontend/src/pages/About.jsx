import React from "react";
import p from '@/assets/images/photo2.jpeg';

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
                Pourquoi nous choisir ?
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* First List */}
                <ul className="space-y-3">
                  <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span className="text-gray-700 dark:text-gray-300">Des formations 100 % personnalisées selon vos besoins</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span className="text-gray-700 dark:text-gray-300">Une équipe d'experts métiers avec une solide expérience terrain</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span className="text-gray-700 dark:text-gray-300">Un accompagnement de A à Z : diagnostic, formation, suivi</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span className="text-gray-700 dark:text-gray-300">Plateforme en ligne pour faciliter l’accès aux contenus</span>
                    </li>
                </ul>

                {/* Second List */}
                <ul className="space-y-3">
                  <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span className="text-gray-700 dark:text-gray-300"> Méthodes pédagogiques actives et orientées résultats</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span className="text-gray-700 dark:text-gray-300">Certifications reconnues et programmes actualisés</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span className="text-gray-700 dark:text-gray-300">Flexibilité : en présentiel, distanciel ou hybride</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span className="text-gray-700 dark:text-gray-300">Taux de satisfaction client supérieur à 95 %</span>
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