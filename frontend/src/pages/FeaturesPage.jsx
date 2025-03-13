import React from 'react';
import FeaturesHero from '../components/Features/FeaturesHero';
import ProductTracking from '../components/Features/ProductTracking';
import SmartContracts from '../components/Features/SmartContracts';
import AccessControl from '../components/Features/AccessControl';
// import TransactionLogs from '../components/Features/TransactionLogs';
// import QrCodeIntegration from '../components/Features/QrCodeIntegration';
// import AnalyticsDashboard from '../components/Features/AnalyticsDashboard';
// import FeaturesCTA from '../components/Features/FeaturesCTA';

const FeaturesPage = () => {
  return (
    <div className="bg-background min-h-screen">
      <FeaturesHero />
      <ProductTracking />
      <SmartContracts />
      <AccessControl />
      {/* <TransactionLogs /> */}
      {/* <QrCodeIntegration /> */}
      {/* <AnalyticsDashboard /> */}
      {/* <FeaturesCTA /> */}
    </div>
  );
};

export default FeaturesPage;