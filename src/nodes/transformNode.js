// transformNode.js

import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const TransformNode = ({ id, data }) => {
  const [transformType, setTransformType] = useState(data?.transformType || 'uppercase');

  const handleTransformChange = (e) => {
    setTransformType(e.target.value);
  };

  const transformLabels = {
    uppercase: 'Uppercase',
    lowercase: 'Lowercase',
    capitalize: 'Capitalize',
    reverse: 'Reverse',
    trim: 'Trim',
    replace: 'Replace'
  };

  return (
    <BaseNode
      id={id}
      data={data}
      title="Transform"
      inputHandles={[
        { id: `${id}-input`, position: Position.Left }
      ]}
      outputHandles={[
        { id: `${id}-output`, position: Position.Right }
      ]}
      className="bg-pink-50 border-pink-200"
      style={{ backgroundColor: 'rgba(131, 24, 67, 0.3)', borderColor: 'rgba(236, 72, 153, 0.4)' }}
    >
      <div className="flex flex-col gap-2" style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%', minWidth: 0 }}>
        <label className="flex gap-2 items-center text-xs text-gray-700" style={{ display: 'flex', gap: '8px', alignItems: 'center', fontSize: '0.75rem', color: '#e2e8f0', width: '100%', minWidth: 0 }}>
          <span className="font-medium w-16" style={{ fontWeight: '500', width: '64px', flexShrink: 0 }}>Transform:</span>
          <select 
            value={transformType} 
            onChange={handleTransformChange} 
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
            {Object.entries(transformLabels).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </label>
        <div className="text-xs text-gray-600 mt-1 italic" style={{ fontSize: '0.75rem', color: '#cbd5e1', marginTop: '4px', fontStyle: 'italic' }}>
          Applies: {transformLabels[transformType]}
        </div>
      </div>
    </BaseNode>
  );
}

