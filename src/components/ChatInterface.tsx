'use client'; // Ensure this is a client-side component
import * as nodeCrypto from 'crypto'
import { useChat } from "ai/react";
import { FiPaperclip, FiMic } from 'react-icons/fi';
import React, { useEffect, useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import { BiSend } from "react-icons/bi";
import { convertToChatTime } from "@/app/utils/utils";
import { MdOutlineCancelScheduleSend } from 'react-icons/md';
import { AppConfig, UserSession } from '@stacks/connect';

interface Message {
    id: string;
    text: string;
    sender: 'ai' | 'user';
    timestamp: string;
    status?: 'sent' | 'delivered' | 'read';
    attachments?: Array<{
      name: string;
      size: string;
      type: string;
    }>;
  }

const appConfig = new AppConfig(['store_write', 'publish_data']);
export const userSession = new UserSession({ appConfig });

    


const ChatInterface = ({setConnected}: {setConnected: React.Dispatch<React.SetStateAction<boolean>>}) => {
    

      const [newMessage, setNewMessage] = React.useState('');
      const [address, setAddress] = React.useState('');
         
      
    //   const [messages, setMessages] = React.useState<Message[]>([
    //     {
    //       id: '1',
    //       text: "Hello!\nI'm John",
    //       sender: 'ai',
    //       timestamp: '9:34',
    //       status: 'read'
    //     },
    //     {
    //       id: '2',
    //       text: "Can we have a call tomorrow at 2 PM to discuss my website?",
    //       sender: 'ai',
    //       timestamp: '10:18',
    //       status: 'read'
    //     },
    //     {
    //       id: '3',
    //       text: "Hi, I'm Oluwaseun, a product designer specializing in seamless and user-focused website and mobile designs.\nSure, I'll be available at 2 PM.\nThank you!.",
    //       sender: 'user',
    //       timestamp: '9:30',
    //       status: 'read'
    //     }
    //   ]);

    // const { connected } = useWallet();
    function handleIsSignIn() {
      if (userSession.isUserSignedIn()) {
          const userData = userSession.loadUserData();
          console.log("User Address:", userData.profile.stxAddress.testnet);
          
      } else if (userSession.isSignInPending()) {
          userSession.handlePendingSignIn().then((userData) => {
          console.log("User Address:", userData.profile.stxAddress.testnet);
          });
      }
      }

    const handleDisconnectWallet = () => {
      userSession.signUserOut();
      setConnected(false)
    };

    const addressString = userSession.loadUserData().profile.stxAddress.testnet;

    useEffect(() => {
      setAddress(addressString || '');
    }, [addressString])
    
   
    const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
        initialMessages: [
            {
                role: "system",
                content: `You have connected your wallet successfully. Your wallet address is ${address}`,
                id: "system"
            }
        ]
      })

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const newMsg: Message = {
        id: Date.now().toString(),
        text: newMessage,
        sender: 'user',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'sent'
      };
    //   setMessages([...messages, newMsg]);
      setNewMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

      return (
        <div className="flex flex-col h-screen bg-gray-100">
          {/* Chat container */}
          <div className="bg-white border-b shadow-sm flex items-center justify-between px-4 w-full">
        <div className="flex items-center p-4">
          {/* <button className="p-2 hover:bg-gray-100 rounded-full mr-2">
            <BsArrowLeft className="w-6 h-6 text-gray-600" />
          </button> */}
          <div>
            <h1 className="text-xl font-semibold text-gray-800">AI Wallet Assistant</h1>
            <p className="text-sm text-gray-500">Always here to help</p>
          </div>
        </div>

        {/* <div className="flex gap-4 justify-center"> */}

        <button 
                          onClick={handleDisconnectWallet}
                          className="flex items-center gap-2 px-6 py-3 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors font-medium"
                        >
                          Disconnect
                          <MdOutlineCancelScheduleSend className="w-5 h-5" />
                        </button>
                        {/* </div> */}
      </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {message.role === 'system' && (
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm mr-2 flex-shrink-0">
                AI
              </div>
            )}
                <div
                  className={`max-w-[70%] rounded-lg p-3 ${
                    message.role === 'user'
                      ? 'bg-blue-500 text-white'
                      : 'bg-white text-gray-800'
                  }`}
                >
                  <div className="whitespace-pre-wrap">{message.content}</div>
                  <div className="flex items-center justify-end gap-1 mt-1">
                    <span className="text-xs opacity-70">{convertToChatTime(message.createdAt?.getTime())}</span>
                    {message.role === 'user' 
                    // && message.status === 'read' 
                    && (
                      <div className="text-xs">✓✓</div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
    
          {/* Input area */}
          <div className="bg-white border-t p-4">
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <FiPaperclip className="w-6 h-6 text-gray-500" />
              </button>
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message"
                className="flex-1 px-4 py-2 rounded-full border focus:outline-none focus:border-blue-500"
            />
               {newMessage.trim() ? (
            <button 
              onClick={handleSendMessage}
              className="p-2 hover:bg-blue-600 bg-blue-500 rounded-full transition-colors"
            >
              <BiSend className="w-6 h-6 text-white" />
            </button>
          ) : (
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <FiMic className="w-6 h-6 text-gray-500" />
            </button>
          )}
            </div>
          </div>
        </div>
      );
      
}

export default ChatInterface;