import React, { useState, useEffect } from 'react';
import FunctionInput from './components/FunctionInput';
import OperationSelector from './components/OperationSelector';
import LimitInput from './components/LimitInput';
import ResultDisplay from './components/ResultDisplay';
import FunctionGraph from './components/FunctionGraph';
import WelcomeScreen from './components/WelcomeScreen';
import { calculateDerivative, calculateLimit, debugParse } from './utils/calculus';

function App() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [functionInput, setFunctionInput] = useState('');
  const [selectedOperation, setSelectedOperation] = useState('derivative');
  const [limitPoint, setLimitPoint] = useState('0');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  // Calculate result when inputs change
  useEffect(() => {
    if (!functionInput.trim()) {
      setResult('');
      setError('');
      return;
    }

    // Debug: Test parsing for exponentiation
    if (functionInput.includes('^')) {
      debugParse(functionInput);
    }

    try {
      let calculatedResult = '';
      
      switch (selectedOperation) {
        case 'derivative':
          calculatedResult = calculateDerivative(functionInput);
          break;
        case 'limit':
          calculatedResult = calculateLimit(functionInput, 'x', limitPoint);
          break;
        case 'graph':
          // For graphing, we don't need a symbolic result
          calculatedResult = functionInput;
          break;
        default:
          break;
      }
      
      setResult(calculatedResult);
      setError('');
    } catch (err) {
      setError(err.message);
      setResult('');
    }
  }, [functionInput, selectedOperation, limitPoint]);

  // Show welcome screen if not started
  if (showWelcome) {
    return <WelcomeScreen onStart={() => setShowWelcome(false)} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Proyecto de Cálculo</h1>
              <p className="text-gray-600 mt-1">Herramienta interactiva para derivadas, límites y graficación</p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">Desarrollado por</div>
              <div className="text-lg font-semibold text-primary-600">Ana Maria Córdova Jaramillo</div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Panel - Inputs */}
          <div className="space-y-6">
            {/* Function Input */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <FunctionInput 
                value={functionInput}
                onChange={setFunctionInput}
              />
            </div>

            {/* Operation Selector */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <OperationSelector 
                selectedOperation={selectedOperation}
                onOperationChange={setSelectedOperation}
              />
            </div>

            {/* Limit Input (only show for limit operation) */}
            {selectedOperation === 'limit' && (
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <LimitInput 
                  limitPoint={limitPoint}
                  onLimitPointChange={setLimitPoint}
                />
              </div>
            )}

            {/* Result Display */}
            {(selectedOperation === 'derivative' || selectedOperation === 'limit') && (
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <ResultDisplay 
                  result={result}
                  operation={selectedOperation}
                  functionInput={functionInput}
                  limitPoint={limitPoint}
                  error={error}
                />
              </div>
            )}
          </div>

          {/* Right Panel - Graph */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <FunctionGraph 
              functionInput={functionInput}
              xMin={-10}
              xMax={10}
              yMin={-10}
              yMax={10}
            />
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-medium text-blue-900 mb-3">Cómo Usar</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-blue-800">
            <div>
              <h4 className="font-medium mb-2">1. Ingresa la Función</h4>
              <p>Usa notación matemática estándar: x^2, sin(x), ln(x), sqrt(x), etc.</p>
            </div>
            <div>
              <h4 className="font-medium mb-2">2. Elige la Operación</h4>
              <p>Selecciona derivada, límite o gráfica para ver el resultado y visualización.</p>
            </div>
            <div>
              <h4 className="font-medium mb-2">3. Ver Resultados</h4>
              <p>Ve resultados simbólicos y gráficas interactivas con resaltado de discontinuidades.</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-gray-500 text-sm">
            <p>Desarrollado con React, Math.js y Plotly.js</p>
            <p className="mt-1">Materia de Cálculo - Universidad</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App; 