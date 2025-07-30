import React, { useState } from 'react';

const EpsilonDeltaExamples = ({ onSelectExample }) => {
  const [selectedExample, setSelectedExample] = useState(null);

  const examples = [
    {
      id: 1,
      title: "Límite de x² cuando x→2",
      function: "x^2",
      point: "2",
      epsilon: "0.1",
      description: "Demostrar que lim(x→2) x² = 4 usando la definición ε-δ",
      explanation: "Este es un ejemplo clásico que muestra cómo usar la definición formal de límite para demostrar que x² se acerca a 4 cuando x se acerca a 2.",
      steps: [
        "Queremos demostrar que para todo ε > 0, existe δ > 0 tal que si 0 < |x - 2| < δ, entonces |x² - 4| < ε",
        "Dado ε = 0.1, necesitamos encontrar δ tal que |x² - 4| < 0.1 cuando |x - 2| < δ",
        "Factorizando: |x² - 4| = |(x-2)(x+2)| = |x-2|·|x+2|",
        "Si |x-2| < δ, entonces |x+2| < 4 + δ (ya que x está cerca de 2)",
        "Por lo tanto, |x² - 4| < δ·(4 + δ)",
        "Para que esto sea menor que 0.1, necesitamos δ·(4 + δ) < 0.1",
        "Resolviendo: δ ≈ 0.025 satisface esta condición"
      ]
    },
    {
      id: 2,
      title: "Límite de sin(x)/x cuando x→0",
      function: "sin(x)/x",
      point: "0",
      epsilon: "0.01",
      description: "Demostrar que lim(x→0) sin(x)/x = 1 usando ε-δ",
      explanation: "Este es un límite fundamental en cálculo que requiere un análisis más sofisticado debido a la forma indeterminada 0/0.",
      steps: [
        "Queremos demostrar que para todo ε > 0, existe δ > 0 tal que si 0 < |x| < δ, entonces |sin(x)/x - 1| < ε",
        "Dado ε = 0.01, necesitamos encontrar δ tal que |sin(x)/x - 1| < 0.01 cuando |x| < δ",
        "Usando la aproximación de Taylor: sin(x) ≈ x - x³/6 para x pequeño",
        "Por lo tanto: |sin(x)/x - 1| ≈ |x²/6|",
        "Para que |x²/6| < 0.01, necesitamos |x| < √(0.06) ≈ 0.245",
        "Por lo tanto, δ = 0.24 satisface la condición"
      ]
    },
    {
      id: 3,
      title: "Límite de 1/x cuando x→1",
      function: "1/x",
      point: "1",
      epsilon: "0.05",
      description: "Demostrar que lim(x→1) 1/x = 1 usando ε-δ",
      explanation: "Este ejemplo muestra cómo manejar funciones racionales en la definición ε-δ.",
      steps: [
        "Queremos demostrar que para todo ε > 0, existe δ > 0 tal que si 0 < |x - 1| < δ, entonces |1/x - 1| < ε",
        "Dado ε = 0.05, necesitamos encontrar δ tal que |1/x - 1| < 0.05 cuando |x - 1| < δ",
        "Simplificando: |1/x - 1| = |(1-x)/x| = |x-1|/|x|",
        "Si |x-1| < δ, entonces 1-δ < x < 1+δ",
        "Para x > 0.5 (que se cumple si δ < 0.5), tenemos |x| > 0.5",
        "Por lo tanto: |1/x - 1| < δ/0.5 = 2δ",
        "Para que 2δ < 0.05, necesitamos δ < 0.025"
      ]
    },
    {
      id: 4,
      title: "Límite de √x cuando x→4",
      function: "sqrt(x)",
      point: "4",
      epsilon: "0.1",
      description: "Demostrar que lim(x→4) √x = 2 usando ε-δ",
      explanation: "Este ejemplo muestra cómo manejar funciones con raíces en la definición ε-δ.",
      steps: [
        "Queremos demostrar que para todo ε > 0, existe δ > 0 tal que si 0 < |x - 4| < δ, entonces |√x - 2| < ε",
        "Dado ε = 0.1, necesitamos encontrar δ tal que |√x - 2| < 0.1 cuando |x - 4| < δ",
        "Multiplicando por el conjugado: |√x - 2| = |(x-4)/(√x + 2)|",
        "Si |x-4| < δ, entonces |√x - 2| < δ/(√x + 2)",
        "Para x > 0, tenemos √x + 2 > 2",
        "Por lo tanto: |√x - 2| < δ/2",
        "Para que δ/2 < 0.1, necesitamos δ < 0.2"
      ]
    },
    {
      id: 5,
      title: "Límite de e^x cuando x→0",
      function: "e^x",
      point: "0",
      epsilon: "0.01",
      description: "Demostrar que lim(x→0) e^x = 1 usando ε-δ",
      explanation: "Este ejemplo muestra cómo manejar funciones exponenciales en la definición ε-δ.",
      steps: [
        "Queremos demostrar que para todo ε > 0, existe δ > 0 tal que si 0 < |x| < δ, entonces |e^x - 1| < ε",
        "Dado ε = 0.01, necesitamos encontrar δ tal que |e^x - 1| < 0.01 cuando |x| < δ",
        "Usando la serie de Taylor: e^x ≈ 1 + x + x²/2 para x pequeño",
        "Por lo tanto: |e^x - 1| ≈ |x + x²/2|",
        "Para x pequeño, el término dominante es |x|",
        "Para que |x| < 0.01, necesitamos δ < 0.01",
        "Verificando: para x = 0.01, e^0.01 ≈ 1.01005, que está dentro del margen"
      ]
    }
  ];

  const handleExampleClick = (example) => {
    setSelectedExample(example);
    onSelectExample(example);
  };

  return (
    <div className="space-y-4">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-lg font-medium text-blue-900 mb-2">Ejemplos Detallados de ε-δ</h3>
        <p className="text-sm text-blue-800">
          Estos ejemplos muestran cómo aplicar la definición formal de límite paso a paso. 
          Haz clic en cualquier ejemplo para cargarlo automáticamente.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {examples.map((example) => (
          <div
            key={example.id}
            className={`p-4 border rounded-lg cursor-pointer transition-all ${
              selectedExample?.id === example.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50'
            }`}
            onClick={() => handleExampleClick(example)}
          >
            <h4 className="font-medium text-gray-900 mb-2">{example.title}</h4>
            <p className="text-sm text-gray-600 mb-3">{example.description}</p>
            
            <div className="space-y-2 text-xs">
              <div><strong>f(x):</strong> <code className="bg-gray-100 px-1 rounded">{example.function}</code></div>
              <div><strong>Punto:</strong> <code className="bg-gray-100 px-1 rounded">{example.point}</code></div>
              <div><strong>ε:</strong> <code className="bg-gray-100 px-1 rounded">{example.epsilon}</code></div>
            </div>

            {selectedExample?.id === example.id && (
              <div className="mt-4 pt-4 border-t border-blue-200">
                <h5 className="font-medium text-blue-800 mb-2">Explicación:</h5>
                <p className="text-sm text-blue-700 mb-3">{example.explanation}</p>
                
                <h6 className="font-medium text-blue-800 mb-2">Pasos de la demostración:</h6>
                <ol className="text-sm text-blue-700 space-y-1 list-decimal list-inside">
                  {example.steps.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ol>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <h4 className="font-medium text-green-900 mb-2">¿Cómo usar estos ejemplos?</h4>
        <ol className="text-sm text-green-800 space-y-1 list-decimal list-inside">
          <li>Haz clic en cualquier ejemplo para cargar la función automáticamente</li>
          <li>Selecciona la operación "ε-δ" en el selector</li>
          <li>Configura el punto y el valor de ε según el ejemplo</li>
          <li>Ve los pasos detallados de la demostración ε-δ</li>
        </ol>
      </div>
    </div>
  );
};

export default EpsilonDeltaExamples; 