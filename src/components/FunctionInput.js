import React, { useState } from 'react';
import MathKeyboard from './MathKeyboard';

const FunctionInput = ({ value, onChange, placeholder = "Ingresa una función (ej: x^2, sin(x), ln(x))" }) => {
  const [showKeyboard, setShowKeyboard] = useState(false);

  const examples = [
    "x^2",
    "sin(x)",
    "cos(x)",
    "ln(x)",
    "e^x",
    "1/x",
    "sqrt(x)",
    "x^3 + 2x^2 - 5x + 1",
    "sinh(x)",
    "arcsin(x)",
    "sec(x)",
    "tanh(x)"
  ];

  const epsilonDeltaExamples = [
    { function: "x^2", point: "2", epsilon: "0.1", description: "Límite de x² cuando x→2" },
    { function: "sin(x)/x", point: "0", epsilon: "0.01", description: "Límite de sin(x)/x cuando x→0" },
    { function: "1/x", point: "1", epsilon: "0.05", description: "Límite de 1/x cuando x→1" },
    { function: "x^3 - 8", point: "2", epsilon: "0.1", description: "Límite de x³-8 cuando x→2" },
    { function: "sqrt(x)", point: "4", epsilon: "0.1", description: "Límite de √x cuando x→4" },
    { function: "e^x", point: "0", epsilon: "0.01", description: "Límite de e^x cuando x→0" }
  ];

  const handleKeyboardInput = (inputValue) => {
    onChange(inputValue);
    setShowKeyboard(false);
  };

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="function-input" className="block text-sm font-medium text-gray-700 mb-2">
          Función f(x)
        </label>
        <div className="flex space-x-2">
          <input
            id="function-input"
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
          />
          <button
            onClick={() => setShowKeyboard(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            title="Abrir teclado matemático"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <span className="hidden sm:inline">Teclado</span>
          </button>
        </div>
      </div>
      
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-2">Ejemplos básicos:</h4>
        <div className="flex flex-wrap gap-2">
          {examples.map((example, index) => (
            <button
              key={index}
              onClick={() => onChange(example)}
              className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md transition-colors"
            >
              {example}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-2">Ejemplos para ε-δ:</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {epsilonDeltaExamples.map((example, index) => (
            <div
              key={index}
              className="p-3 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors cursor-pointer"
              onClick={() => onChange(example.function)}
            >
              <div className="text-sm font-medium text-blue-800 mb-1">
                {example.description}
              </div>
              <div className="text-xs text-blue-600 space-y-1">
                <div><strong>f(x):</strong> {example.function}</div>
                <div><strong>Punto:</strong> {example.point}</div>
                <div><strong>ε:</strong> {example.epsilon}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Math Keyboard Modal */}
      {showKeyboard && (
        <MathKeyboard
          onInput={handleKeyboardInput}
          onClose={() => setShowKeyboard(false)}
          currentValue={value}
        />
      )}
    </div>
  );
};

export default FunctionInput; 