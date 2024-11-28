import React from 'react';
import useStore from '../store/store';

const PremiumModal = ({ isOpen, onClose }) => {
  const setPremium = useStore((state) => state.setPremium);

  const handleSubscribe = async () => {
    try {
      // TODO: 실제 결제 API 연동
      await new Promise(resolve => setTimeout(resolve, 1000));
      setPremium(true);
      onClose();
    } catch (error) {
      console.error('결제 처리 중 오류가 발생했습니다:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4">
        <h2 className="text-2xl font-bold mb-6 text-center">프리미엄 구독</h2>
        
        <div className="space-y-6">
          <div className="text-center">
            <div className="text-4xl font-bold text-luxury-600 mb-2">₩10,000</div>
            <div className="text-gray-600">월 구독</div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-lg">프리미엄 혜택</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                무제한 번호 추천
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                AI 기반 상세 분석 리포트
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                당첨 확률 시뮬레이션
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                우선 기술 지원
              </li>
            </ul>
          </div>

          <button
            onClick={handleSubscribe}
            className="w-full bg-luxury-600 text-white py-3 px-4 rounded-lg hover:bg-luxury-700 transition-colors"
          >
            구독하기
          </button>

          <p className="text-sm text-gray-500 text-center">
            언제든지 구독을 취소할 수 있습니다
          </p>
        </div>

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default PremiumModal;
