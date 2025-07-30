import React, { useState, useEffect } from 'react';
import FunctionInput from './components/FunctionInput';
import OperationSelector from './components/OperationSelector';
import LimitInput from './components/LimitInput';
import EpsilonDeltaInput from './components/EpsilonDeltaInput';
import EpsilonDeltaExamples from './components/EpsilonDeltaExamples';
import ResultDisplay from './components/ResultDisplay';
import FunctionGraph from './components/FunctionGraph';
import WelcomeScreen from './components/WelcomeScreen';
import { calculateDerivative, calculateLimit, calculateLimitEpsilonDelta, debugParse } from './utils/calculus';

function App() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [functionInput, setFunctionInput] = useState('');
  const [selectedOperation, setSelectedOperation] = useState('derivative');
  const [limitPoint, setLimitPoint] = useState('0');
  const [epsilon, setEpsilon] = useState('0.1');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const [showEpsilonDeltaExamples, setShowEpsilonDeltaExamples] = useState(false);

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
        case 'epsilon-delta':
          calculatedResult = calculateLimitEpsilonDelta(functionInput, 'x', limitPoint, epsilon);
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
  }, [functionInput, selectedOperation, limitPoint, epsilon]);

  // Handle example selection
  const handleExampleSelection = (example) => {
    setFunctionInput(example.function);
    setLimitPoint(example.point);
    setEpsilon(example.epsilon);
    setSelectedOperation('epsilon-delta');
    setShowEpsilonDeltaExamples(false);
  };

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

            {/* Limit Input (only show for limit and epsilon-delta operations) */}
            {(selectedOperation === 'limit' || selectedOperation === 'epsilon-delta') && (
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <LimitInput 
                  limitPoint={limitPoint}
                  onLimitPointChange={setLimitPoint}
                />
              </div>
            )}

            {/* Epsilon Input (only show for epsilon-delta operation) */}
            {selectedOperation === 'epsilon-delta' && (
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <EpsilonDeltaInput 
                  epsilon={epsilon}
                  onEpsilonChange={setEpsilon}
                  limitPoint={limitPoint}
                />
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <button
                    onClick={() => setShowEpsilonDeltaExamples(!showEpsilonDeltaExamples)}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
                  >
                    {showEpsilonDeltaExamples ? 'Ocultar ejemplos' : 'Ver ejemplos detallados de ε-δ'}
                    <svg
                      className={`ml-1 h-4 w-4 transform transition-transform ${showEpsilonDeltaExamples ? 'rotate-180' : ''}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>
              </div>
            )}

            {/* Result Display */}
            {(selectedOperation === 'derivative' || selectedOperation === 'limit' || selectedOperation === 'epsilon-delta') && (
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

            {/* Epsilon-Delta Examples */}
            {showEpsilonDeltaExamples && (
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <EpsilonDeltaExamples onSelectExample={handleExampleSelection} />
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
              <p>Usa el teclado matemático o notación estándar: x^2, sin(x), ln(x), sqrt(x), sinh(x), arcsin(x), etc.</p>
            </div>
            <div>
              <h4 className="font-medium mb-2">2. Elige la Operación</h4>
              <p>Selecciona derivada, límite, ε-δ o gráfica para ver el resultado y visualización.</p>
            </div>
            <div>
              <h4 className="font-medium mb-2">3. Ver Resultados</h4>
              <p>Ve resultados simbólicos, pasos detallados y gráficas interactivas con resaltado de discontinuidades.</p>
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