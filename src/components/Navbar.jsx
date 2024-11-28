import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  return (
    <div className="navbar bg-base-100 shadow-lg">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
            <li><Link to="/" className={location.pathname === '/' ? 'active' : ''}>홈</Link></li>
            <li><Link to="/recommend" className={location.pathname === '/recommend' ? 'active' : ''}>번호추천</Link></li>
            <li><Link to="/history" className={location.pathname === '/history' ? 'active' : ''}>당첨이력</Link></li>
            <li><Link to="/statistics" className={location.pathname === '/statistics' ? 'active' : ''}>당첨통계</Link></li>
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost text-xl">AI 로또</Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li><Link to="/" className={location.pathname === '/' ? 'active' : ''}>홈</Link></li>
          <li><Link to="/recommend" className={location.pathname === '/recommend' ? 'active' : ''}>번호추천</Link></li>
          <li><Link to="/history" className={location.pathname === '/history' ? 'active' : ''}>당첨이력</Link></li>
          <li><Link to="/statistics" className={location.pathname === '/statistics' ? 'active' : ''}>당첨통계</Link></li>
        </ul>
      </div>
      <div className="navbar-end">
        <Link to="/recommend" className="btn btn-primary">무료 번호받기</Link>
      </div>
    </div>
  );
};

export default Navbar;
