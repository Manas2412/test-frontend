// calculatorNode.js

import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const CalculatorNode = ({ id, data }) => {
  const [operation, setOperation] = useState(data?.operation || 'add');

  const handleOperationChange = (e) => {
    setOperation(e.target.value);
  };

  return (
    <BaseNode
      id={id}
      data={data}
      title="Calculator"
      inputHandles={[
        { id: `${id}-a`, position: Position.Left, style: { top: '30%' } },
        { id: `${id}-b`, position: Position.Left, style: { top: '70%' } }
      ]}
      outputHandles={[
        { id: `${id}-result`, position: Position.Right }
      ]}
      className="bg-cyan-50 border-cyan-200"
      style={{ backgroundColor: 'rgba(14, 116, 144, 0.3)', borderColor: 'rgba(6, 182, 212, 0.4)' }}
    >
      <div className="flex flex-col gap-2" style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%', minWidth: 0 }}>
        <label className="flex gap-2 items-center text-xs text-gray-700" style={{ display: 'flex', gap: '8px', alignItems: 'center', fontSize: '0.75rem', color: '#e2e8f0', width: '100%', minWidth: 0 }}>
          <span className="font-medium w-16" style={{ fontWeight: '500', width: '64px', flexShrink: 0 }}>Operation:</span>
          <select 
            value={operation} 
            onChange={handleOperationChange} 
            className="flex-1 px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
            style={{ flex: 1, padding: '4px 8px', fontSize: '0.75rem', border: '1px solid rgba(148, 163, 184, 0.3)', borderRadius: '0.25rem', backgroundColor: 'rgba(15, 23, 42, 0.8)', color: '#e2e8f0', outline: 'none', minWidth: 0, maxWidth: '100%' }}
            onFocus={(e) => {
              e.target.style.borderColor = '#8b5cf6';
              e.target.style.boxShadow = '0 0 0 2px rgba(139, 92, 246, 0.3)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = 'rgba(148, 163, 184, 0.3)';
              e.target.style.boxShadow = 'none';
            }}
          >
            <option value="add">Add (+)</option>
            <option value="subtract">Subtract (-)</option>
            <option value="multiply">Multiply (×)</option>
            <option value="divide">Divide (÷)</option>
          </select>
        </label>
        <div className="text-xs text-gray-600 mt-1 italic" style={{ fontSize: '0.75rem', color: '#cbd5e1', marginTop: '4px', fontStyle: 'italic' }}>
          Performs: a {operation === 'add' ? '+' : operation === 'subtract' ? '-' : operation === 'multiply' ? '×' : '÷'} b
        </div>
      </div>
    </BaseNode>
  );
}

