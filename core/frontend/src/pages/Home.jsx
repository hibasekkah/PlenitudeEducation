"use client"

import * as React from "react";
import About from "./About";
import Contact from "./Contact";
import backgroundImage from '../assets/images/intro-bg.jpg'; 

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section with Background Image */}
      <section 
        className="relative h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${backgroundImage})`
        }}
      >
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="container relative z-10 px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Plénitude Education
              <span className="block w-20 h-1 bg-blue-500 mx-auto mt-4"></span>
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Nous accompagnons les entreprises dans le développement et la valorisation des compétences de leurs collaborateurs, en leur proposant des parcours de formation adaptés, innovants et orientés vers la performance collective et individuelle
            </p>
            <a
              href="#about" 
              className="inline-block px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition duration-200 hover:scale-105 transform"
            >
              Plus d'informations
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <About />

      {/* Contact Section */}
      <Contact />

      {/* Footer (optional) */}
      
    </div>
  );
}