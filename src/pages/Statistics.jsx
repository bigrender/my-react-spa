import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';
import { formatNumber } from '../utils/format';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Statistics = () => {
  const [lotteryData, setLotteryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [numberFrequency, setNumberFrequency] = useState({});
  const [prizeStats, setPrizeStats] = useState({
    average: 0,
    highest: 0,
    lowest: Infinity,
  });
  const [oddEvenRatio, setOddEvenRatio] = useState({ odd: 0, even: 0 });

  useEffect(() => {
    fetchLotteryData();
  }, []);

  const fetchLotteryData = async () => {
    try {
      // 최근 회차 번호 조회
      const latestDrwNo = await fetch('https://www.dhlottery.co.kr/common.do?method=getLottoNumber&drwNo=1')
        .then(res => res.json())
        .then(data => data.drwNo);

      // 최근 20회차 데이터 조회
      const promises = Array.from({ length: 20 }, (_, i) => {
        const drwNo = latestDrwNo - i;
        return fetch(`https://www.dhlottery.co.kr/common.do?method=getLottoNumber&drwNo=${drwNo}`)
          .then(res => res.json());
      });

      const results = await Promise.all(promises);
      const validResults = results.filter(data => data.returnValue === 'success');
      setLotteryData(validResults);
      
      // 통계 계산
      calculateStatistics(validResults);
    } catch (error) {
      console.error('Failed to fetch lottery data:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateStatistics = (data) => {
    // 번호별 출현 빈도
    const frequency = {};
    let totalOdd = 0;
    let totalEven = 0;
    let totalPrize = 0;
    let highestPrize = 0;
    let lowestPrize = Infinity;

    data.forEach(draw => {
      [
        draw.drwtNo1,
        draw.drwtNo2,
        draw.drwtNo3,
        draw.drwtNo4,
        draw.drwtNo5,
        draw.drwtNo6,
        draw.bnusNo
      ].forEach(num => {
        frequency[num] = (frequency[num] || 0) + 1;
        if (num % 2 === 0) totalEven++;
        else totalOdd++;
      });

      // 당첨금 통계
      totalPrize += draw.firstWinamnt;
      highestPrize = Math.max(highestPrize, draw.firstWinamnt);
      lowestPrize = Math.min(lowestPrize, draw.firstWinamnt);
    });

    setNumberFrequency(frequency);
    setOddEvenRatio({
      odd: (totalOdd / (totalOdd + totalEven)) * 100,
      even: (totalEven / (totalOdd + totalEven)) * 100,
    });
    setPrizeStats({
      average: totalPrize / data.length,
      highest: highestPrize,
      lowest: lowestPrize,
    });
  };

  const frequencyChartData = {
    labels: Object.keys(numberFrequency).sort((a, b) => Number(a) - Number(b)),
    datasets: [
      {
        label: '출현 횟수',
        data: Object.keys(numberFrequency)
          .sort((a, b) => Number(a) - Number(b))
          .map(key => numberFrequency[key]),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  const oddEvenChartData = {
    labels: ['홀수', '짝수'],
    datasets: [
      {
        data: [oddEvenRatio.odd, oddEvenRatio.even],
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(53, 162, 235, 0.5)',
        ],
      },
    ],
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
      <h1 className="text-3xl font-bold text-center mb-8">당첨 통계</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">당첨금 통계</h2>
            <div className="stats stats-vertical shadow">
              <div className="stat">
                <div className="stat-title">평균 당첨금</div>
                <div className="stat-value text-primary">{formatNumber(prizeStats.average)}원</div>
              </div>
              <div className="stat">
                <div className="stat-title">최고 당첨금</div>
                <div className="stat-value text-secondary">{formatNumber(prizeStats.highest)}원</div>
              </div>
              <div className="stat">
                <div className="stat-title">최저 당첨금</div>
                <div className="stat-value">{formatNumber(prizeStats.lowest)}원</div>
              </div>
            </div>
          </div>
        </div>

        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">홀짝 비율</h2>
            <div className="w-full h-[300px] flex items-center justify-center">
              <Pie data={oddEvenChartData} options={{ maintainAspectRatio: false }} />
            </div>
          </div>
        </div>
      </div>

      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">번호별 출현 빈도</h2>
          <div className="w-full h-[400px]">
            <Bar
              data={frequencyChartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'top',
                  },
                  title: {
                    display: true,
                    text: '최근 20회차 번호별 출현 빈도',
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
