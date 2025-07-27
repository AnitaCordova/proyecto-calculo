import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import { generatePlotPoints, findDiscontinuities } from '../utils/calculus';

const FunctionGraph = ({ functionInput, xMin = -10, xMax = 10, yMin = -10, yMax = 10 }) => {
  const [plotData, setPlotData] = useState(null);
  const [discontinuities, setDiscontinuities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!functionInput.trim()) {
      setPlotData(null);
      setDiscontinuities([]);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Generate main function plot
      const points = generatePlotPoints(functionInput, xMin, xMax);
      
      // Find discontinuities
      const disc = findDiscontinuities(functionInput);
      setDiscontinuities(disc);

      // Create plot data
      const data = [
        {
          x: points.x,
          y: points.y,
          type: 'scatter',
          mode: 'lines',
          name: 'f(x)',
          line: { color: '#3b82f6', width: 2 },
          hovertemplate: 'x: %{x}<br>y: %{y}<extra></extra>'
        }
      ];

      // Add vertical asymptotes for discontinuities
      disc.forEach((disc, index) => {
        if (disc.type === 'vertical asymptote') {
          data.push({
            x: [disc.point, disc.point],
            y: [yMin, yMax],
            type: 'scatter',
            mode: 'lines',
            name: `Asymptote ${index + 1}`,
            line: { color: '#ef4444', width: 1, dash: 'dash' },
            showlegend: false,
            hovertemplate: `x = ${disc.point}<extra></extra>`
          });
        }
      });

      setPlotData(data);
    } catch (err) {
      setError(err.message);
      setPlotData(null);
    } finally {
      setLoading(false);
    }
  }, [functionInput, xMin, xMax, yMin, yMax]);

      const layout = {
      title: {
        text: 'Gráfica de la Función',
        font: { size: 16 }
      },
    xaxis: {
      title: 'x',
      range: [xMin, xMax],
      zeroline: true,
      zerolinecolor: '#d1d5db',
      gridcolor: '#e5e7eb'
    },
    yaxis: {
      title: 'y',
      range: [yMin, yMax],
      zeroline: true,
      zerolinecolor: '#d1d5db',
      gridcolor: '#e5e7eb'
    },
    plot_bgcolor: 'white',
    paper_bgcolor: 'white',
    margin: { l: 60, r: 30, t: 60, b: 60 },
    showlegend: true,
    legend: {
      x: 0.02,
      y: 0.98,
      bgcolor: 'rgba(255,255,255,0.8)',
      bordercolor: '#d1d5db',
      borderwidth: 1
    },
    hovermode: 'closest'
  };

  const config = {
    displayModeBar: true,
    displaylogo: false,
    modeBarButtonsToRemove: ['pan2d', 'lasso2d', 'select2d'],
    responsive: true
  };

        if (loading) {
        return (
          <div className="flex items-center justify-center h-64 bg-gray-50 rounded-lg">
            <div className="text-gray-500">Cargando gráfica...</div>
          </div>
        );
      }

      if (error) {
        return (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="text-red-700">Error al graficar la función: {error}</div>
          </div>
        );
      }

      if (!plotData) {
        return (
          <div className="flex items-center justify-center h-64 bg-gray-50 rounded-lg">
            <div className="text-gray-500">Ingresa una función para ver la gráfica</div>
          </div>
        );
      }

  return (
    <div className="space-y-4">
      <Plot
        data={plotData}
        layout={layout}
        config={config}
        style={{ width: '100%', height: '400px' }}
        useResizeHandler={true}
      />
      
              {discontinuities.length > 0 && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <h4 className="text-sm font-medium text-yellow-800 mb-2">Discontinuidades Encontradas:</h4>
            <ul className="text-sm text-yellow-700 space-y-1">
              {discontinuities.map((disc, index) => (
                <li key={index}>
                  • {disc.type === 'vertical asymptote' ? 'Asíntota vertical' : 'Dominio del logaritmo'} en x = {disc.point}
                </li>
              ))}
            </ul>
          </div>
        )}
    </div>
  );
};

export default FunctionGraph; 