'use client';
import dynamic from 'next/dynamic';

const HomeContainer = dynamic(() => import('@/components/HomeContainer'), {
  ssr: false
} );


export default function Home() {
  return (
    <HomeContainer />
  );
}
