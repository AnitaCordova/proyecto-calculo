import React from 'react';
import { formatExpression } from '../utils/calculus';
import StepByStepDisplay from './StepByStepDisplay';

const ResultDisplay = ({ result, operation, functionInput, limitPoint, error }) => {
  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">Error</h3>
            <div className="mt-2 text-sm text-red-700">{error}</div>
          </div>
        </div>
      </div>
    );
  }

  if (!result) {
    return null;
  }

  const getOperationLabel = () => {
    switch (operation) {
      case 'derivative':
        return 'Derivada';
      case 'limit':
        return 'Límite';
      case 'epsilon-delta':
        return 'Demostración ε-δ';
      case 'graph':
        return 'Función';
      default:
        return 'Resultado';
    }
  };

  const getResultText = () => {
    const formattedInput = formatExpression(functionInput);
    
    // Check if result is an object with steps (new format)
    const resultValue = typeof result === 'object' && result.result ? result.result : result;
    
    switch (operation) {
      case 'derivative':
        return `f'(x) = ${formatExpression(resultValue)}`;
      case 'limit':
        const point = limitPoint === 'infinity' ? '∞' : 
                     limitPoint === '-infinity' ? '-∞' : limitPoint;
        return `lim(x→${point}) ${formattedInput} = ${formatExpression(resultValue)}`;
      case 'epsilon-delta':
        return resultValue;
      case 'graph':
        return `f(x) = ${formattedInput}`;
      default:
        return resultValue;
    }
  };

  return (
    <div>
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-green-800">{getOperationLabel()}</h3>
            <div className="mt-2 text-sm text-green-700 font-mono">
              {getResultText()}
            </div>
          </div>
        </div>
      </div>
      
      {/* Show steps if available */}
      {typeof result === 'object' && result.steps && (
        <StepByStepDisplay 
          steps={result.steps} 
          operation={operation} 
        />
      )}
    </div>
  );
};

export default ResultDisplay; 