// conditionNode.js

import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const ConditionNode = ({ id, data }) => {
  const [condition, setCondition] = useState(data?.condition || 'equals');
  const [value, setValue] = useState(data?.value || '');

  const handleConditionChange = (e) => {
    setCondition(e.target.value);
  };

  const handleValueChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <BaseNode
      id={id}
      data={data}
      title="Condition"
      inputHandles={[
        { id: `${id}-input`, position: Position.Left }
      ]}
      outputHandles={[
        { id: `${id}-true`, position: Position.Right, style: { top: '30%' } },
        { id: `${id}-false`, position: Position.Right, style: { top: '70%' } }
      ]}
      className="bg-orange-50 border-orange-200"
      style={{ backgroundColor: 'rgba(124, 45, 18, 0.3)', borderColor: 'rgba(249, 115, 22, 0.4)' }}
    >
      <div className="flex flex-col gap-2" style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%', minWidth: 0 }}>
        <label className="flex gap-2 items-center text-xs text-gray-700" style={{ display: 'flex', gap: '8px', alignItems: 'center', fontSize: '0.75rem', color: '#e2e8f0', width: '100%', minWidth: 0 }}>
          <span className="font-medium w-16" style={{ fontWeight: '500', width: '64px', flexShrink: 0 }}>Condition:</span>
          <select 
            value={condition} 
            onChange={handleConditionChange} 
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
            <option value="equals">Equals (==)</option>
            <option value="notEquals">Not Equals (!=)</option>
            <option value="greaterThan">Greater Than (&gt;)</option>
            <option value="lessThan">Less Than (&lt;)</option>
            <option value="contains">Contains</option>
          </select>
        </label>
        <label className="flex gap-2 items-center text-xs text-gray-700" style={{ display: 'flex', gap: '8px', alignItems: 'center', fontSize: '0.75rem', color: '#e2e8f0', width: '100%', minWidth: 0 }}>
          <span className="font-medium w-16" style={{ fontWeight: '500', width: '64px', flexShrink: 0 }}>Value:</span>
          <input 
            type="text" 
            value={value} 
            onChange={handleValueChange}
            className="flex-1 px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            style={{ flex: 1, padding: '4px 8px', fontSize: '0.75rem', border: '1px solid rgba(148, 163, 184, 0.3)', borderRadius: '0.25rem', outline: 'none', backgroundColor: 'rgba(15, 23, 42, 0.6)', color: '#e2e8f0', minWidth: 0, maxWidth: '100%' }}
            placeholder="Compare value"
            onFocus={(e) => {
              e.target.style.borderColor = '#8b5cf6';
              e.target.style.boxShadow = '0 0 0 2px rgba(139, 92, 246, 0.3)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = 'rgba(148, 163, 184, 0.3)';
              e.target.style.boxShadow = 'none';
            }}
          />
        </label>
        <div className="text-xs text-gray-600 mt-1 flex justify-between" style={{ fontSize: '0.75rem', color: '#cbd5e1', marginTop: '4px', display: 'flex', justifyContent: 'space-between' }}>
          <span className="text-green-600 font-medium" style={{ color: '#34d399', fontWeight: '500' }}>True →</span>
          <span className="text-red-600 font-medium" style={{ color: '#f87171', fontWeight: '500' }}>False →</span>
        </div>
      </div>
    </BaseNode>
  );
}

