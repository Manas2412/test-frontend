// BaseNode.js - Abstract base component for all nodes

import { useState } from 'react';
import { Handle, Position } from 'reactflow';
import { useStore } from '../store';

/**
 * BaseNode - A reusable abstraction for creating ReactFlow nodes
 * 
 * @param {string} id - Unique identifier for the node
 * @param {object} data - Node data object
 * @param {string} title - Display title for the node
 * @param {array} inputHandles - Array of input handle configurations
 *   [{ id: string, position: Position, style?: object, label?: string }]
 * @param {array} outputHandles - Array of output handle configurations
 *   [{ id: string, position: Position, style?: object, label?: string }]
 * @param {ReactNode} children - Custom content to render inside the node
 * @param {object} style - Additional inline styles for the node container
 * @param {string} className - Additional CSS class name
 */
export const BaseNode = ({ 
  id, 
  data, 
  title, 
  inputHandles = [], 
  outputHandles = [], 
  children,
  style = {},
  className = ''
}) => {
  const deleteNode = useStore((state) => state.deleteNode);
  const [isHovered, setIsHovered] = useState(false);

  const handleDelete = (e) => {
    e.stopPropagation();
    deleteNode(id);
  };

  const baseStyle = {
    width: '208px',
    minHeight: '80px',
    backgroundColor: 'rgba(30, 41, 59, 0.95)',
    borderRadius: '0.5rem',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.3)',
    border: '1px solid rgba(148, 163, 184, 0.2)',
    padding: '12px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    transition: 'box-shadow 0.2s',
    backdropFilter: 'blur(10px)',
    boxSizing: 'border-box',
    overflow: 'visible',
    position: 'relative',
    ...style
  };

  return (
    <div 
      className={`w-52 min-h-20 bg-white rounded-lg shadow-md border border-gray-200 p-3 flex flex-col gap-2 hover:shadow-lg transition-shadow duration-200 ${className}`}
      style={baseStyle}
      onMouseEnter={(e) => {
        setIsHovered(true);
        e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(99, 102, 241, 0.3), 0 4px 6px -2px rgba(139, 92, 246, 0.2)';
        e.currentTarget.style.borderColor = 'rgba(139, 92, 246, 0.4)';
      }}
      onMouseLeave={(e) => {
        setIsHovered(false);
        e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.3)';
        e.currentTarget.style.borderColor = 'rgba(148, 163, 184, 0.2)';
      }}
    >
      {/* Delete Button */}
      <button
        onClick={handleDelete}
        style={{
          position: 'absolute',
          top: '4px',
          right: '4px',
          width: '20px',
          height: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '50%',
          backgroundColor: '#ef4444',
          color: 'white',
          fontSize: '14px',
          fontWeight: 'bold',
          lineHeight: '1',
          border: 'none',
          cursor: 'pointer',
          transition: 'all 0.2s',
          zIndex: 20,
          padding: 0,
          opacity: isHovered ? 1 : 0.7,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#dc2626';
          e.currentTarget.style.transform = 'scale(1.1)';
          e.currentTarget.style.opacity = '1';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = '#ef4444';
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.opacity = isHovered ? '1' : '0.7';
        }}
        title="Delete node"
      >
        ×
      </button>

      {/* Input Handles */}
      {inputHandles.map((handle, index) => {
        const position = handle.position || Position.Left;
        // Calculate offset to make handle half inside and half outside (6px = half of 12px handle width)
        const handleStyle = {
          backgroundColor: '#8b5cf6',
          border: '2px solid rgba(30, 41, 59, 0.95)',
          width: '12px',
          height: '12px',
          ...handle.style
        };
        
        // Adjust positioning based on handle position
        if (position === Position.Left) {
          handleStyle.left = '-6px';
        } else if (position === Position.Right) {
          handleStyle.right = '-6px';
        } else if (position === Position.Top) {
          handleStyle.top = '-6px';
        } else if (position === Position.Bottom) {
          handleStyle.bottom = '-6px';
        }
        
        return (
          <Handle
            key={`input-${handle.id || index}`}
            type="target"
            position={position}
            id={handle.id || `input-${index}`}
            className="!bg-primary-500 !border-2 !border-white !w-3 !h-3 hover:!bg-primary-600"
            style={handleStyle}
          />
        );
      })}

      {/* Title Section */}
      {title && (
        <div className="font-semibold text-sm text-gray-800 mb-1 border-b border-gray-100 pb-1" style={{ fontWeight: '600', fontSize: '0.875rem', color: '#e2e8f0', marginBottom: '4px', borderBottom: '1px solid rgba(148, 163, 184, 0.2)', paddingBottom: '4px' }}>
          <span>{title}</span>
        </div>
      )}

      {/* Custom Content */}
      {children}

      {/* Output Handles */}
      {outputHandles.map((handle, index) => {
        const position = handle.position || Position.Right;
        // Calculate offset to make handle half inside and half outside (6px = half of 12px handle width)
        const handleStyle = {
          backgroundColor: '#8b5cf6',
          border: '2px solid rgba(30, 41, 59, 0.95)',
          width: '12px',
          height: '12px',
          ...handle.style
        };
        
        // Adjust positioning based on handle position
        if (position === Position.Left) {
          handleStyle.left = '-6px';
        } else if (position === Position.Right) {
          handleStyle.right = '-6px';
        } else if (position === Position.Top) {
          handleStyle.top = '-6px';
        } else if (position === Position.Bottom) {
          handleStyle.bottom = '-6px';
        }
        
        return (
          <Handle
            key={`output-${handle.id || index}`}
            type="source"
            position={position}
            id={handle.id || `output-${index}`}
            className="!bg-primary-500 !border-2 !border-white !w-3 !h-3 hover:!bg-primary-600"
            style={handleStyle}
          />
        );
      })}
    </div>
  );
};

