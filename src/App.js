import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';

function App() {
  return (
    <div className="h-screen flex flex-col overflow-hidden bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f172a]">
      <PipelineToolbar />
      <div className="flex-1 min-h-0">
        <PipelineUI />
      </div>
      <SubmitButton />
    </div>
  );
}

export default App;
