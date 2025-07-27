import React from 'react';

const LimitInput = ({ limitPoint, onLimitPointChange }) => {
  const commonPoints = [
    { value: 'infinity', label: '∞' },
    { value: '-infinity', label: '-∞' },
    { value: '0', label: '0' },
    { value: '1', label: '1' },
    { value: '2', label: '2' }
  ];

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="limit-point" className="block text-sm font-medium text-gray-700 mb-2">
          Límite cuando x tiende a:
        </label>
        <input
          id="limit-point"
          type="text"
          value={limitPoint}
          onChange={(e) => onLimitPointChange(e.target.value)}
          placeholder="Ingresa un punto (ej: 0, 1, infinity, -infinity)"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
        />
      </div>
      
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-2">Puntos comunes:</h4>
        <div className="flex flex-wrap gap-2">
          {commonPoints.map((point) => (
            <button
              key={point.value}
              onClick={() => onLimitPointChange(point.value)}
              className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md transition-colors"
            >
              {point.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LimitInput; 