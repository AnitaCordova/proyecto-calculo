import React from 'react';

const WelcomeScreen = ({ onStart }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center">
          {/* Logo o ícono */}
          <div className="mb-6">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto flex items-center justify-center">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
          </div>

          {/* Título */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Proyecto de Cálculo
          </h1>

          {/* Subtítulo */}
          <h2 className="text-xl md:text-2xl font-semibold text-blue-600 mb-6">
            Realizado por: Ana Maria Córdova Jaramillo
          </h2>

          {/* Descripción */}
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            Esta aplicación resuelve derivadas, logaritmos, límites y más, con visualización gráfica.
          </p>

          {/* Características */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="text-blue-600 text-2xl mb-2">∫</div>
              <h3 className="font-semibold text-gray-800">Derivadas</h3>
              <p className="text-sm text-gray-600">Cálculo simbólico</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-4">
              <div className="text-purple-600 text-2xl mb-2">lim</div>
              <h3 className="font-semibold text-gray-800">Límites</h3>
              <p className="text-sm text-gray-600">Incluyendo infinito</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <div className="text-green-600 text-2xl mb-2">📊</div>
              <h3 className="font-semibold text-gray-800">Gráficas</h3>
              <p className="text-sm text-gray-600">Visualización interactiva</p>
            </div>
          </div>

          {/* Botón de inicio */}
          <button
            onClick={onStart}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-xl text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Comenzar
          </button>

          {/* Información adicional */}
          <div className="mt-8 text-sm text-gray-500">
            <p>Desarrollado con React, Math.js y Plotly.js</p>
            <p className="mt-1">Materia de Cálculo - Universidad</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen; 