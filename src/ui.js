// ui.js
// Displays the drag-and-drop UI
// --------------------------------------------------

import { useState, useRef, useCallback } from 'react';
import ReactFlow, { Controls, Background, MiniMap } from 'reactflow';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import { InputNode } from './nodes/inputNode';
import { LLMNode } from './nodes/llmNode';
import { OutputNode } from './nodes/outputNode';
import { TextNode } from './nodes/textNode';
import { CalculatorNode } from './nodes/calculatorNode';
import { ConditionNode } from './nodes/conditionNode';
import { TransformNode } from './nodes/transformNode';
import { DelayNode } from './nodes/delayNode';
import { MergeNode } from './nodes/mergeNode';

import 'reactflow/dist/style.css';

const gridSize = 20;
const proOptions = { hideAttribution: true };
const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
  calculator: CalculatorNode,
  condition: ConditionNode,
  transform: TransformNode,
  delay: DelayNode,
  merge: MergeNode,
};

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

export const PipelineUI = () => {
    const reactFlowWrapper = useRef(null);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    const {
      nodes,
      edges,
      getNodeID,
      addNode,
      onNodesChange,
      onEdgesChange,
      onConnect
    } = useStore(selector, shallow);

    const getInitNodeData = (nodeID, type) => {
      let nodeData = { id: nodeID, nodeType: `${type}` };
      return nodeData;
    }

    const onDrop = useCallback(
        (event) => {
          event.preventDefault();
    
          const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
          if (event?.dataTransfer?.getData('application/reactflow')) {
            const appData = JSON.parse(event.dataTransfer.getData('application/reactflow'));
            const type = appData?.nodeType;
      
            // check if the dropped element is valid
            if (typeof type === 'undefined' || !type) {
              return;
            }
      
            const position = reactFlowInstance.project({
              x: event.clientX - reactFlowBounds.left,
              y: event.clientY - reactFlowBounds.top,
            });

            const nodeID = getNodeID(type);
            const newNode = {
              id: nodeID,
              type,
              position,
              data: getInitNodeData(nodeID, type),
            };
      
            addNode(newNode);
          }
        },
        [reactFlowInstance]
    );

    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    return (
        <>
        <div 
            ref={reactFlowWrapper} 
            className="w-full h-full"
            style={{
                background: 'radial-gradient(circle at center, rgba(168, 85, 247, 0.4) 0%, rgba(139, 92, 246, 0.25) 25%, rgba(99, 102, 241, 0.15) 50%, rgba(67, 56, 202, 0.1) 75%, rgba(30, 27, 75, 0.95) 100%)'
            }}
        >
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onDrop={onDrop}
                onDragOver={onDragOver}
                onInit={setReactFlowInstance}
                nodeTypes={nodeTypes}
                proOptions={proOptions}
                snapGrid={[gridSize, gridSize]}
                connectionLineType='smoothstep'
                connectionMode="loose"
                defaultEdgeOptions={{
                    style: { 
                        strokeWidth: 2, 
                        stroke: '#8b5cf6',
                        pointerEvents: 'stroke'
                    },
                    animated: true,
                    deletable: true,
                    focusable: false,
                }}
                nodesDraggable={true}
                nodesConnectable={true}
                elementsSelectable={true}
                selectNodesOnDrag={false}
                deleteKeyCode="Delete"
                multiSelectionKeyCode="Shift"
            >
                <Background color="rgba(148, 163, 184, 0.1)" gap={gridSize} />
                <Controls 
                    className="bg-gradient-to-br from-[#2a2a3e]/90 to-[#1a1a2e]/90 border-2 border-[#3a3a4e]/60 rounded-lg shadow-lg backdrop-blur-md" 
                />
                <MiniMap 
                    className="bg-gradient-to-br from-[#2a2a3e]/90 to-[#1a1a2e]/90 border-2 border-[#3a3a4e]/60 rounded-lg shadow-lg backdrop-blur-md"
                    nodeColor={(node) => {
                        const colorMap = {
                            customInput: '#6366f1',
                            customOutput: '#10b981',
                            llm: '#a855f7',
                            text: '#fbbf24',
                            calculator: '#06b6d4',
                            condition: '#f97316',
                            transform: '#ec4899',
                            delay: '#10b981',
                            merge: '#f43f5e',
                        };
                        return colorMap[node.type] || '#8b5cf6';
                    }}
                />
            </ReactFlow>
        </div>
        </>
    )
}
