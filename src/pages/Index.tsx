import ModuleTabs from '@/components/ModuleTabs';
import ChatBot from '@/components/ChatBot';

const Index = () => {
  return (
    <div className="min-h-screen p-5">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="text-center mb-8 animate-fade-in-down">
          <h1 className="text-5xl font-bold text-white mb-3 drop-shadow-lg">
            🎓 CampusAI
          </h1>
          <p className="text-xl text-white/90 font-light">
            Your intelligent campus companion for all student services
          </p>
        </header>

        {/* Main Interface */}
        <div className="grid lg:grid-cols-[1fr_400px] gap-8">
          <ModuleTabs />
          <ChatBot />
        </div>
      </div>
    </div>
  );
};

export default Index;
