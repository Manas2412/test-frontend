// draggableNode.js

export const DraggableNode = ({ type, label }) => {
    const onDragStart = (event, nodeType) => {
      const appData = { nodeType }
      event.target.style.cursor = 'grabbing';
      event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
      event.dataTransfer.effectAllowed = 'move';
    };
  
    return (
      <div
        onDragStart={(event) => onDragStart(event, type)}
        onDragEnd={(event) => (event.target.style.cursor = 'grab')}
        className="cursor-grab active:cursor-grabbing w-[85px] sm:w-[100px] h-12 sm:h-14 flex items-center justify-center flex-col rounded-lg bg-gradient-to-br from-indigo-500 via-purple-500 to-purple-600 text-white shadow-lg hover:shadow-xl hover:from-purple-600 hover:via-purple-500 hover:to-purple-400 hover:-translate-y-0.5 transition-all duration-200 border border-purple-400/30 flex-shrink-0"
        draggable
      >
          <span className="text-sm sm:text-base font-medium">{label}</span>
      </div>
    );
  };
  