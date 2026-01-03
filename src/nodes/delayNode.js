// delayNode.js

import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const DelayNode = ({ id, data }) => {
  const [delay, setDelay] = useState(data?.delay || 1000);
  const [unit, setUnit] = useState(data?.unit || 'ms');

  const handleDelayChange = (e) => {
    setDelay(e.target.value);
  };

  const handleUnitChange = (e) => {
    setUnit(e.target.value);
  };

  return (
    <BaseNode
      id={id}
      data={data}
      title="Delay"
      inputHandles={[
        { id: `${id}-input`, position: Position.Left }
      ]}
      outputHandles={[
        { id: `${id}-output`, position: Position.Right }
      ]}
      className="bg-emerald-50 border-emerald-200"
      style={{ backgroundColor: 'rgba(5, 46, 22, 0.3)', borderColor: 'rgba(34, 197, 94, 0.4)' }}
    >
      <div className="flex flex-col gap-2" style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%', minWidth: 0 }}>
        <label className="flex gap-2 items-center text-xs text-gray-700" style={{ display: 'flex', gap: '8px', alignItems: 'center', fontSize: '0.75rem', color: '#e2e8f0', width: '100%', minWidth: 0 }}>
          <span className="font-medium w-12" style={{ fontWeight: '500', width: '48px', flexShrink: 0 }}>Delay:</span>
          <input 
            type="number" 
            value={delay} 
            onChange={handleDelayChange}
            className="flex-1 px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            style={{ flex: 1, padding: '4px 8px', fontSize: '0.75rem', border: '1px solid rgba(148, 163, 184, 0.3)', borderRadius: '0.25rem', outline: 'none', backgroundColor: 'rgba(15, 23, 42, 0.6)', color: '#e2e8f0', minWidth: 0, maxWidth: '100%' }}
            min="0"
            onFocus={(e) => {
              e.target.style.borderColor = '#8b5cf6';
              e.target.style.boxShadow = '0 0 0 2px rgba(139, 92, 246, 0.3)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = 'rgba(148, 163, 184, 0.3)';
              e.target.style.boxShadow = 'none';
            }}
          />
          <select 
            value={unit} 
            onChange={handleUnitChange} 
            className="w-16 px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
            style={{ width: '64px', padding: '4px 8px', fontSize: '0.75rem', border: '1px solid rgba(148, 163, 184, 0.3)', borderRadius: '0.25rem', backgroundColor: 'rgba(15, 23, 42, 0.8)', color: '#e2e8f0', outline: 'none', flexShrink: 0 }}
            onFocus={(e) => {
              e.target.style.borderColor = '#8b5cf6';
              e.target.style.boxShadow = '0 0 0 2px rgba(139, 92, 246, 0.3)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = 'rgba(148, 163, 184, 0.3)';
              e.target.style.boxShadow = 'none';
            }}
          >
            <option value="ms">ms</option>
            <option value="s">s</option>
            <option value="m">min</option>
          </select>
        </label>
        <div className="text-xs text-gray-600 mt-1 italic" style={{ fontSize: '0.75rem', color: '#cbd5e1', marginTop: '4px', fontStyle: 'italic' }}>
          Waits {delay} {unit} before passing through
        </div>
      </div>
    </BaseNode>
  );
}

