import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import useStore from '../store/store';
import AuthModal from './AuthModal';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { user, isAuthenticated, logout } = useStore();
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const menuItems = [
    { path: '/', label: '홈' },
    { path: '/recommend', label: '번호추천' },
    { path: '/history', label: '당첨이력' },
    { path: '/statistics', label: '당첨통계' }
  ];

  const MenuItem = ({ path, label }) => {
    const isActive = location.pathname === path;
    return (
      <Link 
        to={path} 
        className={`whitespace-nowrap px-3 py-2 text-sm font-medium rounded-lg transition-colors
          ${isActive 
            ? 'bg-elegant-100 text-elegant-700' 
            : 'text-base-content/70 hover:text-base-content hover:bg-base-200'
          }`}
      >
        {label}
      </Link>
    );
  };

  return (
    <>
      <div className="navbar bg-white h-16 px-6">
        {/* 모바일 메뉴 */}
        <div className="flex-none lg:hidden">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden" onClick={toggleMenu}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </label>
            {isMenuOpen && (
              <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-white rounded-box w-52">
                {menuItems.map((item) => (
                  <li key={item.path} className="w-full">
                    <MenuItem {...item} />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* 로고 */}
        <div className="flex-1">
          <Link 
            to="/" 
            className="text-lg font-semibold text-elegant-700 hover:text-elegant-800 transition-colors"
          >
            AI 로또
          </Link>
        </div>

        {/* 데스크탑 메뉴 */}
        <div className="hidden lg:flex flex-none">
          <ul className="menu menu-horizontal px-1 gap-2">
            {menuItems.map((item) => (
              <li key={item.path}>
                <MenuItem {...item} />
              </li>
            ))}
          </ul>
        </div>

        {/* 우측 버튼 */}
        <div className="flex-none ml-8">
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">{user.name}님</span>
              <button
                onClick={logout}
                className="text-sm text-gray-600 hover:text-gray-800"
              >
                로그아웃
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="relative inline-flex items-center justify-center px-6 py-2 overflow-hidden text-sm font-medium transition-all bg-luxury-600 hover:bg-luxury-700 rounded-lg shadow-md group"
            >
              <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-luxury-700 group-hover:translate-x-0 ease">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
              <span className="absolute flex items-center justify-center w-full h-full text-white transition-all duration-300 transform group-hover:translate-x-full ease">로그인</span>
              <span className="relative invisible">로그인</span>
            </button>
          )}
        </div>
      </div>

      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </>
  );
};

export default Navbar;
