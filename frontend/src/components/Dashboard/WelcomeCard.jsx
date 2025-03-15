import React from 'react';

const WelcomeCard = ({ user }) => {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  const getUserName = () => {
    if (user?.displayName) return user.displayName.split(' ')[0];
    if (user?.email) return user.email.split('@')[0];
    return "there";
  };

  const getUserRole = () => {
    return user?.profile?.role || "User";
  };

  return (
    <div className="bg-panel/40 backdrop-blur-sm border border-cta/20 rounded-xl p-5 shadow-sm">
      <div className="flex items-center">
        <div>
          <h2 className="text-2xl font-semibold text-text mb-1">
            {getGreeting()}, <span className="text-cta">{getUserName()}</span>
          </h2>
          <p className="text-text/60">
            Welcome to your supply chain dashboard
            <span className="inline-flex items-center ml-2 px-2 py-0.5 rounded text-xs font-medium bg-cta/20 text-cta">
              {getUserRole()}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default WelcomeCard;