// mergeNode.js

import { useState } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const MergeNode = ({ id, data }) => {
  const [mergeType, setMergeType] = useState(data?.mergeType || 'concat');
  const [separator, setSeparator] = useState(data?.separator || ', ');

  const handleMergeTypeChange = (e) => {
    setMergeType(e.target.value);
  };

  const handleSeparatorChange = (e) => {
    setSeparator(e.target.value);
  };

  return (
    <BaseNode
      id={id}
      data={data}
      title="Merge"
      inputHandles={[
        { id: `${id}-input1`, position: Position.Left, style: { top: '25%' } },
        { id: `${id}-input2`, position: Position.Left, style: { top: '50%' } },
        { id: `${id}-input3`, position: Position.Left, style: { top: '75%' } }
      ]}
      outputHandles={[
        { id: `${id}-output`, position: Position.Right }
      ]}
      className="bg-rose-50 border-rose-200 min-h-[120px]"
      style={{ backgroundColor: 'rgba(76, 5, 25, 0.3)', borderColor: 'rgba(244, 63, 94, 0.4)', minHeight: '120px' }}
    >
      <div className="flex flex-col gap-2" style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%', minWidth: 0 }}>
        <label className="flex gap-2 items-center text-xs text-gray-700" style={{ display: 'flex', gap: '8px', alignItems: 'center', fontSize: '0.75rem', color: '#e2e8f0', width: '100%', minWidth: 0 }}>
          <span className="font-medium w-12" style={{ fontWeight: '500', width: '48px', flexShrink: 0 }}>Type:</span>
          <select 
            value={mergeType} 
            onChange={handleMergeTypeChange} 
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
            <option value="concat">Concatenate</option>
            <option value="array">Array</option>
            <option value="object">Object</option>
            <option value="sum">Sum (Numbers)</option>
          </select>
        </label>
        {mergeType === 'concat' && (
          <label className="flex gap-2 items-center text-xs text-gray-700" style={{ display: 'flex', gap: '8px', alignItems: 'center', fontSize: '0.75rem', color: '#e2e8f0', width: '100%', minWidth: 0 }}>
            <span className="font-medium w-16" style={{ fontWeight: '500', width: '64px', flexShrink: 0 }}>Separator:</span>
            <input 
              type="text" 
              value={separator} 
              onChange={handleSeparatorChange}
              className="flex-1 px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              style={{ flex: 1, padding: '4px 8px', fontSize: '0.75rem', border: '1px solid rgba(148, 163, 184, 0.3)', borderRadius: '0.25rem', outline: 'none', backgroundColor: 'rgba(15, 23, 42, 0.6)', color: '#e2e8f0', minWidth: 0, maxWidth: '100%' }}
              placeholder=", "
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
        )}
        <div className="text-xs text-gray-600 mt-1 italic" style={{ fontSize: '0.75rem', color: '#cbd5e1', marginTop: '4px', fontStyle: 'italic' }}>
          Merges {mergeType === 'concat' ? 'with separator' : mergeType === 'array' ? 'into array' : mergeType === 'object' ? 'into object' : 'numerically'}
        </div>
      </div>
    </BaseNode>
  );
}

