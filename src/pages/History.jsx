import React, { useEffect, useState } from 'react';
import LottoBall from '../components/LottoBall';
import { formatNumber } from '../utils/format';

const History = () => {
  const [lotteryData, setLotteryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchLotteryData();
  }, []);

  const fetchLotteryData = async () => {
    try {
      // 최근 회차 번호 조회
      const latestDrwNo = await fetch('https://www.dhlottery.co.kr/common.do?method=getLottoNumber&drwNo=1')
        .then(res => res.json())
        .then(data => data.drwNo);

      // 최근 10회차 데이터 조회
      const promises = Array.from({ length: 10 }, (_, i) => {
        const drwNo = latestDrwNo - i;
        return fetch(`https://www.dhlottery.co.kr/common.do?method=getLottoNumber&drwNo=${drwNo}`)
          .then(res => res.json());
      });

      const results = await Promise.all(promises);
      setLotteryData(results.filter(data => data.returnValue === 'success'));
    } catch (error) {
      console.error('Failed to fetch lottery data:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderWinningNumbers = (data) => {
    const numbers = [
      data.drwtNo1,
      data.drwtNo2,
      data.drwtNo3,
      data.drwtNo4,
      data.drwtNo5,
      data.drwtNo6,
    ].sort((a, b) => a - b);

    return (
      <div className="flex flex-wrap gap-2">
        {numbers.map((number, index) => (
          <LottoBall key={index} number={number} />
        ))}
        <div className="flex items-center mx-2">+</div>
        <LottoBall number={data.bnusNo} />
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">당첨 번호 히스토리</h1>
      
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>회차</th>
              <th>추첨일</th>
              <th>당첨번호</th>
              <th>1등 당첨금</th>
              <th>1등 당첨자</th>
            </tr>
          </thead>
          <tbody>
            {lotteryData.map((data) => (
              <tr key={data.drwNo}>
                <td>{data.drwNo}회</td>
                <td>{data.drwNoDate}</td>
                <td>{renderWinningNumbers(data)}</td>
                <td>{formatNumber(data.firstWinamnt)}원</td>
                <td>{data.firstPrzwnerCo}명</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center mt-4">
        <div className="join">
          <button 
            className="join-item btn"
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            «
          </button>
          <button className="join-item btn">Page {currentPage}</button>
          <button 
            className="join-item btn"
            onClick={() => setCurrentPage(prev => prev + 1)}
            disabled={currentPage * itemsPerPage >= lotteryData.length}
          >
            »
          </button>
        </div>
      </div>
    </div>
  );
};

export default History;
