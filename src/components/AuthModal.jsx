import React, { useState } from 'react';
import useStore from '../store/store';

const AuthModal = ({ isOpen, onClose, mode = 'login' }) => {
  const [currentMode, setCurrentMode] = useState(mode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  
  const setUser = useStore((state) => state.setUser);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      if (currentMode === 'login') {
        // TODO: 실제 로그인 API 연동
        const user = {
          email,
          name: 'Test User',
          isPremium: false,
          freeRecommendationsLeft: 1
        };
        setUser(user);
      } else {
        // TODO: 실제 회원가입 API 연동
        const user = {
          email,
          name,
          isPremium: false,
          freeRecommendationsLeft: 1
        };
        setUser(user);
      }
      onClose();
    } catch (error) {
      setError('인증 처리 중 오류가 발생했습니다.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {currentMode === 'login' ? '로그인' : '회원가입'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              이메일
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-luxury-500 bg-white text-gray-900"
              placeholder="example@email.com"
              required
            />
          </div>

          {currentMode === 'register' && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                이름
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-luxury-500 bg-white text-gray-900"
                placeholder="홍길동"
                required
              />
            </div>
          )}

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              비밀번호
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-luxury-500 bg-white text-gray-900"
              placeholder="••••••••"
              required
            />
          </div>

          <div className="flex flex-col gap-3">
            <button
              type="submit"
              className="w-full px-4 py-2 bg-luxury-600 text-white rounded-lg hover:bg-luxury-700 transition-colors"
            >
              {currentMode === 'login' ? '로그인' : '회원가입'}
            </button>
            <button
              type="button"
              onClick={() => {
                setCurrentMode(currentMode === 'login' ? 'register' : 'login');
                setError('');
              }}
              className="w-full px-4 py-2 bg-white text-luxury-600 border border-luxury-600 rounded-lg hover:bg-luxury-50 transition-colors"
            >
              {currentMode === 'login' ? '회원가입하기' : '로그인하기'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthModal;
