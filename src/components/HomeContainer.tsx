'use client';
import Dashboard from '@/components/Dashboard';
import HomeScreen from '@/components/HomeScreen';
import { AppConfig, showConnect, UserSession } from '@stacks/connect';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const appConfig = new AppConfig(['store_write', 'publish_data']);
const userSession = new UserSession({ appConfig });

const HomeContainer = ()=> {

  const [connected, setConnected] = useState(false);
  
  useEffect(() => {
    if (userSession.isUserSignedIn()) {
      setConnected(true)
    } else {
      setConnected(false)
    }
  }, [])

  const handleConnect = () => {
    showConnect({
      appDetails: {
        name: 'AI-WALLET_ASSISTANCE',
        icon: window.location.origin + 'wallet.png',
      },
      onFinish: (payload) => {
        console.log('Connected!');
        setConnected(true)
        // Here, you might want to update your app state to reflect that a wallet is connected
      },
      onCancel: () => {
        console.log('User cancelled connection');
      },
    });
  };

  const onDisconnect = () => {
    userSession.signUserOut();
    setConnected(false);
  }
  //
  
  return (
    !connected? <HomeScreen handleConnect = {handleConnect} />:
    <Dashboard onDisconnect = {onDisconnect} />
  );
}

export default HomeContainer;