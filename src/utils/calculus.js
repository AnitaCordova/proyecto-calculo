import { create, all } from 'mathjs';
const math = create(all);

// Convert common function notation to math.js format
export const parseFunction = (input) => {
  let expression = input.toLowerCase()
    .replace(/ln\(/g, 'log(')  // Convert ln to log
    .replace(/log\(/g, 'log10(')  // Convert log to log10
    .replace(/sin\(/g, 'sin(')
    .replace(/cos\(/g, 'cos(')
    .replace(/tan\(/g, 'tan(')
    .replace(/sqrt\(/g, 'sqrt(')
    .replace(/abs\(/g, 'abs(')
    .replace(/exp\(/g, 'exp(');
  
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

// Calculate derivative symbolically with steps
export const calculateDerivative = (expression, variable = 'x') => {
  try {
    const parsedExpr = parseFunction(expression);
    const steps = [];
    
    // Add initial step
    steps.push({
      step: 1,
      description: 'Función original',
      expression: formatExpression(expression)
    });
    
    // Add parsing step
    steps.push({
      step: 2,
      description: 'Convertir notación matemática',
      expression: parsedExpr
    });
    
    // Analyze the expression to provide educational steps
    const analysis = analyzeExpression(parsedExpr);
    if (analysis.components.length > 1) {
      steps.push({
        step: 3,
        description: 'Identificar componentes de la función',
        expression: analysis.components.join(' + ')
      });
    }
    
    // Add derivative rules explanation
    if (analysis.rules.length > 0) {
      steps.push({
        step: 4,
        description: 'Aplicar reglas de derivación',
        expression: analysis.rules.join(', ')
      });
    }
    
    // Calculate derivative
    const derivative = math.derivative(parsedExpr, variable);
    
    // Add derivative step
    steps.push({
      step: 5,
      description: 'Derivada calculada',
      expression: derivative.toString()
    });
    
    // Simplify if possible
    let simplified = derivative;
    try {
      simplified = math.simplify(derivative);
      if (simplified.toString() !== derivative.toString()) {
        steps.push({
          step: 6,
          description: 'Simplificar expresión',
          expression: simplified.toString()
        });
      }
    } catch (e) {
      // If simplification fails, keep original derivative
    }
    
    return {
      result: simplified.toString(),
      steps: steps
    };
  } catch (error) {
    throw new Error(`Error calculating derivative: ${error.message}`);
  }
};

// Helper function to analyze expression for educational purposes
const analyzeExpression = (expression) => {
  const components = [];
  const rules = [];
  
  // Check for common patterns
  if (expression.includes('sin(')) {
    rules.push('Regla de la derivada del seno: d/dx[sin(x)] = cos(x)');
  }
  if (expression.includes('cos(')) {
    rules.push('Regla de la derivada del coseno: d/dx[cos(x)] = -sin(x)');
  }
  if (expression.includes('tan(')) {
    rules.push('Regla de la derivada de la tangente: d/dx[tan(x)] = sec²(x)');
  }
  if (expression.includes('log(')) {
    rules.push('Regla de la derivada del logaritmo: d/dx[ln(x)] = 1/x');
  }
  if (expression.includes('sqrt(')) {
    rules.push('Regla de la derivada de la raíz: d/dx[√x] = 1/(2√x)');
  }
  if (expression.includes('pow(')) {
    rules.push('Regla de la potencia: d/dx[x^n] = n·x^(n-1)');
  }
  if (expression.includes('*')) {
    rules.push('Regla del producto: d/dx[u·v] = u\'·v + u·v\'');
  }
  if (expression.includes('/')) {
    rules.push('Regla del cociente: d/dx[u/v] = (u\'·v - u·v\')/v²');
  }
  
  // Split by addition/subtraction to identify components
  const parts = expression.split(/(?<=[a-zA-Z0-9)])[\+\-]/);
  if (parts.length > 1) {
    components.push(...parts.filter(part => part.trim()));
  }
  
  return { components, rules };
};

// Calculate limit with steps
export const calculateLimit = (expression, variable = 'x', point = 'infinity') => {
  try {
    const parsedExpr = parseFunction(expression);
    const steps = [];
    
    // Add initial step
    steps.push({
      step: 1,
      description: 'Función original',
      expression: formatExpression(expression)
    });
    
    // Add parsing step
    steps.push({
      step: 2,
      description: 'Convertir notación matemática',
      expression: parsedExpr
    });
    
    // Analyze the expression for special cases
    const analysis = analyzeLimitExpression(parsedExpr, point);
    if (analysis.specialCases.length > 0) {
      steps.push({
        step: 3,
        description: 'Identificar casos especiales',
        expression: analysis.specialCases.join(', ')
      });
    }
    
    let limit;
    let limitDescription = '';
    
    if (point === 'infinity') {
      limitDescription = 'Evaluar límite cuando x → ∞';
      // For infinity limits, evaluate at very large numbers
      const largeValue = 1e10;
      limit = math.evaluate(parsedExpr, { [variable]: largeValue });
    } else if (point === '-infinity') {
      limitDescription = 'Evaluar límite cuando x → -∞';
      // For negative infinity limits, evaluate at very large negative numbers
      const largeNegativeValue = -1e10;
      limit = math.evaluate(parsedExpr, { [variable]: largeNegativeValue });
    } else {
      limitDescription = `Evaluar límite cuando x → ${point}`;
      // For finite limits, evaluate at the point
      limit = math.evaluate(parsedExpr, { [variable]: parseFloat(point) });
    }
    
    // Add evaluation step
    steps.push({
      step: 4,
      description: limitDescription,
      expression: limit.toString()
    });
    
    // Handle special cases
    let finalResult = limit.toString();
    if (Math.abs(limit) > 1e9) {
      finalResult = limit > 0 ? 'Infinity' : '-Infinity';
      steps.push({
        step: 5,
        description: 'Resultado final',
        expression: finalResult
      });
    }
    
    return {
      result: finalResult,
      steps: steps
    };
  } catch (error) {
    throw new Error(`Error calculating limit: ${error.message}`);
  }
};

// Helper function to analyze limit expression for educational purposes
const analyzeLimitExpression = (expression, point) => {
  const specialCases = [];
  
  // Check for division by zero
  if (expression.includes('/')) {
    specialCases.push('División por cero posible');
  }
  
  // Check for indeterminate forms
  if (point === 'infinity' || point === '-infinity') {
    if (expression.includes('log(')) {
      specialCases.push('Logaritmo de infinito');
    }
    if (expression.includes('sin(') || expression.includes('cos(')) {
      specialCases.push('Funciones trigonométricas en infinito');
    }
  }
  
  // Check for polynomial behavior
  if (expression.includes('pow(')) {
    specialCases.push('Comportamiento polinomial');
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
    .replace(/log\(/g, 'ln(');
}; 