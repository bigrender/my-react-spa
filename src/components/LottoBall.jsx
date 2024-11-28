import React from 'react';

const LottoBall = ({ number }) => {
  const getBallClass = (num) => {
    if (num <= 10) return 'lotto-ball-1-10';
    if (num <= 20) return 'lotto-ball-11-20';
    if (num <= 30) return 'lotto-ball-21-30';
    if (num <= 40) return 'lotto-ball-31-40';
    return 'lotto-ball-41-45';
  };

  return (
    <div className={`lotto-ball ${getBallClass(number)}`}>
      {number}
    </div>
  );
};

export default LottoBall;
