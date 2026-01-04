// delayNode.js

import { useState, useEffect } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import { useStore } from '../store';

export const DelayNode = ({ id, data }) => {
  const [delay, setDelay] = useState(data?.delay || 1000);
  const [unit, setUnit] = useState(data?.unit || 'ms');
  const updateNodeField = useStore((state) => state.updateNodeField);

  const handleDelayChange = (e) => {
    const value = e.target.value;
    const numValue = value === '' ? 0 : Math.max(0, parseInt(value, 10) || 0);
    setDelay(numValue);
    updateNodeField(id, 'delay', numValue);
  };

  const handleIncrement = () => {
    const newValue = delay + (unit === 'ms' ? 100 : unit === 's' ? 1 : 60);
    setDelay(newValue);
    updateNodeField(id, 'delay', newValue);
  };

  const handleDecrement = () => {
    const newValue = Math.max(0, delay - (unit === 'ms' ? 100 : unit === 's' ? 1 : 60));
    setDelay(newValue);
    updateNodeField(id, 'delay', newValue);
  };

  const handleUnitChange = (e) => {
    const newUnit = e.target.value;
    setUnit(newUnit);
    updateNodeField(id, 'unit', newUnit);
  };

  useEffect(() => {
    updateNodeField(id, 'delay', delay);
    updateNodeField(id, 'unit', unit);
  }, [id, delay, unit, updateNodeField]);

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
      style={{ backgroundColor: 'rgba(5, 46, 22, 0.3)', borderColor: 'rgba(34, 197, 94, 0.4)', width: '280px' }}
    >
      <div className="flex flex-col gap-2" style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%', minWidth: 0, maxWidth: '100%', overflow: 'hidden' }}>
        <label className="flex gap-1.5 items-center text-xs text-gray-700" style={{ display: 'flex', gap: '6px', alignItems: 'center', fontSize: '0.75rem', color: '#e2e8f0', width: '100%', minWidth: 0, maxWidth: '100%' }}>
          <span className="font-medium" style={{ fontWeight: '500', flexShrink: 0, fontSize: '0.75rem' }}>Delay:</span>
          <div className="flex items-center gap-1" style={{ display: 'flex', alignItems: 'center', gap: '3px', flexShrink: 0 }}>
            <button
              type="button"
              onClick={handleDecrement}
              onMouseDown={(e) => e.preventDefault()}
              className="px-1 py-0.5 text-xs border border-gray-300 rounded hover:bg-gray-100 focus:outline-none"
              style={{ padding: '3px 5px', fontSize: '0.7rem', border: '1px solid rgba(148, 163, 184, 0.3)', borderRadius: '0.25rem', backgroundColor: 'rgba(15, 23, 42, 0.8)', color: '#e2e8f0', cursor: 'pointer', flexShrink: 0, minWidth: '20px', width: '20px', height: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              −
            </button>
            <input 
              type="number" 
              value={delay} 
              onChange={handleDelayChange}
              onWheel={(e) => e.target.blur()}
              className="px-1.5 py-0.5 text-xs border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              style={{ 
                width: '70px', 
                padding: '3px 6px', 
                fontSize: '0.7rem', 
                border: '1px solid rgba(148, 163, 184, 0.3)', 
                borderRadius: '0.25rem', 
                outline: 'none', 
                backgroundColor: 'rgba(15, 23, 42, 0.6)', 
                color: '#e2e8f0',
                WebkitAppearance: 'none',
                MozAppearance: 'textfield',
                height: '22px',
                boxSizing: 'border-box'
              }}
              min="0"
              step={unit === 'ms' ? 100 : unit === 's' ? 1 : 60}
              onFocus={(e) => {
                e.target.style.borderColor = '#8b5cf6';
                e.target.style.boxShadow = '0 0 0 2px rgba(139, 92, 246, 0.3)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(148, 163, 184, 0.3)';
                e.target.style.boxShadow = 'none';
              }}
            />
            <button
              type="button"
              onClick={handleIncrement}
              onMouseDown={(e) => e.preventDefault()}
              className="px-1 py-0.5 text-xs border border-gray-300 rounded hover:bg-gray-100 focus:outline-none"
              style={{ padding: '3px 5px', fontSize: '0.7rem', border: '1px solid rgba(148, 163, 184, 0.3)', borderRadius: '0.25rem', backgroundColor: 'rgba(15, 23, 42, 0.8)', color: '#e2e8f0', cursor: 'pointer', flexShrink: 0, minWidth: '20px', width: '20px', height: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              +
            </button>
          </div>
          <select 
            value={unit} 
            onChange={handleUnitChange} 
            className="px-1.5 py-0.5 text-xs border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
            style={{ width: '60px', padding: '3px 6px', fontSize: '0.7rem', border: '1px solid rgba(148, 163, 184, 0.3)', borderRadius: '0.25rem', backgroundColor: 'rgba(15, 23, 42, 0.8)', color: '#e2e8f0', outline: 'none', flexShrink: 0, height: '22px', boxSizing: 'border-box' }}
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

