// submit.js

import { useState, useEffect } from 'react';
import { useStore } from './store';

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
});

export const SubmitButton = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [response, setResponse] = useState(null);
    const { nodes, edges } = useStore(selector);

    // Auto-hide response after 10 seconds
    useEffect(() => {
        if (response) {
            const timer = setTimeout(() => {
                setResponse(null);
            }, 5000); // 5 seconds

            return () => clearTimeout(timer);
        }
    }, [response]);

    const handleSubmit = async () => {
        setIsLoading(true);
        setResponse(null); // Clear previous results immediately

        try {
            // Prepare the request payload
            const payload = {
                nodes: nodes,
                edges: edges
            };

            // Send request to backend
            const backendUrl = process.env.REACT_APP_BACKEND_URL;
            if (!backendUrl) {
                throw new Error('REACT_APP_BACKEND_URL environment variable is not set. Please configure the backend URL.');
            }
            
            // Create an AbortController for timeout
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
            
            try {
                const fetchResponse = await fetch(`${backendUrl}/pipelines/parse`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(payload),
                    signal: controller.signal,
                });

                clearTimeout(timeoutId);

                if (!fetchResponse.ok) {
                    throw new Error(`HTTP error! status: ${fetchResponse.status}`);
                }

                const data = await fetchResponse.json();
                
                // Show results in an alert
                alert(
                    `Pipeline Analysis Results:\n\n` +
                    `• Total Nodes: ${data.num_nodes}\n` +
                    `• Total Edges: ${data.num_edges}\n` +
                    `• DAG Status: ${data.is_dag ? '✓ This is a valid Directed Acyclic Graph' : '✗ This contains cycles (Not a DAG)'}`
                );
                
                setResponse(data);
            } catch (fetchError) {
                clearTimeout(timeoutId);
                throw fetchError;
            }
        } catch (error) {
            console.error('Error submitting pipeline:', error);
            
            let errorMessage = 'Failed to submit pipeline';
            
            if (error.name === 'AbortError') {
                errorMessage = 'Request timed out. Unable to connect to backend server.';
            } else if (error.name === 'TypeError' && (
                error.message.includes('fetch') || 
                error.message.includes('Failed to fetch') ||
                error.message.includes('NetworkError') ||
                error.message.includes('network')
            )) {
                errorMessage = 'Unable to connect to backend server. Please ensure the backend is running.';
            } else if (error.message) {
                errorMessage = error.message;
            }
            
            alert(`Error: ${errorMessage}`);
            
            setResponse({
                error: errorMessage
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center py-4 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#0f0f1a] via-[#0a0a15] to-[#0f0f1a] border-t-2 border-[#2a2a3e]/60 gap-4 overflow-visible box-border">
            <button 
                type="button"
                onClick={handleSubmit}
                disabled={isLoading}
                className={`
                    px-6 sm:px-8 py-3 text-white font-semibold rounded-lg shadow-lg
                    transition-all duration-200 transform
                    ${isLoading 
                        ? 'bg-gradient-to-br from-gray-500 via-gray-600 to-gray-400 opacity-60 cursor-not-allowed' 
                        : 'cursor-pointer'
                    }
                    focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-slate-900
                    disabled:opacity-60 disabled:cursor-not-allowed
                `}
                style={!isLoading ? {
                    background: 'linear-gradient(to right, #7c3aed 0%, #6366f1 50%, #3b82f6 100%)',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                } : {}}
                onMouseEnter={(e) => {
                    if (!isLoading) {
                        e.currentTarget.style.background = 'linear-gradient(to right, #8b5cf6 0%, #7c3aed 50%, #6366f1 100%)';
                        e.currentTarget.style.transform = 'scale(1.05)';
                        e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(124, 58, 237, 0.4), 0 4px 6px -2px rgba(99, 102, 241, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.15)';
                    }
                }}
                onMouseLeave={(e) => {
                    if (!isLoading) {
                        e.currentTarget.style.background = 'linear-gradient(to right, #7c3aed 0%, #6366f1 50%, #3b82f6 100%)';
                        e.currentTarget.style.transform = 'scale(1)';
                        e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)';
                    }
                }}
                onMouseDown={(e) => {
                    if (!isLoading) {
                        e.currentTarget.style.transform = 'scale(0.95)';
                    }
                }}
                onMouseUp={(e) => {
                    if (!isLoading) {
                        e.currentTarget.style.transform = 'scale(1.05)';
                    }
                }}
            >
                {isLoading ? 'Submitting...' : 'Submit Pipeline'}
            </button>

            
        </div>
    );
}
