// store.js

import { create } from "zustand";
import {
    addEdge,
    applyNodeChanges,
    applyEdgeChanges,
    MarkerType,
  } from 'reactflow';

export const useStore = create((set, get) => ({
    nodes: [],
    edges: [],
    getNodeID: (type) => {
        const newIDs = {...get().nodeIDs};
        if (newIDs[type] === undefined) {
            newIDs[type] = 0;
        }
        newIDs[type] += 1;
        set({nodeIDs: newIDs});
        return `${type}-${newIDs[type]}`;
    },
    addNode: (node) => {
        set({
            nodes: [...get().nodes, node]
        });
    },
    onNodesChange: (changes) => {
      set({
        nodes: applyNodeChanges(changes, get().nodes),
      });
    },
    onEdgesChange: (changes) => {
      set({
        edges: applyEdgeChanges(changes, get().edges),
      });
    },
    onConnect: (connection) => {
      const currentEdges = get().edges;
      
      // Remove existing edges from the same source handle to allow replacement
      const filteredEdges = currentEdges.filter(
        (edge) => !(edge.source === connection.source && edge.sourceHandle === connection.sourceHandle)
      );
      
      set({
        edges: addEdge({
          ...connection, 
          type: 'smoothstep', 
          animated: true, 
          style: { 
            strokeWidth: 2, 
            stroke: '#8b5cf6',
            pointerEvents: 'stroke' // Only allow interaction when clicking directly on the edge
          },
          markerEnd: {
            type: MarkerType.Arrow, 
            height: '20px', 
            width: '20px',
            color: '#8b5cf6'
          },
          deletable: true,
          focusable: false
        }, filteredEdges),
      });
    },
    updateNodeField: (nodeId, fieldName, fieldValue) => {
      set({
        nodes: get().nodes.map((node) => {
          if (node.id === nodeId) {
            node.data = { ...node.data, [fieldName]: fieldValue };
          }
  
          return node;
        }),
      });
    },
    updateNodeDimensions: (nodeId, width, height) => {
      set({
        nodes: get().nodes.map((node) => {
          if (node.id === nodeId) {
            return { ...node, width, height };
          }
          return node;
        }),
      });
    },
    deleteNode: (nodeId) => {
      const currentNodes = get().nodes;
      const currentEdges = get().edges;
      
      // Remove the node
      const filteredNodes = currentNodes.filter((node) => node.id !== nodeId);
      
      // Remove all edges connected to this node
      const filteredEdges = currentEdges.filter(
        (edge) => edge.source !== nodeId && edge.target !== nodeId
      );
      
      set({
        nodes: filteredNodes,
        edges: filteredEdges,
      });
    },
  }));
