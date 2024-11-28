import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import * as tf from '@tensorflow/tfjs';

const useStore = create(
  persist(
    (set) => ({
      // 사용자 상태
      user: null,
      isAuthenticated: false,
      isPremium: false,
      freeRecommendationsLeft: 1,

      // 인증 관련 액션
      setUser: (user) => set({ 
        user,
        isAuthenticated: !!user,
        isPremium: user?.isPremium || false,
        freeRecommendationsLeft: user?.freeRecommendationsLeft ?? 1
      }),
      logout: () => set({ 
        user: null, 
        isAuthenticated: false,
        isPremium: false,
        freeRecommendationsLeft: 1
      }),

      // 추천 횟수 관리
      decrementFreeRecommendations: () => 
        set((state) => ({
          freeRecommendationsLeft: Math.max(0, state.freeRecommendationsLeft - 1)
        })),

      // 프리미엄 상태 업데이트
      setPremium: (isPremium) => set({ isPremium }),

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
    }),
    {
      name: 'ai-lotto-storage',
    }
  )
)

export default useStore;
