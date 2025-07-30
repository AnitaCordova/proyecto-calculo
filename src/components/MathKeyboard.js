import React, { useState } from 'react';

const MathKeyboard = ({ onInput, onClose, currentValue = '' }) => {
  const [inputValue, setInputValue] = useState(currentValue);
  const [cursorPosition, setCursorPosition] = useState(currentValue.length);

  const buttons = [
    // Números
    { label: '0', type: 'number' },
    { label: '1', type: 'number' },
    { label: '2', type: 'number' },
    { label: '3', type: 'number' },
    { label: '4', type: 'number' },
    { label: '5', type: 'number' },
    { label: '6', type: 'number' },
    { label: '7', type: 'number' },
    { label: '8', type: 'number' },
    { label: '9', type: 'number' },
    
    // Variables
    { label: 'x', type: 'variable' },
    { label: 'y', type: 'variable' },
    { label: 'z', type: 'variable' },
    { label: 'π', type: 'constant' },
    { label: 'e', type: 'constant' },
    
    // Operadores básicos
    { label: '+', type: 'operator' },
    { label: '-', type: 'operator' },
    { label: '×', type: 'operator', insert: '*' },
    { label: '÷', type: 'operator', insert: '/' },
    { label: '^', type: 'operator', insert: '^' },
    { label: '(', type: 'bracket' },
    { label: ')', type: 'bracket' },
    { label: '=', type: 'operator' },
    
    // Funciones trigonométricas
    { label: 'sin', type: 'function', insert: 'sin(' },
    { label: 'cos', type: 'function', insert: 'cos(' },
    { label: 'tan', type: 'function', insert: 'tan(' },
    { label: 'sec', type: 'function', insert: 'sec(' },
    { label: 'csc', type: 'function', insert: 'csc(' },
    { label: 'cot', type: 'function', insert: 'cot(' },
    
    // Funciones trigonométricas inversas
    { label: 'arcsin', type: 'function', insert: 'arcsin(' },
    { label: 'arccos', type: 'function', insert: 'arccos(' },
    { label: 'arctan', type: 'function', insert: 'arctan(' },
    
    // Funciones hiperbólicas
    { label: 'sinh', type: 'function', insert: 'sinh(' },
    { label: 'cosh', type: 'function', insert: 'cosh(' },
    { label: 'tanh', type: 'function', insert: 'tanh(' },
    { label: 'sech', type: 'function', insert: 'sech(' },
    { label: 'csch', type: 'function', insert: 'csch(' },
    { label: 'coth', type: 'function', insert: 'coth(' },
    
    // Funciones logarítmicas y exponenciales
    { label: 'ln', type: 'function', insert: 'ln(' },
    { label: 'log', type: 'function', insert: 'log(' },
    { label: 'log₂', type: 'function', insert: 'log2(' },
    { label: 'exp', type: 'function', insert: 'exp(' },
    { label: 'e^x', type: 'function', insert: 'exp(' },
    
    // Otras funciones
    { label: '√', type: 'function', insert: 'sqrt(' },
    { label: '|x|', type: 'function', insert: 'abs(' },
    { label: '⌊x⌋', type: 'function', insert: 'floor(' },
    { label: '⌈x⌉', type: 'function', insert: 'ceil(' },
    { label: 'round', type: 'function', insert: 'round(' },
    { label: 'sign', type: 'function', insert: 'sign(' },
    { label: 'x!', type: 'function', insert: 'factorial(' },
    { label: 'Γ(x)', type: 'function', insert: 'gamma(' },
    
    // Especiales
    { label: '∞', type: 'constant' },
    { label: '±', type: 'operator', insert: '±' },
    { label: '·', type: 'operator', insert: '*' },
    { label: 'DEL', type: 'action', action: 'delete' },
    { label: 'CLEAR', type: 'action', action: 'clear' },
    { label: 'SPACE', type: 'action', action: 'space' },
  ];

  const handleButtonClick = (button) => {
    let newValue = inputValue;
    let newPosition = cursorPosition;

    if (button.type === 'action') {
      switch (button.action) {
        case 'delete':
          if (newPosition > 0) {
            newValue = newValue.slice(0, newPosition - 1) + newValue.slice(newPosition);
            newPosition--;
          }
          break;
        case 'clear':
          newValue = '';
          newPosition = 0;
          break;
        case 'space':
          newValue = newValue.slice(0, newPosition) + ' ' + newValue.slice(newPosition);
          newPosition++;
          break;
        default:
          break;
      }
    } else {
      const insertText = button.insert || button.label;
      newValue = newValue.slice(0, newPosition) + insertText + newValue.slice(newPosition);
      newPosition += insertText.length;
    }

    setInputValue(newValue);
    setCursorPosition(newPosition);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setCursorPosition(e.target.selectionStart);
  };

  const handleInputClick = (e) => {
    setCursorPosition(e.target.selectionStart);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onInput(inputValue);
      onClose();
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  const getButtonClass = (button) => {
    const baseClass = "px-3 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500";
    
    switch (button.type) {
      case 'number':
        return `${baseClass} bg-gray-100 hover:bg-gray-200 text-gray-800`;
      case 'operator':
        return `${baseClass} bg-blue-100 hover:bg-blue-200 text-blue-800`;
      case 'function':
        return `${baseClass} bg-green-100 hover:bg-green-200 text-green-800`;
      case 'variable':
        return `${baseClass} bg-purple-100 hover:bg-purple-200 text-purple-800`;
      case 'constant':
        return `${baseClass} bg-yellow-100 hover:bg-yellow-200 text-yellow-800`;
      case 'bracket':
        return `${baseClass} bg-orange-100 hover:bg-orange-200 text-orange-800`;
      case 'action':
        return `${baseClass} bg-red-100 hover:bg-red-200 text-red-800`;
      default:
        return `${baseClass} bg-gray-100 hover:bg-gray-200 text-gray-800`;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center">
          <h3 className="text-lg font-semibold">Teclado Matemático</h3>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 text-xl font-bold"
          >
            ×
          </button>
        </div>

        {/* Input Area */}
        <div className="p-6 border-b">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Función
            </label>
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              onClick={handleInputClick}
              onKeyDown={handleKeyDown}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-lg font-mono focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Ingresa tu función matemática..."
              autoFocus
            />
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={() => onInput(inputValue)}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Aplicar
            </button>
            <button
              onClick={onClose}
              className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
            >
              Cancelar
            </button>
          </div>
        </div>

        {/* Keyboard */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          <div className="grid grid-cols-8 md:grid-cols-10 lg:grid-cols-12 gap-2">
            {buttons.map((button, index) => (
              <button
                key={index}
                onClick={() => handleButtonClick(button)}
                className={getButtonClass(button)}
                title={button.label}
              >
                {button.label}
              </button>
            ))}
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-gray-50 px-6 py-4 text-sm text-gray-600">
          <p><strong>Instrucciones:</strong> Haz clic en los botones para construir tu función. Usa Enter para aplicar o Escape para cancelar.</p>
        </div>
      </div>
    </div>
  );
};

export default MathKeyboard; 