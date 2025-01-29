'use client';
import { BiMessageSquare, BiShield, BiTrendingUp, BiWallet } from 'react-icons/bi';
import { BsArrowRight } from 'react-icons/bs';


const FeatureCard = ({ icon:Icon, title, description }: {icon: any, title: string, description: string}) => (
    <div className="p-6 rounded-xl bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-shadow">
      <div className="mb-4">
        <Icon className="w-8 h-8 text-blue-500" />
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  );
  
  const HomeScreen = ({handleConnect}: {handleConnect: () => void}) => {
    const features = [
      {
        icon: BiWallet,
        title: "Smart Wallet Management",
        description: "Track and optimize your spending with AI-powered insights"
      },
      {
        icon: BiTrendingUp,
        title: "Financial Growth",
        description: "Get personalized recommendations for wealth building"
      },
      {
        icon: BiShield,
        title: "Secure & Private",
        description: "Your financial data is protected with enterprise-grade security"
      }
    ];
  
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
          <main className="flex flex-col gap-12 items-center text-center">
            {/* Hero Section */}
            <div className="space-y-6 max-w-3xl">
              <h1 className="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">
                AI WALLET ASSISTANCE
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300">
                Your intelligent companion for maximizing financial growth and achieving your money goals.
              </p>
              <div className="flex gap-4 justify-center">
                <button 
                  onClick={handleConnect}
                  className="flex items-center gap-2 px-6 py-3 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors font-medium"
                >
                  Connect Now
                  <BsArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
  
            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full mt-8">
              {features.map((feature, index) => (
                <FeatureCard key={index} {...feature} />
              ))}
            </div>
  
            {/* Chat Preview */}
            <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mt-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
                  <BiMessageSquare className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold">Start a Conversation</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Get instant financial guidance</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 text-sm">
                  "How can I optimize my monthly budget?"
                </div>
                <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 text-sm">
                  "What's the best way to start investing?"
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  };

  export default HomeScreen;