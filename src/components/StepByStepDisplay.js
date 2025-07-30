import React, { useState } from 'react';
import { formatExpression } from '../utils/calculus';

const StepByStepDisplay = ({ steps, operation }) => {
  const [showSteps, setShowSteps] = useState(false);

  if (!steps || steps.length === 0) {
    return null;
  }

  const getOperationTitle = () => {
    switch (operation) {
      case 'derivative':
        return 'Pasos de la Derivación';
      case 'limit':
        return 'Pasos del Cálculo del Límite';
      default:
        return 'Pasos del Cálculo';
    }
  };

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-sm font-medium text-blue-900">{getOperationTitle()}</h4>
        <button
          onClick={() => setShowSteps(!showSteps)}
          className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
        >
          {showSteps ? 'Ocultar pasos' : 'Ver pasos detallados'}
          <svg
            className={`ml-1 h-4 w-4 transform transition-transform ${showSteps ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {showSteps && (
        <div className="space-y-4">
          {steps.map((step, index) => (
            <div key={index} className="bg-white rounded border border-blue-100 p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-xs font-bold text-blue-600">{step.step}</span>
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-blue-800 mb-2">
                    {step.description}
                  </div>
                  <div className="text-sm text-gray-700 font-mono bg-gray-50 px-3 py-2 rounded mb-2">
                    {formatExpression(step.expression)}
                  </div>
                  {step.explanation && (
                    <div className="text-xs text-gray-600 bg-gray-50 px-3 py-2 rounded border-l-2 border-blue-200">
                      <div className="font-medium text-blue-700 mb-1">Explicación:</div>
                      <div className="whitespace-pre-line">{step.explanation}</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
          
          {/* Final result highlight */}
          <div className="bg-green-100 border border-green-200 rounded p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 mt-1">
                <svg className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3 flex-1">
                <div className="text-sm font-medium text-green-800 mb-2">Resultado Final</div>
                <div className="text-sm text-green-700 font-mono bg-green-50 px-3 py-2 rounded">
                  {formatExpression(steps[steps.length - 1].expression)}
                </div>
                {steps[steps.length - 1].explanation && (
                  <div className="text-xs text-green-600 mt-2 bg-green-50 px-3 py-2 rounded border-l-2 border-green-200">
                    <div className="font-medium text-green-700 mb-1">Conclusión:</div>
                    <div>{steps[steps.length - 1].explanation}</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StepByStepDisplay; 