import React from 'react';

const OperationSelector = ({ selectedOperation, onOperationChange }) => {
  const operations = [
    { id: 'derivative', label: 'Derivada', description: 'Calcular f\'(x)' },
    { id: 'limit', label: 'Límite', description: 'Calcular límite cuando x tiende a un punto' },
    { id: 'epsilon-delta', label: 'ε-δ', description: 'Demostrar límite usando definición formal' },
    { id: 'graph', label: 'Gráfica', description: 'Graficar la función' }
  ];

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">
        Operación
      </label>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        {operations.map((operation) => (
          <button
            key={operation.id}
            onClick={() => onOperationChange(operation.id)}
            className={`p-4 rounded-lg border-2 transition-all ${
              selectedOperation === operation.id
                ? 'border-primary-500 bg-primary-50 text-primary-700'
                : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'
            }`}
          >
            <div className="text-left">
              <div className="font-medium">{operation.label}</div>
              <div className="text-sm text-gray-500 mt-1">{operation.description}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default OperationSelector; 