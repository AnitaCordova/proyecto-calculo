import React from 'react';

const FunctionInput = ({ value, onChange, placeholder = "Ingresa una función (ej: x^2, sin(x), ln(x))" }) => {
  const examples = [
    "x^2",
    "sin(x)",
    "cos(x)",
    "ln(x)",
    "e^x",
    "1/x",
    "sqrt(x)",
    "x^3 + 2x^2 - 5x + 1"
  ];

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="function-input" className="block text-sm font-medium text-gray-700 mb-2">
          Función f(x)
        </label>
        <input
          id="function-input"
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
        />
      </div>
      
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-2">Ejemplos:</h4>
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
    </div>
  );
};

export default FunctionInput; 