import React, { useState } from 'react';
import useStore from '../store/store';
import LottoBall from '../components/LottoBall';
import AuthModal from '../components/AuthModal';
import PremiumModal from '../components/PremiumModal';

const Recommend = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isPremiumModalOpen, setIsPremiumModalOpen] = useState(false);
  const { 
    user,
    isAuthenticated,
    isPremium,
    freeRecommendationsLeft,
    decrementFreeRecommendations,
    recommendedNumbers,
    generateNumbers
  } = useStore();

  const handleGenerateClick = async () => {
    if (!isAuthenticated) {
      setIsAuthModalOpen(true);
      return;
    }

    if (!isPremium && freeRecommendationsLeft === 0) {
      setIsPremiumModalOpen(true);
      return;
    }

    await generateNumbers();
    
    if (!isPremium) {
      decrementFreeRecommendations();
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-4">AI 번호 추천</h1>
        <p className="text-gray-600">
          {isAuthenticated ? (
            isPremium ? (
              "프리미엄 회원님을 위한 AI 기반 맞춤 번호를 추천해드립니다"
            ) : (
              `무료 체험 ${freeRecommendationsLeft}회 남았습니다`
            )
          ) : (
            "로그인하고 AI 추천 번호를 받아보세요"
          )}
        </p>
      </div>

      {/* 추천 번호 표시 */}
      {recommendedNumbers.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8 text-center">
          <h2 className="text-xl font-semibold mb-6">추천 번호</h2>
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            {recommendedNumbers.map((number, index) => (
              <LottoBall key={index} number={number} />
            ))}
          </div>
          {!isPremium && freeRecommendationsLeft === 0 && (
            <div className="text-sm text-gray-500 mt-4">
              프리미엄 구독으로 업그레이드하여 무제한으로 번호를 추천받으세요
            </div>
          )}
        </div>
      )}

      {/* 번호 생성 버튼 */}
      <div className="text-center">
        <button
          onClick={handleGenerateClick}
          className="bg-luxury-600 text-white px-8 py-3 rounded-xl hover:bg-luxury-700 transition-colors"
        >
          {isAuthenticated ? (
            isPremium ? (
              "새로운 번호 추천받기"
            ) : (
              freeRecommendationsLeft > 0 ? "무료 번호 추천받기" : "프리미엄 구독하기"
            )
          ) : (
            "로그인하고 시작하기"
          )}
        </button>
      </div>

      {/* 프리미엄 혜택 안내 */}
      {isAuthenticated && !isPremium && (
        <div className="mt-12 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-xl font-semibold mb-6 text-center">프리미엄 혜택</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <svg className="w-6 h-6 text-luxury-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium mb-2">무제한 번호 추천</h3>
                <p className="text-gray-600 text-sm">
                  원하는 만큼 AI 기반의 추천 번호를 받아보세요
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <svg className="w-6 h-6 text-luxury-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium mb-2">상세 분석 리포트</h3>
                <p className="text-gray-600 text-sm">
                  AI가 분석한 상세한 번호 추천 근거를 확인하세요
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
      
      <PremiumModal
        isOpen={isPremiumModalOpen}
        onClose={() => setIsPremiumModalOpen(false)}
      />
    </div>
  );
};

export default Recommend;
