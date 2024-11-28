import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">AI 로또 추천</h1>
          <p className="py-6">
            AI가 분석한 로또 번호를 추천받아보세요. 
            과거 당첨 번호 분석과 AI 알고리즘을 통해 
            더 나은 번호를 추천해드립니다.
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/recommend" className="btn btn-primary">무료 번호 받기</Link>
            <Link to="/history" className="btn btn-secondary">당첨 이력 보기</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
