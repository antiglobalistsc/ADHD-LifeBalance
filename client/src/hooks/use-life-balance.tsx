import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import type { BalanceMetrics, Pillar } from "@shared/schema";

export function useLifeBalance(userId: string) {
  const queryClient = useQueryClient();
  const today = new Date().toISOString().split('T')[0];

  const { data: pillars } = useQuery<Pillar[]>({
    queryKey: ['/api/pillars', userId]
  });

  const { data: balanceMetrics } = useQuery<BalanceMetrics>({
    queryKey: ['/api/balance', userId, today]
  });

  const updateBalanceMutation = useMutation({
    mutationFn: async (updates: Partial<BalanceMetrics>) => {
      if (balanceMetrics?.id) {
        return apiRequest('PATCH', `/api/balance/${balanceMetrics.id}`, updates);
      } else {
        return apiRequest('POST', '/api/balance', {
          userId,
          date: today,
          ...updates
        });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/balance', userId, today] });
    }
  });

  const calculateOverwhelm = () => {
    if (!pillars) return 'green';
    
    const totalHours = pillars.reduce((sum, pillar) => sum + (pillar.weeklyHours || 0), 0);
    const imbalance = Math.max(...pillars.map(p => p.weeklyHours || 0)) - Math.min(...pillars.map(p => p.weeklyHours || 0));
    
    if (totalHours > 60 || imbalance > 20) return 'red';
    if (totalHours > 45 || imbalance > 15) return 'yellow';
    return 'green';
  };

  const getBalanceScore = () => {
    if (!pillars) return 0;
    
    const scores = pillars.map(p => p.weeklyScore || 0);
    return Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length);
  };

  const updateOverwhelm = (level: 'green' | 'yellow' | 'red') => {
    updateBalanceMutation.mutate({ overwhelmLevel: level });
  };

  return {
    pillars,
    balanceMetrics,
    overallBalance: getBalanceScore(),
    overwhelmLevel: balanceMetrics?.overwhelmLevel || calculateOverwhelm(),
    updateOverwhelm,
    isLoading: !pillars || !balanceMetrics
  };
}
