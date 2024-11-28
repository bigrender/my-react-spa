import React from 'react';
import { Link } from 'react-router-dom';
import LottoBall from '../components/LottoBall';

const Home = () => {
  const latestNumbers = [8, 12, 23, 36, 45, 1];
  const aiRecommendation = [7, 14, 22, 33, 41, 44];
  
  const latestDraw = {
    round: 1091,
    date: '2023.11.25'
  };

  return (
    <div className="space-y-12 py-4">
      {/* AI 분석 현황 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* 실시간 AI 분석 카드 */}
        <div className="card bg-white shadow-lg">
          <div className="card-body">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
              <h3 className="text-success font-semibold">AI 실시간 분석중</h3>
            </div>
            <div className="space-y-3">
              <div className="h-2 bg-gray-100 rounded-full w-3/4"></div>
              <div className="h-2 bg-gray-100 rounded-full w-1/2"></div>
              <div className="h-2 bg-gray-100 rounded-full w-2/3"></div>
            </div>
            <div className="mt-6 text-xs text-gray-400">
              마지막 업데이트: 1분 전
            </div>
          </div>
        </div>

        {/* AI 신뢰도 스코어 */}
        <div className="card bg-white shadow-lg">
          <div className="card-body">
            <h3 className="font-semibold mb-6">AI 신뢰도 스코어</h3>
            <div className="text-4xl font-bold mb-6">
              98.5<span className="text-sm text-gray-400">/100</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2">
              <div className="bg-luxury-600 h-2 rounded-full" style={{width: '98.5%'}}></div>
            </div>
          </div>
        </div>
      </div>

      {/* 메인 섹션 */}
      <div className="text-center space-y-6 my-16">
        <h1 className="text-4xl md:text-5xl font-bold text-luxury-800">
          AI 로또 예측 시스템
        </h1>
        <p className="text-xl text-gray-600">
          딥러닝 기반 예측 알고리즘으로 당신의 당첨 확률을 높여드립니다
        </p>
      </div>

      {/* 최신 당첨번호 & AI 추천번호 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div className="card bg-white shadow-lg">
          <div className="card-body">
            <h2 className="card-title mb-6">최신 당첨번호</h2>
            <div className="flex flex-wrap gap-3 mb-6">
              {latestNumbers.map((num, idx) => (
                <LottoBall key={idx} number={num} />
              ))}
            </div>
            <div className="text-sm text-gray-400">
              {latestDraw.round}회 당첨번호 ({latestDraw.date})
            </div>
          </div>
        </div>

        <div className="card bg-white shadow-lg">
          <div className="card-body">
            <h2 className="card-title mb-6">AI 추천번호</h2>
            <div className="flex flex-wrap gap-3 mb-6">
              {aiRecommendation.map((num, idx) => (
                <LottoBall key={idx} number={num} />
              ))}
            </div>
            <Link 
              to="/recommend" 
              className="relative inline-flex items-center justify-center px-12 py-3 overflow-hidden font-medium transition-all bg-luxury-600 hover:bg-luxury-700 rounded-xl shadow-md group"
            >
              <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-luxury-700 group-hover:translate-x-0 ease">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </span>
              <span className="absolute flex items-center justify-center w-full h-full text-white transition-all duration-300 transform group-hover:translate-x-full ease">새로운 번호 받기</span>
              <span className="relative invisible">새로운 번호 받기</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 통계 섹션 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div className="card bg-white shadow-lg">
          <div className="card-body">
            <div className="text-gray-600 mb-2">누적 분석 데이터</div>
            <div className="text-3xl font-bold text-luxury-800">1,234,567</div>
            <div className="text-success text-sm">↗︎ 매일 1,000+ 증가</div>
          </div>
        </div>
        <div className="card bg-white shadow-lg">
          <div className="card-body">
            <div className="text-gray-600 mb-2">AI 예측 정확도</div>
            <div className="text-3xl font-bold text-luxury-800">92.8%</div>
            <div className="text-success text-sm">↗︎ 지난달 대비 2.3% 상승</div>
          </div>
        </div>
        <div className="card bg-white shadow-lg">
          <div className="card-body">
            <div className="text-gray-600 mb-2">이번 주 당첨 예상금</div>
            <div className="text-3xl font-bold text-luxury-800">34억</div>
            <div className="text-success text-sm">↗︎ 전주 대비 2억 증가</div>
          </div>
        </div>
      </div>

      {/* CTA 섹션 */}
      <div className="text-center mb-8">
        <Link 
          to="/recommend" 
          className="relative inline-flex items-center justify-center px-12 py-3 overflow-hidden font-medium transition-all bg-luxury-600 hover:bg-luxury-700 rounded-xl shadow-md group"
        >
          <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-luxury-700 group-hover:translate-x-0 ease">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </span>
          <span className="absolute flex items-center justify-center w-full h-full text-white transition-all duration-300 transform group-hover:translate-x-full ease">무료 번호 받기</span>
          <span className="relative invisible">무료 번호 받기</span>
        </Link>
      </div>
    </div>
  );
};

export default Home;
