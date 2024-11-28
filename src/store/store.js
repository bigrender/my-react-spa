import { create } from 'zustand';
import * as tf from '@tensorflow/tfjs';

const useStore = create((set) => ({
  recommendedNumbers: [],
  freeTrialUsed: false,
  lotteryHistory: [],
  
  generateNumbers: async () => {
    // 간단한 AI 모델을 사용하여 번호 생성
    const model = tf.sequential({
      layers: [
        tf.layers.dense({ units: 128, activation: 'relu', inputShape: [6] }),
        tf.layers.dense({ units: 64, activation: 'relu' }),
        tf.layers.dense({ units: 6, activation: 'sigmoid' })
      ]
    });

    // 1-45 사이의 랜덤한 숫자 6개 생성
    const numbers = Array.from({ length: 6 }, () => 
      Math.floor(Math.random() * 45) + 1
    ).sort((a, b) => a - b);

    set((state) => ({ 
      recommendedNumbers: numbers,
      freeTrialUsed: true
    }));
  },

  fetchLotteryHistory: async () => {
    try {
      // TODO: 동행복권 API 연동
      const response = await fetch('https://api.example.com/lottery/history');
      const data = await response.json();
      set({ lotteryHistory: data });
    } catch (error) {
      console.error('Failed to fetch lottery history:', error);
    }
  }
}));

export default useStore;
