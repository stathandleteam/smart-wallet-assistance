import { useChat } from "ai/react";

interface ChatProps {
      address: string;
}
  
  const Chat: React.FC<ChatProps> = ({ address }) => {
      const { messages, append } = useChat({
          api: '/api/chat',
          body: { address }, // Pass address to API
          initialMessages: [
              {
                id: 'assistant',
                  role: 'assistant',
                  content: 'Hello! I have analyzed your recent transactions. What would you like to know about your spending?'
              }
          ]
      });
  
      return (
          <div className="space-y-4">
              {messages.map((message:any, i:any) => (
                  <div key={i} className={`flex ${
                      message.role === 'assistant' ? 'justify-start' : 'justify-end'
                  }`}>
                      <div className="max-w-[80%] rounded-lg p-3 bg-white shadow">
                          {message.content}
                      </div>
                  </div>
              ))}
              
              <form onSubmit={async (e) => {
                  e.preventDefault();
                  const form = e.target as HTMLFormElement;
                  const input = form.elements.namedItem('message') as HTMLInputElement;
                  await append({ role: 'user', content: input.value });
                  input.value = '';
              }}>
                  <input 
                      name="message"
                      placeholder="Ask about your finances..."
                      className="w-full p-2 rounded-lg border"
                  />
              </form>
          </div>
      );
  };