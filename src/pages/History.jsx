import React from 'react';
import { useNavigate } from 'react-router-dom';
import useStore from '../store/store';
import LottoBall from '../components/LottoBall';
import { formatDate } from '../utils/format';

const History = () => {
  const navigate = useNavigate();
  const { isAuthenticated, recommendationHistory } = useStore();

  if (!isAuthenticated) {
    return (
      <div className="max-w-4xl mx-auto text-center py-12">
        <h1 className="text-3xl font-bold mb-6">추천 기록</h1>
        <div className="bg-white rounded-xl shadow-lg p-8">
          <p className="text-gray-600 mb-6">
            로그인하고 추천 번호 기록을 확인하세요
          </p>
          <button
            onClick={() => navigate('/')}
            className="bg-luxury-600 text-white px-6 py-2 rounded-lg hover:bg-luxury-700 transition-colors"
          >
            시작하기
          </button>
        </div>
      </div>
    );
  }

  if (recommendationHistory.length === 0) {
    return (
      <div className="max-w-4xl mx-auto text-center py-12">
        <h1 className="text-3xl font-bold mb-6">추천 기록</h1>
        <div className="bg-white rounded-xl shadow-lg p-8">
          <p className="text-gray-600 mb-6">
            아직 추천받은 번호가 없습니다
          </p>
          <button
            onClick={() => navigate('/recommend')}
            className="bg-luxury-600 text-white px-6 py-2 rounded-lg hover:bg-luxury-700 transition-colors"
          >
            번호 추천받기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-12">
      <h1 className="text-3xl font-bold text-center mb-8">추천 기록</h1>
      <div className="space-y-6">
        {recommendationHistory.map((record, index) => (
          <div key={index} className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-500">{formatDate(record.timestamp)}</span>
              {record.win && (
                <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
                  당첨
                </span>
              )}
            </div>
            <div className="flex flex-wrap gap-4">
              {record.numbers.map((number, idx) => (
                <LottoBall key={idx} number={number} />
              ))}
            </div>
            {record.analysis && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-medium mb-2">AI 분석</h3>
                <p className="text-gray-600 text-sm">{record.analysis}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default History;
