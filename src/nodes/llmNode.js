// llmNode.js

import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const LLMNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      data={data}
      title="LLM"
      inputHandles={[
        { id: `${id}-system`, position: Position.Left, style: { top: `${100/3}%` } },
        { id: `${id}-prompt`, position: Position.Left, style: { top: `${200/3}%` } }
      ]}
      outputHandles={[
        { id: `${id}-response`, position: Position.Right }
      ]}
      className="bg-purple-50 border-purple-200"
      style={{ backgroundColor: 'rgba(88, 28, 135, 0.3)', borderColor: 'rgba(168, 85, 247, 0.4)' }}
    >
      <div className="text-xs text-gray-600 italic" style={{ fontSize: '0.75rem', color: '#cbd5e1', fontStyle: 'italic' }}>
        <span>This is a LLM.</span>
      </div>
    </BaseNode>
  );
}
