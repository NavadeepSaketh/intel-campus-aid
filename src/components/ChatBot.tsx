import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Message {
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const aiResponses: Record<string, string> = {
  'library hours': "The library is open Mon-Thu 7am-2am, Fri 7am-10pm, Sat 9am-10pm, Sun 10am-2am. During finals week, we're open 24/7!",
  'dining': "We have several dining options: Main Cafeteria (7am-9pm), Food Court (11am-8pm), and various campus cafés. The main cafeteria offers all-you-can-eat meal plans!",
  'registration': "Class registration opens April 1st for Fall semester and November 1st for Spring. You can register online through the student portal or visit the Registrar's office (Mon-Fri 8am-5pm).",
  'events': "This week we have a Career Fair on Monday (10am-4pm), AI Healthcare lecture Wednesday (7pm), and outdoor Movie Night Friday (8pm). Check the events tab for more details!",
  'gym': "The Recreation Center is open Mon-Fri 6am-11pm, weekends 8am-10pm. It features a pool, gym, courts, and climbing wall. Just bring your student ID!",
  'financial aid': "Financial Aid office has walk-in hours Mon-Fri 9am-4pm. They offer FAFSA assistance, scholarship info, and payment plans. Many services are also available online 24/7.",
  'study space': "The library has silent study floors (3rd & 4th), bookable group study rooms, and a 24-hour study lounge on the ground floor. Graduate carrels are also available!",
  'food court': "Our food court includes Pizza Station, Asian Express, Grill & Go, and a Salad Bar. Open 11am-8pm daily, accepts dining dollars and cash.",
  'counseling': "Counseling Center is open Mon-Fri 8am-6pm. Health Services available Mon-Fri 8am-5pm. Both offer walk-ins and appointments for student support.",
  'parking': "Parking permits are required Mon-Fri 7am-5pm. Student lots are marked in blue. Evening and weekend parking is free in most lots. Permits available online or at Campus Safety."
};

const quickActions = [
  'What are the library hours?',
  'Where can I eat on campus?', 
  'How do I register for classes?',
  'Campus events this week?'
];

const ChatBot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "Welcome! I'm your Campus AI Assistant. I can help you with schedules, facilities, dining, library services, events, and administrative procedures. What would you like to know?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateAIResponse = (message: string): string => {
    const lowerMessage = message.toLowerCase();
    
    // Check for keyword matches
    for (const [key, response] of Object.entries(aiResponses)) {
      if (lowerMessage.includes(key)) {
        return response;
      }
    }
    
    // Default responses for common question patterns
    if (lowerMessage.includes('hours') || lowerMessage.includes('when') || lowerMessage.includes('time')) {
      return "I can help you with operating hours! Most campus facilities have different schedules. Could you specify which service you're asking about? (Library, dining, recreation center, etc.)";
    }
    
    if (lowerMessage.includes('where') || lowerMessage.includes('location')) {
      return "I can help you find campus locations! Most services are centrally located. Could you tell me what specific location you're looking for?";
    }
    
    if (lowerMessage.includes('how') || lowerMessage.includes('help')) {
      return "I'm here to help! I can assist with information about academic schedules, campus facilities, dining services, library resources, events, and administrative procedures. What specific area would you like to know about?";
    }
    
    return "Thanks for your question! I have information about campus schedules, facilities, dining, library services, events, and administrative procedures. Could you be more specific about what you'd like to know? You can also check the information modules on the left for detailed information.";
  };

  const handleSendMessage = async (messageText?: string) => {
    const text = messageText || inputValue.trim();
    if (!text) return;

    // Add user message
    const userMessage: Message = {
      text,
      sender: 'user',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    
    // Show typing indicator
    setIsTyping(true);
    
    // Simulate AI thinking delay
    setTimeout(() => {
      setIsTyping(false);
      const response = generateAIResponse(text);
      const botMessage: Message = {
        text: response,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="glass-card flex flex-col h-[600px] animate-fade-in-up animation-delay-300">
      {/* Header */}
      <div className="glass-button !rounded-t-3xl !rounded-b-none p-6 text-center">
        <h2 className="text-xl font-bold">🤖 Campus Assistant</h2>
        <p className="text-sm opacity-90 mt-1">Ask me anything about campus services!</p>
      </div>

      {/* Quick Actions */}
      <div className="p-4 border-b border-white/20">
        <div className="flex flex-wrap gap-2">
          {quickActions.map((action, index) => (
            <Button
              key={index}
              variant="ghost"
              size="sm"
              onClick={() => handleSendMessage(action)}
              className="quick-action text-xs"
            >
              {action.replace('?', '').replace('What are the ', '').replace('Where can I ', '').replace('How do I ', '').replace('Campus ', '')}
            </Button>
          ))}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto bg-gradient-to-b from-white/5 to-white/10">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`animate-message-slide ${message.sender === 'bot' ? 'flex justify-start' : 'flex justify-end'}`}
            >
              <div className={message.sender === 'bot' ? 'message-bot' : 'message-user'}>
                {message.text}
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="message-bot flex items-center gap-2">
                <span className="text-sm">Assistant is typing</span>
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-white/70 rounded-full animate-typing-dot"></div>
                  <div className="w-2 h-2 bg-white/70 rounded-full animate-typing-dot-delay-1"></div>
                  <div className="w-2 h-2 bg-white/70 rounded-full animate-typing-dot-delay-2"></div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-white/20 bg-white/5 rounded-b-3xl">
        <div className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about campus services..."
            className="glass-input flex-1"
          />
          <Button
            onClick={() => handleSendMessage()}
            className="glass-button px-6"
            disabled={!inputValue.trim()}
          >
            Send
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;