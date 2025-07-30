import { create, all } from 'mathjs';
const math = create(all);

// Convert common function notation to math.js format
export const parseFunction = (input) => {
  let expression = input.toLowerCase()
    // Logarithmic functions
    .replace(/ln\(/g, 'log(')  // Convert ln to log (natural logarithm)
    .replace(/log\(/g, 'log10(')  // Convert log to log10 (base 10)
    .replace(/log2\(/g, 'log2(')  // Base 2 logarithm
    
    // Trigonometric functions
    .replace(/sin\(/g, 'sin(')
    .replace(/cos\(/g, 'cos(')
    .replace(/tan\(/g, 'tan(')
    .replace(/sec\(/g, 'sec(')
    .replace(/csc\(/g, 'csc(')
    .replace(/cot\(/g, 'cot(')
    
    // Inverse trigonometric functions
    .replace(/asin\(/g, 'asin(')
    .replace(/acos\(/g, 'acos(')
    .replace(/atan\(/g, 'atan(')
    .replace(/arcsin\(/g, 'asin(')
    .replace(/arccos\(/g, 'acos(')
    .replace(/arctan\(/g, 'atan(')
    
    // Hyperbolic functions
    .replace(/sinh\(/g, 'sinh(')
    .replace(/cosh\(/g, 'cosh(')
    .replace(/tanh\(/g, 'tanh(')
    .replace(/sech\(/g, 'sech(')
    .replace(/csch\(/g, 'csch(')
    .replace(/coth\(/g, 'coth(')
    
    // Other functions
    .replace(/sqrt\(/g, 'sqrt(')
    .replace(/abs\(/g, 'abs(')
    .replace(/exp\(/g, 'exp(')
    .replace(/floor\(/g, 'floor(')
    .replace(/ceil\(/g, 'ceil(')
    .replace(/round\(/g, 'round(')
    .replace(/sign\(/g, 'sign(')
    .replace(/factorial\(/g, 'factorial(')
    .replace(/gamma\(/g, 'gamma(');
  
  // Handle exponentiation - convert x^y to pow(x,y)
  // Use a more sophisticated approach to handle complex expressions
  expression = convertExponentiation(expression);
  
  return expression;
};

// Helper function to convert exponentiation
const convertExponentiation = (expr) => {
  // Simple case: x^2, x^y, etc.
  expr = expr.replace(/([a-zA-Z0-9]+)\^([a-zA-Z0-9]+)/g, 'pow($1,$2)');
  
  // Case with parentheses: (x+1)^2, x^(y+1), etc.
  expr = expr.replace(/\(([^)]+)\)\^([a-zA-Z0-9]+)/g, 'pow($1,$2)');
  expr = expr.replace(/([a-zA-Z0-9]+)\^\(([^)]+)\)/g, 'pow($1,$2)');
  expr = expr.replace(/\(([^)]+)\)\^\(([^)]+)\)/g, 'pow($1,$2)');
  
  return expr;
};

// Debug function to test parsing (remove in production)
export const debugParse = (input) => {
  console.log('Original:', input);
  const parsed = parseFunction(input);
  console.log('Parsed:', parsed);
  return parsed;
};

// Calculate derivative symbolically with detailed steps
export const calculateDerivative = (expression, variable = 'x') => {
  try {
    const parsedExpr = parseFunction(expression);
    const steps = [];
    
    // Add initial step
    steps.push({
      step: 1,
      description: 'Función original',
      expression: formatExpression(expression),
      explanation: 'Esta es la función que vamos a derivar'
    });
    
    // Add parsing step
    steps.push({
      step: 2,
      description: 'Convertir notación matemática',
      expression: parsedExpr,
      explanation: 'Convertimos la notación matemática estándar al formato interno del sistema'
    });
    
    // Detailed analysis of the expression
    const analysis = analyzeExpressionDetailed(parsedExpr);
    
    if (analysis.components.length > 1) {
      steps.push({
        step: 3,
        description: 'Identificar componentes de la función',
        expression: analysis.components.join(' + '),
        explanation: `La función se puede descomponer en ${analysis.components.length} términos. Aplicaremos la regla de la suma: d/dx[f(x) + g(x)] = f'(x) + g'(x)`
      });
    }
    
    // Add detailed derivative rules explanation
    if (analysis.rules.length > 0) {
      steps.push({
        step: 4,
        description: 'Aplicar reglas de derivación',
        expression: analysis.rules.map(rule => rule.rule).join(', '),
        explanation: analysis.rules.map(rule => rule.explanation).join('\n')
      });
    }
    
    // Calculate derivative step by step
    const derivativeSteps = calculateDerivativeStepByStep(parsedExpr, variable);
    steps.push(...derivativeSteps);
    
    // Calculate final derivative
    const derivative = math.derivative(parsedExpr, variable);
    
    // Add derivative step
    steps.push({
      step: steps.length + 1,
      description: 'Derivada calculada',
      expression: derivative.toString(),
      explanation: 'Aplicando todas las reglas de derivación, obtenemos este resultado'
    });
    
    // Simplify if possible
    let simplified = derivative;
    try {
      simplified = math.simplify(derivative);
      if (simplified.toString() !== derivative.toString()) {
        steps.push({
          step: steps.length + 1,
          description: 'Simplificar expresión',
          expression: simplified.toString(),
          explanation: 'Simplificamos la expresión para obtener la forma más reducida'
        });
      }
    } catch (e) {
      // If simplification fails, keep original derivative
    }
    
    // Add final result with explanation
    steps.push({
      step: steps.length + 1,
      description: 'Resultado final',
      expression: simplified.toString(),
      explanation: 'Esta es la derivada final de la función original'
    });
    
    return {
      result: simplified.toString(),
      steps: steps
    };
  } catch (error) {
    throw new Error(`Error calculating derivative: ${error.message}`);
  }
};

// Helper function to analyze expression with detailed explanations
const analyzeExpressionDetailed = (expression) => {
  const components = [];
  const rules = [];
  
  // Check for trigonometric functions
  if (expression.includes('sin(')) {
    rules.push({
      rule: 'Regla de la derivada del seno',
      explanation: 'd/dx[sin(x)] = cos(x) - La derivada del seno es el coseno'
    });
  }
  if (expression.includes('cos(')) {
    rules.push({
      rule: 'Regla de la derivada del coseno',
      explanation: 'd/dx[cos(x)] = -sin(x) - La derivada del coseno es menos el seno'
    });
  }
  if (expression.includes('tan(')) {
    rules.push({
      rule: 'Regla de la derivada de la tangente',
      explanation: 'd/dx[tan(x)] = sec²(x) = 1/cos²(x) - La derivada de la tangente es la secante al cuadrado'
    });
  }
  if (expression.includes('sec(')) {
    rules.push({
      rule: 'Regla de la derivada de la secante',
      explanation: 'd/dx[sec(x)] = sec(x)tan(x) - La derivada de la secante es secante por tangente'
    });
  }
  if (expression.includes('csc(')) {
    rules.push({
      rule: 'Regla de la derivada de la cosecante',
      explanation: 'd/dx[csc(x)] = -csc(x)cot(x) - La derivada de la cosecante es menos cosecante por cotangente'
    });
  }
  if (expression.includes('cot(')) {
    rules.push({
      rule: 'Regla de la derivada de la cotangente',
      explanation: 'd/dx[cot(x)] = -csc²(x) - La derivada de la cotangente es menos cosecante al cuadrado'
    });
  }
  
  // Check for inverse trigonometric functions
  if (expression.includes('asin(')) {
    rules.push({
      rule: 'Regla de la derivada del arcoseno',
      explanation: 'd/dx[arcsin(x)] = 1/√(1-x²) - La derivada del arcoseno es uno sobre raíz de uno menos x al cuadrado'
    });
  }
  if (expression.includes('acos(')) {
    rules.push({
      rule: 'Regla de la derivada del arcocoseno',
      explanation: 'd/dx[arccos(x)] = -1/√(1-x²) - La derivada del arcocoseno es menos uno sobre raíz de uno menos x al cuadrado'
    });
  }
  if (expression.includes('atan(')) {
    rules.push({
      rule: 'Regla de la derivada del arcotangente',
      explanation: 'd/dx[arctan(x)] = 1/(1+x²) - La derivada del arcotangente es uno sobre uno más x al cuadrado'
    });
  }
  
  // Check for hyperbolic functions
  if (expression.includes('sinh(')) {
    rules.push({
      rule: 'Regla de la derivada del seno hiperbólico',
      explanation: 'd/dx[sinh(x)] = cosh(x) - La derivada del seno hiperbólico es el coseno hiperbólico'
    });
  }
  if (expression.includes('cosh(')) {
    rules.push({
      rule: 'Regla de la derivada del coseno hiperbólico',
      explanation: 'd/dx[cosh(x)] = sinh(x) - La derivada del coseno hiperbólico es el seno hiperbólico'
    });
  }
  if (expression.includes('tanh(')) {
    rules.push({
      rule: 'Regla de la derivada de la tangente hiperbólica',
      explanation: 'd/dx[tanh(x)] = sech²(x) = 1/cosh²(x) - La derivada de la tangente hiperbólica es la secante hiperbólica al cuadrado'
    });
  }
  if (expression.includes('sech(')) {
    rules.push({
      rule: 'Regla de la derivada de la secante hiperbólica',
      explanation: 'd/dx[sech(x)] = -sech(x)tanh(x) - La derivada de la secante hiperbólica es menos secante hiperbólica por tangente hiperbólica'
    });
  }
  if (expression.includes('csch(')) {
    rules.push({
      rule: 'Regla de la derivada de la cosecante hiperbólica',
      explanation: 'd/dx[csch(x)] = -csch(x)coth(x) - La derivada de la cosecante hiperbólica es menos cosecante hiperbólica por cotangente hiperbólica'
    });
  }
  if (expression.includes('coth(')) {
    rules.push({
      rule: 'Regla de la derivada de la cotangente hiperbólica',
      explanation: 'd/dx[coth(x)] = -csch²(x) - La derivada de la cotangente hiperbólica es menos cosecante hiperbólica al cuadrado'
    });
  }
  
  // Check for logarithmic functions
  if (expression.includes('log(')) {
    rules.push({
      rule: 'Regla de la derivada del logaritmo natural',
      explanation: 'd/dx[ln(x)] = 1/x - La derivada del logaritmo natural es uno sobre x'
    });
  }
  
  // Check for exponential functions
  if (expression.includes('exp(')) {
    rules.push({
      rule: 'Regla de la derivada de la exponencial',
      explanation: 'd/dx[e^x] = e^x - La derivada de la exponencial es ella misma'
    });
  }
  
  // Check for power functions
  if (expression.includes('pow(')) {
    rules.push({
      rule: 'Regla de la potencia',
      explanation: 'd/dx[x^n] = n·x^(n-1) - La derivada de x elevado a n es n por x elevado a (n-1)'
    });
  }
  
  // Check for square root
  if (expression.includes('sqrt(')) {
    rules.push({
      rule: 'Regla de la derivada de la raíz cuadrada',
      explanation: 'd/dx[√x] = 1/(2√x) - La derivada de la raíz cuadrada es uno sobre dos veces la raíz'
    });
  }
  
  // Check for product rule
  if (expression.includes('*')) {
    rules.push({
      rule: 'Regla del producto',
      explanation: 'd/dx[u·v] = u\'·v + u·v\' - La derivada del producto es la derivada del primero por el segundo, más el primero por la derivada del segundo'
    });
  }
  
  // Check for quotient rule
  if (expression.includes('/')) {
    rules.push({
      rule: 'Regla del cociente',
      explanation: 'd/dx[u/v] = (u\'·v - u·v\')/v² - La derivada del cociente es (derivada del numerador por denominador, menos numerador por derivada del denominador) sobre denominador al cuadrado'
    });
  }
  
  // Check for chain rule
  if (expression.includes('(') && expression.includes(')')) {
    const hasNestedFunctions = (expression.match(/\(/g) || []).length > 1;
    if (hasNestedFunctions) {
      rules.push({
        rule: 'Regla de la cadena',
        explanation: 'd/dx[f(g(x))] = f\'(g(x))·g\'(x) - La derivada de una función compuesta es la derivada de la función exterior evaluada en la función interior, por la derivada de la función interior'
      });
    }
  }
  
  // Split by addition/subtraction to identify components
  const parts = expression.split(/(?<=[a-zA-Z0-9)])[\+\-]/);
  if (parts.length > 1) {
    components.push(...parts.filter(part => part.trim()));
  }
  
  return { components, rules };
};

// Calculate derivative with intermediate steps
const calculateDerivativeStepByStep = (expression, variable) => {
  const steps = [];
  
  // For now, we'll add a general step about the derivative process
  steps.push({
    step: 5,
    description: 'Proceso de derivación',
    expression: `d/dx[${expression}]`,
    explanation: 'Aplicamos las reglas de derivación identificadas anteriormente para cada componente de la función'
  });
  
  return steps;
};

// Calculate limit with detailed steps
export const calculateLimit = (expression, variable = 'x', point = 'infinity') => {
  try {
    const parsedExpr = parseFunction(expression);
    const steps = [];
    
    // Add initial step
    steps.push({
      step: 1,
      description: 'Función original',
      expression: formatExpression(expression),
      explanation: 'Esta es la función para la cual queremos calcular el límite'
    });
    
    // Add parsing step
    steps.push({
      step: 2,
      description: 'Convertir notación matemática',
      expression: parsedExpr,
      explanation: 'Convertimos la notación matemática estándar al formato interno del sistema'
    });
    
    // Analyze the expression for special cases
    const analysis = analyzeLimitExpressionDetailed(parsedExpr, point);
    if (analysis.specialCases.length > 0) {
      steps.push({
        step: 3,
        description: 'Identificar casos especiales',
        expression: analysis.specialCases.map(case_ => case_.type).join(', '),
        explanation: analysis.specialCases.map(case_ => case_.explanation).join('\n')
      });
    }
    
    // Add limit definition step
    const limitSymbol = point === 'infinity' ? '∞' : 
                       point === '-infinity' ? '-∞' : point;
    steps.push({
      step: 4,
      description: 'Definición del límite',
      expression: `lim(x→${limitSymbol}) ${formatExpression(expression)}`,
      explanation: `Queremos encontrar el valor al que se acerca la función cuando x se acerca a ${limitSymbol}`
    });
    
    let limit;
    let limitDescription = '';
    let evaluationExplanation = '';
    
    if (point === 'infinity') {
      limitDescription = 'Evaluar límite cuando x → ∞';
      evaluationExplanation = 'Para límites al infinito, evaluamos la función en valores muy grandes de x';
      // For infinity limits, evaluate at very large numbers
      const largeValue = 1e10;
      limit = math.evaluate(parsedExpr, { [variable]: largeValue });
    } else if (point === '-infinity') {
      limitDescription = 'Evaluar límite cuando x → -∞';
      evaluationExplanation = 'Para límites al menos infinito, evaluamos la función en valores muy grandes negativos de x';
      // For negative infinity limits, evaluate at very large negative numbers
      const largeNegativeValue = -1e10;
      limit = math.evaluate(parsedExpr, { [variable]: largeNegativeValue });
    } else {
      limitDescription = `Evaluar límite cuando x → ${point}`;
      evaluationExplanation = `Evaluamos la función en x = ${point} para ver si el límite existe`;
      // For finite limits, evaluate at the point
      limit = math.evaluate(parsedExpr, { [variable]: parseFloat(point) });
    }
    
    // Add evaluation step
    steps.push({
      step: 5,
      description: limitDescription,
      expression: limit.toString(),
      explanation: evaluationExplanation
    });
    
    // Handle special cases and provide detailed explanations
    let finalResult = limit.toString();
    let finalExplanation = '';
    
    if (Math.abs(limit) > 1e9) {
      finalResult = limit > 0 ? 'Infinity' : '-Infinity';
      finalExplanation = 'El límite tiende a infinito (o menos infinito)';
    } else if (isNaN(limit)) {
      finalResult = 'No existe';
      finalExplanation = 'El límite no existe porque la función no está definida en este punto';
    } else if (!isFinite(limit)) {
      finalResult = 'No existe';
      finalExplanation = 'El límite no existe porque la función no converge a un valor finito';
    } else {
      finalExplanation = `El límite existe y es igual a ${limit}`;
    }
    
    steps.push({
      step: 6,
      description: 'Resultado final',
      expression: finalResult,
      explanation: finalExplanation
    });
    
    return {
      result: finalResult,
      steps: steps
    };
  } catch (error) {
    throw new Error(`Error calculating limit: ${error.message}`);
  }
};

// Helper function to analyze limit expression with detailed explanations
const analyzeLimitExpressionDetailed = (expression, point) => {
  const specialCases = [];
  
  // Check for division by zero
  if (expression.includes('/')) {
    specialCases.push({
      type: 'División por cero posible',
      explanation: 'La función tiene un denominador que podría ser cero, lo que causaría una discontinuidad'
    });
  }
  
  // Check for indeterminate forms
  if (point === 'infinity' || point === '-infinity') {
    if (expression.includes('log(')) {
      specialCases.push({
        type: 'Logaritmo de infinito',
        explanation: 'El logaritmo de infinito es infinito, pero el comportamiento depende de la base'
      });
    }
    if (expression.includes('sin(') || expression.includes('cos(')) {
      specialCases.push({
        type: 'Funciones trigonométricas en infinito',
        explanation: 'Las funciones trigonométricas oscilan entre -1 y 1, por lo que su límite al infinito puede no existir'
      });
    }
    if (expression.includes('tan(')) {
      specialCases.push({
        type: 'Tangente en infinito',
        explanation: 'La función tangente tiene asíntotas verticales y su comportamiento al infinito es complejo'
      });
    }
  }
  
  // Check for polynomial behavior
  if (expression.includes('pow(')) {
    specialCases.push({
      type: 'Comportamiento polinomial',
      explanation: 'Los polinomios tienden a infinito o menos infinito dependiendo del grado y coeficiente principal'
    });
  }
  
  // Check for exponential behavior
  if (expression.includes('exp(')) {
    specialCases.push({
      type: 'Comportamiento exponencial',
      explanation: 'Las funciones exponenciales crecen muy rápidamente al infinito'
    });
  }
  
  // Check for rational functions
  if (expression.includes('/') && expression.includes('pow(')) {
    specialCases.push({
      type: 'Función racional',
      explanation: 'Las funciones racionales pueden tener límites finitos o infinitos dependiendo de los grados del numerador y denominador'
    });
  }
  
  return { specialCases };
};

// Check for discontinuities
export const findDiscontinuities = (expression, variable = 'x') => {
  try {
    const parsedExpr = parseFunction(expression);
    const discontinuities = [];
    
    // Check for division by zero
    const denominator = findDenominator(parsedExpr);
    if (denominator) {
      // For simple cases, try to find zeros by evaluating at common points
      const commonPoints = [-10, -5, -2, -1, 0, 1, 2, 5, 10];
      for (const point of commonPoints) {
        try {
          const result = math.evaluate(denominator, { [variable]: point });
          if (Math.abs(result) < 0.001) { // Close to zero
            discontinuities.push({ type: 'vertical asymptote', point: point });
          }
        } catch (e) {
          // Skip points where evaluation fails
        }
      }
    }
    
    // Check for log domain issues
    if (parsedExpr.includes('log')) {
      const logArg = extractLogArgument(parsedExpr);
      if (logArg) {
        // For log functions, check where argument equals zero
        const commonPoints = [-10, -5, -2, -1, 0, 1, 2, 5, 10];
        for (const point of commonPoints) {
          try {
            const result = math.evaluate(logArg, { [variable]: point });
            if (Math.abs(result) < 0.001) { // Close to zero
              discontinuities.push({ type: 'log domain', point: point });
            }
          } catch (e) {
            // Skip points where evaluation fails
          }
        }
      }
    }
    
    return discontinuities;
  } catch (error) {
    console.warn('Error finding discontinuities:', error);
    return [];
  }
};

// Helper function to find denominator
const findDenominator = (expression) => {
  // Simple regex to find division patterns
  const divisionMatch = expression.match(/\/([^+\-*/()]+)/);
  return divisionMatch ? divisionMatch[1] : null;
};

// Helper function to extract log argument
const extractLogArgument = (expression) => {
  const logMatch = expression.match(/log\(([^)]+)\)/);
  return logMatch ? logMatch[1] : null;
};

// Generate points for plotting
export const generatePlotPoints = (expression, xMin = -10, xMax = 10, points = 1000) => {
  try {
    const parsedExpr = parseFunction(expression);
    const xValues = [];
    const yValues = [];
    
    for (let i = 0; i < points; i++) {
      const x = xMin + (xMax - xMin) * i / (points - 1);
      try {
        const y = math.evaluate(parsedExpr, { x });
        if (isFinite(y) && !isNaN(y)) {
          xValues.push(x);
          yValues.push(y);
        }
      } catch (error) {
        // Skip points where function is undefined
        continue;
      }
    }
    
    return { x: xValues, y: yValues };
  } catch (error) {
    throw new Error(`Error generating plot points: ${error.message}`);
  }
};

// Format mathematical expression for display
export const formatExpression = (expression) => {
  return expression
    .replace(/pow\(([^,]+),([^)]+)\)/g, '$1^$2')  // Convert pow(x,y) back to x^y
    .replace(/log10\(/g, 'log(')
    .replace(/log\(/g, 'ln(')
    .replace(/asin\(/g, 'arcsin(')
    .replace(/acos\(/g, 'arccos(')
    .replace(/atan\(/g, 'arctan(');
}; 

// Calculate limit using epsilon-delta definition
export const calculateLimitEpsilonDelta = (expression, variable = 'x', point = '0', epsilon = '0.1') => {
  try {
    const parsedExpr = parseFunction(expression);
    const steps = [];
    
    // Add initial step
    steps.push({
      step: 1,
      description: 'Definición ε-δ del límite',
      expression: `Para todo ε > 0, existe δ > 0 tal que si 0 < |x - ${point}| < δ, entonces |f(x) - L| < ε`,
      explanation: 'Esta es la definición formal de límite. Queremos encontrar un δ para cada ε dado.'
    });
    
    // Add function step
    steps.push({
      step: 2,
      description: 'Función a analizar',
      expression: formatExpression(expression),
      explanation: 'Esta es la función para la cual queremos demostrar el límite'
    });
    
    // Calculate the limit value first
    let limitValue;
    if (point === 'infinity') {
      limitValue = math.evaluate(parsedExpr, { [variable]: 1e10 });
    } else if (point === '-infinity') {
      limitValue = math.evaluate(parsedExpr, { [variable]: -1e10 });
    } else {
      limitValue = math.evaluate(parsedExpr, { [variable]: parseFloat(point) });
    }
    
    steps.push({
      step: 3,
      description: 'Valor del límite',
      expression: `L = ${limitValue}`,
      explanation: 'Calculamos el valor al que tiende la función'
    });
    
    // Add epsilon value
    const epsilonValue = parseFloat(epsilon);
    steps.push({
      step: 4,
      description: 'Valor de ε dado',
      expression: `ε = ${epsilonValue}`,
      explanation: 'Este es el margen de error que aceptamos'
    });
    
    // Find delta using numerical approach
    const delta = findDeltaForEpsilon(parsedExpr, variable, parseFloat(point), limitValue, epsilonValue);
    
    steps.push({
      step: 5,
      description: 'Cálculo de δ',
      expression: `δ = ${delta.toFixed(6)}`,
      explanation: `Para ε = ${epsilonValue}, encontramos que δ = ${delta.toFixed(6)} satisface la definición`
    });
    
    // Verification step
    const verification = verifyEpsilonDelta(parsedExpr, variable, parseFloat(point), limitValue, delta, epsilonValue);
    
    steps.push({
      step: 6,
      description: 'Verificación',
      expression: verification.expression,
      explanation: verification.explanation
    });
    
    return {
      result: `L = ${limitValue}, δ = ${delta.toFixed(6)} para ε = ${epsilonValue}`,
      steps: steps,
      epsilon: epsilonValue,
      delta: delta,
      limitValue: limitValue
    };
  } catch (error) {
    throw new Error(`Error calculating epsilon-delta limit: ${error.message}`);
  }
};

// Helper function to find delta for given epsilon
const findDeltaForEpsilon = (expression, variable, point, limitValue, epsilon) => {
  // Start with a small delta and increase until we find one that works
  let delta = 0.001;
  const maxIterations = 1000;
  
  for (let i = 0; i < maxIterations; i++) {
    // Test points within delta distance from the limit point
    const testPoints = [
      point - delta,
      point - delta/2,
      point + delta/2,
      point + delta
    ];
    
    let allPointsValid = true;
    
    for (const testPoint of testPoints) {
      try {
        const functionValue = math.evaluate(expression, { [variable]: testPoint });
        const difference = Math.abs(functionValue - limitValue);
        
        if (difference >= epsilon) {
          allPointsValid = false;
          break;
        }
      } catch (e) {
        // If evaluation fails, this delta is too large
        allPointsValid = false;
        break;
      }
    }
    
    if (allPointsValid) {
      return delta;
    }
    
    delta *= 0.9; // Reduce delta and try again
  }
  
  // If we can't find a suitable delta, return a very small value
  return 0.000001;
};

// Helper function to verify epsilon-delta condition
const verifyEpsilonDelta = (expression, variable, point, limitValue, delta, epsilon) => {
  const testPoints = [
    point - delta,
    point - delta/2,
    point + delta/2,
    point + delta
  ];
  
  const results = [];
  
  for (const testPoint of testPoints) {
    try {
      const functionValue = math.evaluate(expression, { [variable]: testPoint });
      const difference = Math.abs(functionValue - limitValue);
      results.push({
        x: testPoint,
        f_x: functionValue,
        difference: difference,
        valid: difference < epsilon
      });
    } catch (e) {
      results.push({
        x: testPoint,
        f_x: 'indefinido',
        difference: 'N/A',
        valid: false
      });
    }
  }
  
  const validCount = results.filter(r => r.valid).length;
  const totalCount = results.length;
  
  return {
    expression: `${validCount}/${totalCount} puntos verifican |f(x) - L| < ε`,
    explanation: `De los puntos probados, ${validCount} de ${totalCount} satisfacen la condición |f(x) - ${limitValue}| < ${epsilon}`
  };
}; 