# Proyecto de Cálculo - Herramienta Interactiva

Una aplicación web interactiva para el cálculo de derivadas, límites y graficación de funciones matemáticas, desarrollada con React, Math.js y Plotly.js.

## 🚀 Características

### ✨ Funcionalidades Principales
- **Cálculo de Derivadas**: Calcula derivadas simbólicas con pasos detallados
- **Cálculo de Límites**: Evalúa límites en puntos finitos e infinitos
- **Graficación Interactiva**: Visualiza funciones con detección de discontinuidades
- **Pasos Paso a Paso**: Muestra el proceso completo de cálculo para mejor comprensión

### 📚 Pasos Educativos Detallados

#### Para Derivadas:
1. **Función Original**: Muestra la función ingresada
2. **Conversión de Notación**: Convierte a formato matemático estándar
3. **Identificación de Componentes**: Descompone la función en sus partes
4. **Reglas de Derivación**: Explica qué reglas se aplican
5. **Derivada Calculada**: Muestra el resultado de la derivación
6. **Simplificación**: Simplifica la expresión final (si es posible)

#### Para Límites:
1. **Función Original**: Muestra la función ingresada
2. **Conversión de Notación**: Convierte a formato matemático estándar
3. **Casos Especiales**: Identifica posibles problemas (división por cero, etc.)
4. **Evaluación**: Calcula el límite en el punto especificado
5. **Resultado Final**: Presenta el resultado final

## 🛠️ Tecnologías Utilizadas

- **React 18**: Framework de interfaz de usuario
- **Math.js**: Biblioteca para cálculos matemáticos simbólicos
- **Plotly.js**: Biblioteca para graficación interactiva
- **Tailwind CSS**: Framework de estilos
- **React Plotly.js**: Integración de Plotly con React

## 📦 Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/anitacordova/proyecto-calculo.git
cd proyecto-calculo
```

2. Instala las dependencias:
```bash
npm install
```

3. Ejecuta la aplicación:
```bash
npm start
```

La aplicación se abrirá en `http://localhost:3000`

## 🎯 Cómo Usar

### 1. Ingresa la Función
Usa notación matemática estándar:
- `x^2` para x²
- `sin(x)` para seno de x
- `cos(x)` para coseno de x
- `tan(x)` para tangente de x
- `ln(x)` para logaritmo natural
- `sqrt(x)` para raíz cuadrada
- `exp(x)` para e^x

### 2. Elige la Operación
- **Derivada**: Calcula la derivada de la función
- **Límite**: Evalúa el límite en un punto específico
- **Gráfica**: Visualiza la función

### 3. Ver Resultados
- **Resultado Simbólico**: Muestra la respuesta final
- **Pasos Detallados**: Haz clic en "Ver pasos" para ver el proceso completo
- **Gráfica Interactiva**: Visualiza la función con zoom y pan

## 📊 Ejemplos de Uso

### Derivada de x² + 2x + 1
1. Ingresa: `x^2 + 2x + 1`
2. Selecciona: Derivada
3. Resultado: `2x + 2`
4. Pasos: Verás cómo se aplican las reglas de derivación

### Límite de 1/x cuando x → ∞
1. Ingresa: `1/x`
2. Selecciona: Límite
3. Punto: `infinity`
4. Resultado: `0`
5. Pasos: Verás el análisis de casos especiales

## 🎨 Características de la Interfaz

- **Diseño Responsivo**: Funciona en dispositivos móviles y de escritorio
- **Tema Moderno**: Interfaz limpia y profesional
- **Animaciones Suaves**: Transiciones fluidas entre pasos
- **Código de Colores**: Diferentes colores para diferentes tipos de información

## 🔧 Desarrollo

### Estructura del Proyecto
```
src/
├── components/
│   ├── FunctionInput.js      # Entrada de funciones
│   ├── OperationSelector.js  # Selector de operaciones
│   ├── LimitInput.js         # Entrada de límites
│   ├── ResultDisplay.js      # Mostrar resultados
│   ├── StepByStepDisplay.js  # Mostrar pasos (NUEVO)
│   ├── FunctionGraph.js      # Graficación
│   └── WelcomeScreen.js      # Pantalla de bienvenida
├── utils/
│   └── calculus.js           # Funciones matemáticas
└── App.js                    # Componente principal
```

### Nuevas Funcionalidades Agregadas

#### Componente StepByStepDisplay
- Muestra los pasos del cálculo de manera organizada
- Botón expandible para mostrar/ocultar pasos
- Numeración clara de cada paso
- Explicaciones educativas de las reglas aplicadas

#### Funciones Mejoradas
- `calculateDerivative()`: Ahora devuelve pasos detallados
- `calculateLimit()`: Incluye análisis de casos especiales
- Funciones auxiliares para análisis educativo

## 🚀 Despliegue

Para desplegar en GitHub Pages:
```bash
npm run deploy
```

## 👨‍💻 Desarrollado por

**Ana Maria Córdova Jaramillo**

Materia de Cálculo - Universidad

## 📄 Licencia

Este proyecto es de uso educativo y académico.

---

¡Disfruta explorando las matemáticas de manera interactiva! 🧮✨ 