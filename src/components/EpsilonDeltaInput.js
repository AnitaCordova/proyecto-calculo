import React from 'react';

const EpsilonDeltaInput = ({ epsilon, onEpsilonChange, limitPoint }) => {
  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="epsilon" className="block text-sm font-medium text-gray-700 mb-2">
          Valor de ε (epsilon)
        </label>
        <div className="flex items-center space-x-2">
          <input
            type="number"
            id="epsilon"
            value={epsilon}
            onChange={(e) => onEpsilonChange(e.target.value)}
            step="0.01"
            min="0.001"
            max="10"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="0.1"
          />
          <span className="text-sm text-gray-500">(margen de error)</span>
        </div>
        <p className="text-xs text-gray-500 mt-1">
          ε representa qué tan cerca queremos que f(x) esté del límite L
        </p>
      </div>
      
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
        <h4 className="text-sm font-medium text-blue-900 mb-2">Definición ε-δ</h4>
        <p className="text-xs text-blue-800">
          Para todo ε {'>'} 0, existe δ {'>'} 0 tal que si 0 {'<'} |x - {limitPoint === 'infinity' ? '∞' : 
          limitPoint === '-infinity' ? '-∞' : limitPoint}| {'<'} δ, entonces |f(x) - L| {'<'} ε
        </p>
      </div>
    </div>
  );
};

export default EpsilonDeltaInput; 