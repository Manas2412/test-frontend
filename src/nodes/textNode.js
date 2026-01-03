// textNode.js

import { useState, useEffect, useRef } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';
import { useStore } from '../store';

// Function to validate JavaScript variable names
const isValidVariableName = (name) => {
  // JavaScript variable name rules:
  // - Must start with letter, underscore, or dollar sign
  // - Can contain letters, digits, underscore, or dollar sign
  // - Cannot be a reserved keyword (basic check)
  const jsReservedWords = ['break', 'case', 'catch', 'class', 'const', 'continue', 'debugger', 'default', 'delete', 'do', 'else', 'export', 'extends', 'finally', 'for', 'function', 'if', 'import', 'in', 'instanceof', 'new', 'return', 'super', 'switch', 'this', 'throw', 'try', 'typeof', 'var', 'void', 'while', 'with', 'yield', 'let', 'static', 'enum', 'implements', 'interface', 'package', 'private', 'protected', 'public'];
  
  if (!name || name.trim().length === 0) {
    return false;
  }
  
  // Check if it's a reserved word
  if (jsReservedWords.includes(name.toLowerCase())) {
    return false;
  }
  
  // Check if it starts with a valid character
  const firstChar = name[0];
  if (!/^[a-zA-Z_$]/.test(firstChar)) {
    return false;
  }
  
  // Check if all characters are valid
  if (!/^[a-zA-Z0-9_$]+$/.test(name)) {
    return false;
  }
  
  return true;
};

// Function to parse variables from text
const parseVariables = (text) => {
  if (!text) return [];
  
  // Match {{ variableName }} pattern
  const regex = /\{\{\s*([^}]+)\s*\}\}/g;
  const matches = [];
  let match;
  
  while ((match = regex.exec(text)) !== null) {
    const variableName = match[1].trim();
    if (isValidVariableName(variableName)) {
      matches.push(variableName);
    }
  }
  
  // Remove duplicates and return unique variable names
  return [...new Set(matches)];
};

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '');
  const [nodeHeight, setNodeHeight] = useState(null);
  const textareaRef = useRef(null);
  const updateNodeField = useStore((state) => state.updateNodeField);
  const updateNodeDimensions = useStore((state) => state.updateNodeDimensions);
  
  // Parse variables from text
  const variables = parseVariables(currText);
  
  // Update node data when text changes
  useEffect(() => {
    updateNodeField(id, 'text', currText);
  }, [currText, id, updateNodeField]);

  // Auto-resize textarea and update node dimensions
  useEffect(() => {
    if (textareaRef.current) {
      // Reset height to auto to get the correct scrollHeight
      textareaRef.current.style.height = 'auto';
      const scrollHeight = textareaRef.current.scrollHeight;
      
      // Set the new height
      const minHeight = 40; // Minimum height in pixels
      const newHeight = Math.max(minHeight, scrollHeight);
      textareaRef.current.style.height = `${newHeight}px`;
      
      // Calculate node dimensions
      // Base node padding: 12px top + 12px bottom = 24px
      // Title section: ~24px
      // Gap between elements: 8px
      // Textarea padding: 4px top + 4px bottom = 8px
      const basePadding = 24; // top + bottom padding
      const titleHeight = 24; // title section height
      const gap = 8; // gap between title and content
      const textareaPadding = 8; // textarea top + bottom padding
      
      const calculatedNodeHeight = basePadding + titleHeight + gap + newHeight + textareaPadding;
      const nodeWidth = 208; // Keep base width
      
      setNodeHeight(calculatedNodeHeight);
      
      // Update node dimensions in store
      updateNodeDimensions(id, nodeWidth, calculatedNodeHeight);
    }
  }, [currText, id, updateNodeDimensions]);

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
  };

  // Create input handles for each variable
  const inputHandles = variables.map((variable, index) => {
    // Distribute handles evenly on the left side
    const totalVariables = variables.length;
    const percentage = totalVariables === 1 ? 50 : (index + 1) * (100 / (totalVariables + 1));
    
    return {
      id: `${id}-${variable}`,
      position: Position.Left,
      style: { top: `${percentage}%` }
    };
  });

  return (
    <BaseNode
      id={id}
      data={data}
      title="Text"
      inputHandles={inputHandles}
      outputHandles={[
        { id: `${id}-output`, position: Position.Right }
      ]}
      className="bg-yellow-50 border-yellow-200"
      style={{ 
        backgroundColor: 'rgba(113, 63, 18, 0.3)', 
        borderColor: 'rgba(251, 191, 36, 0.4)'
      }}
    >
      <div>
        <label className="flex gap-2 items-start text-xs text-gray-700" style={{ display: 'flex', gap: '8px', alignItems: 'flex-start', fontSize: '0.75rem', color: '#e2e8f0' }}>
          <span className="font-medium w-12 flex-shrink-0" style={{ fontWeight: '500', width: '48px', flexShrink: 0, paddingTop: '4px' }}>Text:</span>
          <textarea 
            ref={textareaRef}
            value={currText} 
            onChange={handleTextChange}
            className="flex-1 px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none overflow-hidden"
            style={{ 
              flex: 1, 
              padding: '4px 8px', 
              fontSize: '0.75rem', 
              border: '1px solid rgba(148, 163, 184, 0.3)', 
              borderRadius: '0.25rem', 
              outline: 'none', 
              backgroundColor: 'rgba(15, 23, 42, 0.6)', 
              color: '#e2e8f0', 
              minWidth: 0, 
              maxWidth: '100%',
              minHeight: '40px',
              resize: 'none',
              overflow: 'hidden',
              fontFamily: 'inherit',
              lineHeight: '1.5',
            }}
            placeholder="{{input}}"
            onFocus={(e) => {
              e.target.style.borderColor = '#8b5cf6';
              e.target.style.boxShadow = '0 0 0 2px rgba(139, 92, 246, 0.3)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = 'rgba(148, 163, 184, 0.3)';
              e.target.style.boxShadow = 'none';
            }}
            rows={1}
          />
        </label>
      </div>
    </BaseNode>
  );
}
