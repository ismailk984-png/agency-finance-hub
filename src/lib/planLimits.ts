export type SubscriptionPlan = 'starter' | 'growth' | 'pro';

export interface PlanLimits {
  maxClients: number;
  maxEmployees: number;
  fullReports: boolean;
  label: string;
  price: number;
  description: string;
}

export const PLAN_LIMITS: Record<SubscriptionPlan, PlanLimits> = {
  starter: {
    maxClients: 10,
    maxEmployees: 5,
    fullReports: false,
    label: 'Starter',
    price: 2999,
    description: 'Perfect for small agencies getting started',
  },
  growth: {
    maxClients: 30,
    maxEmployees: 20,
    fullReports: true,
    label: 'Growth',
    price: 7999,
    description: 'For growing agencies scaling operations',
  },
  pro: {
    maxClients: Infinity,
    maxEmployees: Infinity,
    fullReports: true,
    label: 'Pro',
    price: 14999,
    description: 'Unlimited access for established agencies',
  },
};

export function getPlanLimits(plan: string): PlanLimits {
  return PLAN_LIMITS[plan as SubscriptionPlan] || PLAN_LIMITS.starter;
}

export const fmt = (n: number, symbol = '₹') =>
  symbol + n.toLocaleString('en-IN', { maximumFractionDigits: 0 });
