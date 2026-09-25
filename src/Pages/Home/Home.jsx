import React from 'react'
import Hero from './Hero';
import AiCompanions from '../../Components/AiCompanions';
import LiveModels from '../../Components/LiveModels';
import PromoCards from './PromoCards';
import TrustBadges from './TrustBadges';

const Home = () => {
  return (
    <>
     <Hero />
     <AiCompanions />
     <LiveModels />
     <PromoCards />
     <TrustBadges />
    </>
  )
}

export default Home;