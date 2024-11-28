import React, { useState } from 'react';
import LottoBall from '../components/LottoBall';
import useStore from '../store/store';

const Recommend = () => {
  const [loading, setLoading] = useState(false);
  const { generateNumbers, recommendedNumbers, freeTrialUsed } = useStore();

  const handleGenerate = async () => {
    if (freeTrialUsed) {
      // TODO: 결제 페이지로 이동
      return;
    }

    setLoading(true);
    await generateNumbers();
    setLoading(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">AI 로또 번호 추천</h1>
      
      <div className="text-center mb-8">
        <button 
          onClick={handleGenerate}
          disabled={loading}
          className="btn btn-primary btn-lg"
        >
          {loading ? '생성중...' : freeTrialUsed ? '프리미엄 이용하기' : '무료 번호 받기'}
        </button>
      </div>

      {recommendedNumbers.length > 0 && (
        <div className="flex flex-wrap gap-4 justify-center">
          {recommendedNumbers.map((number, index) => (
            <LottoBall key={index} number={number} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Recommend;
