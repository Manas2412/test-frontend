// toolbar.js

import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {

    const handleLogoClick = () => {
        window.open('https://vectorshift.ai/', '_blank', 'noopener,noreferrer');
    };

    return (
        <div className="bg-gradient-to-r from-[#0f0f1a] via-[#0a0a15] to-[#0f0f1a] border-b-2 border-[#2a2a3e]/60 shadow-lg relative">
            <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
                {/* VectorShift Logo - Absolute Left */}
                <div
                    onClick={handleLogoClick}
                    className="absolute left-4 sm:left-6 lg:left-8 top-1/2 -translate-y-1/2 cursor-pointer flex items-center gap-2 select-none flex-shrink-0 hover:opacity-80 transition-opacity duration-200"
                >
                    {/* VS Logo Square */}
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-[#6666FF] flex items-center justify-center">
                        <span className="text-white font-bold text-lg sm:text-xl">VS</span>
                    </div>
                    {/* VectorShift Text */}
                    <span className="text-[#8A8AFF] font-bold text-xl sm:text-2xl tracking-tight">
                        VectorShift
                    </span>
                </div>
                
                {/* Node Palette Section - Centered */}
                <div className="flex flex-col items-center w-full">
                    <div className="flex flex-col items-center w-full max-w-fit">
                        <h2 className="text-lg sm:text-xl font-semibold text-slate-200 mb-3">
                            Node Palette
                        </h2>
                        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 w-full">
                            <DraggableNode type='customInput' label='Input' />
                            <DraggableNode type='llm' label='LLM' />
                            <DraggableNode type='customOutput' label='Output' />
                            <DraggableNode type='text' label='Text' />
                            <DraggableNode type='calculator' label='Calculator' />
                            <DraggableNode type='condition' label='Condition' />
                            <DraggableNode type='transform' label='Transform' />
                            <DraggableNode type='delay' label='Delay' />
                            <DraggableNode type='merge' label='Merge' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
