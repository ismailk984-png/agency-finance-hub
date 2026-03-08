// Demo data for the finance dashboard — no real business data

export type PlanType = 'basic' | 'growth' | 'premium';
export type RoleCategory = 'editor' | 'designer' | 'campaign_manager' | 'ads' | 'videographer' | 'cgi_ai' | 'admin_support' | 'production_manager' | 'founder';
export type TravelType = 'none' | 'local' | 'outstation';
export type ShootFrequency = 'monthly' | 'alternate';

export interface Client {
  id: string;
  client_name: string;
  current_retainer: number;
  plan_type: PlanType;
  active: boolean;
  assigned_campaign_manager: string | null;
  reels_per_month: number;
  statics_per_month: number;
  stories_per_month: number;
  shoot_days_per_month: number;
  shoot_frequency: ShootFrequency;
  orm_required: boolean;
  ads_required: boolean;
  smm_required: boolean;
  gmb_required: boolean;
  travel_type: TravelType;
  vendor_budget: number;
  gst_rate: number;
  tds_rate: number;
  comments: string | null;
}

export interface Employee {
  id: string;
  employee_name: string;
  role_category: RoleCategory;
  monthly_salary: number;
  overhead_multiplier_percent: number;
  active: boolean;
  email: string | null;
  joining_date: string | null;
  salary_day: number | null;
}

export interface FixedExpense {
  id: string;
  name: string;
  amount: number;
  category: string;
}

export interface Contract {
  id: string;
  client_id: string;
  client_name: string;
  status: 'active' | 'expired' | 'pending';
  start_date: string;
  end_date: string | null;
  value: number;
}

export interface Vendor {
  id: string;
  name: string;
  service: string;
  monthly_cost: number;
  active: boolean;
}

export interface DbSettings {
  target_margin_percent: number;
  stories_factor_percent: number;
  shoot_day_internal_cost: number;
  ads_accounts_capacity_per_ads_person: number;
  videographer_shoots_per_month: number;
  reels_per_editor_per_month: number;
  statics_per_designer_per_month: number;
}

export const demoSettings: DbSettings = {
  target_margin_percent: 40,
  stories_factor_percent: 15,
  shoot_day_internal_cost: 5000,
  ads_accounts_capacity_per_ads_person: 8,
  videographer_shoots_per_month: 12,
  reels_per_editor_per_month: 20,
  statics_per_designer_per_month: 40,
};

export const demoClients: Client[] = [
  { id: '1', client_name: 'Acme Corp', current_retainer: 85000, plan_type: 'premium', active: true, assigned_campaign_manager: 'Sarah K.', reels_per_month: 8, statics_per_month: 15, stories_per_month: 20, shoot_days_per_month: 2, shoot_frequency: 'monthly', orm_required: true, ads_required: true, smm_required: true, gmb_required: false, travel_type: 'local', vendor_budget: 10000, gst_rate: 18, tds_rate: 2, comments: null },
  { id: '2', client_name: 'Nova Studios', current_retainer: 55000, plan_type: 'growth', active: true, assigned_campaign_manager: 'Sarah K.', reels_per_month: 6, statics_per_month: 10, stories_per_month: 12, shoot_days_per_month: 1, shoot_frequency: 'monthly', orm_required: false, ads_required: true, smm_required: true, gmb_required: true, travel_type: 'none', vendor_budget: 5000, gst_rate: 18, tds_rate: 2, comments: null },
  { id: '3', client_name: 'Zenith Labs', current_retainer: 120000, plan_type: 'premium', active: true, assigned_campaign_manager: 'Raj M.', reels_per_month: 12, statics_per_month: 20, stories_per_month: 30, shoot_days_per_month: 3, shoot_frequency: 'monthly', orm_required: true, ads_required: true, smm_required: true, gmb_required: true, travel_type: 'outstation', vendor_budget: 15000, gst_rate: 18, tds_rate: 2, comments: null },
  { id: '4', client_name: 'Pixel Wave', current_retainer: 35000, plan_type: 'basic', active: true, assigned_campaign_manager: 'Raj M.', reels_per_month: 4, statics_per_month: 8, stories_per_month: 0, shoot_days_per_month: 0, shoot_frequency: 'monthly', orm_required: false, ads_required: false, smm_required: true, gmb_required: false, travel_type: 'none', vendor_budget: 2000, gst_rate: 18, tds_rate: 2, comments: null },
  { id: '5', client_name: 'Bloom Beauty', current_retainer: 65000, plan_type: 'growth', active: true, assigned_campaign_manager: 'Sarah K.', reels_per_month: 8, statics_per_month: 12, stories_per_month: 15, shoot_days_per_month: 2, shoot_frequency: 'alternate', orm_required: false, ads_required: true, smm_required: true, gmb_required: false, travel_type: 'local', vendor_budget: 8000, gst_rate: 18, tds_rate: 2, comments: null },
  { id: '6', client_name: 'Iron Forge Gym', current_retainer: 28000, plan_type: 'basic', active: true, assigned_campaign_manager: 'Raj M.', reels_per_month: 4, statics_per_month: 6, stories_per_month: 10, shoot_days_per_month: 1, shoot_frequency: 'alternate', orm_required: false, ads_required: false, smm_required: true, gmb_required: true, travel_type: 'none', vendor_budget: 0, gst_rate: 18, tds_rate: 2, comments: null },
  { id: '7', client_name: 'CloudSync AI', current_retainer: 95000, plan_type: 'premium', active: true, assigned_campaign_manager: 'Sarah K.', reels_per_month: 10, statics_per_month: 18, stories_per_month: 25, shoot_days_per_month: 2, shoot_frequency: 'monthly', orm_required: true, ads_required: true, smm_required: true, gmb_required: false, travel_type: 'local', vendor_budget: 12000, gst_rate: 18, tds_rate: 2, comments: null },
  { id: '8', client_name: 'Horizon Travels', current_retainer: 42000, plan_type: 'growth', active: false, assigned_campaign_manager: null, reels_per_month: 5, statics_per_month: 8, stories_per_month: 10, shoot_days_per_month: 1, shoot_frequency: 'monthly', orm_required: false, ads_required: true, smm_required: true, gmb_required: false, travel_type: 'none', vendor_budget: 3000, gst_rate: 18, tds_rate: 2, comments: 'Paused' },
];

export const demoEmployees: Employee[] = [
  { id: '1', employee_name: 'Alex Rivera', role_category: 'editor', monthly_salary: 30000, overhead_multiplier_percent: 15, active: true, email: 'alex@agency.com', joining_date: '2024-03-15', salary_day: 1 },
  { id: '2', employee_name: 'Jamie Chen', role_category: 'editor', monthly_salary: 28000, overhead_multiplier_percent: 15, active: true, email: 'jamie@agency.com', joining_date: '2024-06-01', salary_day: 1 },
  { id: '3', employee_name: 'Morgan Lee', role_category: 'designer', monthly_salary: 32000, overhead_multiplier_percent: 15, active: true, email: 'morgan@agency.com', joining_date: '2024-01-10', salary_day: 1 },
  { id: '4', employee_name: 'Sam Patel', role_category: 'designer', monthly_salary: 27000, overhead_multiplier_percent: 15, active: true, email: 'sam@agency.com', joining_date: '2024-08-20', salary_day: 1 },
  { id: '5', employee_name: 'Sarah Kim', role_category: 'campaign_manager', monthly_salary: 40000, overhead_multiplier_percent: 10, active: true, email: 'sarah@agency.com', joining_date: '2023-11-01', salary_day: 1 },
  { id: '6', employee_name: 'Raj Mehta', role_category: 'campaign_manager', monthly_salary: 38000, overhead_multiplier_percent: 10, active: true, email: 'raj@agency.com', joining_date: '2024-02-15', salary_day: 1 },
  { id: '7', employee_name: 'Taylor Swift', role_category: 'ads', monthly_salary: 35000, overhead_multiplier_percent: 10, active: true, email: 'taylor@agency.com', joining_date: '2024-04-01', salary_day: 1 },
  { id: '8', employee_name: 'Chris Jordan', role_category: 'videographer', monthly_salary: 25000, overhead_multiplier_percent: 15, active: true, email: 'chris@agency.com', joining_date: '2024-05-10', salary_day: 1 },
  { id: '9', employee_name: 'Dana Fox', role_category: 'admin_support', monthly_salary: 22000, overhead_multiplier_percent: 10, active: true, email: 'dana@agency.com', joining_date: '2024-07-01', salary_day: 1 },
  { id: '10', employee_name: 'Founder One', role_category: 'founder', monthly_salary: 80000, overhead_multiplier_percent: 0, active: true, email: 'founder@agency.com', joining_date: '2023-01-01', salary_day: 1 },
];

export const demoFixedExpenses: FixedExpense[] = [
  { id: '1', name: 'Office Rent', amount: 45000, category: 'office_infrastructure' },
  { id: '2', name: 'Electricity & Internet', amount: 8000, category: 'office_infrastructure' },
  { id: '3', name: 'Adobe Creative Cloud', amount: 12000, category: 'software_tools' },
  { id: '4', name: 'Canva Pro', amount: 3000, category: 'software_tools' },
  { id: '5', name: 'Meta Business Suite', amount: 5000, category: 'software_tools' },
  { id: '6', name: 'Accountant Fees', amount: 15000, category: 'compliance_legal' },
  { id: '7', name: 'Insurance', amount: 8000, category: 'financial_commitments' },
  { id: '8', name: 'Office Manager', amount: 25000, category: 'core_admin_payroll' },
];

export const demoContracts: Contract[] = [
  { id: '1', client_id: '1', client_name: 'Acme Corp', status: 'active', start_date: '2025-06-01', end_date: '2026-05-31', value: 1020000 },
  { id: '2', client_id: '2', client_name: 'Nova Studios', status: 'active', start_date: '2025-09-01', end_date: '2026-04-15', value: 660000 },
  { id: '3', client_id: '3', client_name: 'Zenith Labs', status: 'active', start_date: '2025-01-01', end_date: '2026-12-31', value: 1440000 },
  { id: '4', client_id: '5', client_name: 'Bloom Beauty', status: 'active', start_date: '2025-10-01', end_date: '2026-03-31', value: 390000 },
  { id: '5', client_id: '7', client_name: 'CloudSync AI', status: 'active', start_date: '2025-04-01', end_date: '2026-03-31', value: 1140000 },
];

export const demoVendors: Vendor[] = [
  { id: '1', name: 'PrintMax Studio', service: 'Print & Merchandise', monthly_cost: 15000, active: true },
  { id: '2', name: 'SoundWave Audio', service: 'Voiceover & Music', monthly_cost: 8000, active: true },
  { id: '3', name: 'DroneShots Pro', service: 'Aerial Photography', monthly_cost: 12000, active: true },
  { id: '4', name: 'WebHost Plus', service: 'Hosting & Domains', monthly_cost: 5000, active: true },
  { id: '5', name: 'Old Vendor Co', service: 'Legacy Services', monthly_cost: 3000, active: false },
];

// Calculation helpers
export function getSalaryPool(employees: Employee[], role: RoleCategory): number {
  return employees
    .filter(e => e.active && e.role_category === role)
    .reduce((sum, e) => sum + e.monthly_salary * (1 + e.overhead_multiplier_percent / 100), 0);
}

export function getActiveCount(employees: Employee[], role: RoleCategory): number {
  return employees.filter(e => e.active && e.role_category === role).length;
}

export interface DerivedPools {
  editor_salary_pool: number;
  designer_salary_pool: number;
  account_mgmt_salary_pool: number;
  ads_salary_pool: number;
  admin_support_salary_pool: number;
  videographer_salary_pool: number;
  cgi_ai_salary_pool: number;
  production_mgr_salary_pool: number;
  founder_salary_pool: number;
  active_editors_count: number;
  active_designers_count: number;
  active_account_mgmt_count: number;
  active_ads_count: number;
  active_admin_support_count: number;
  active_videographers_count: number;
  active_cgi_ai_count: number;
  active_production_mgr_count: number;
  active_founders_count: number;
  reel_capacity_monthly: number;
  static_capacity_monthly: number;
  reel_internal_cost: number;
  static_internal_cost: number;
  base_mgmt_cost_per_client: number;
}

export function derivePools(employees: Employee[], clients: Client[], settings: DbSettings): DerivedPools {
  const activeClients = clients.filter(c => c.active);
  const active_clients_count = activeClients.length || 1;

  const editor_salary_pool = getSalaryPool(employees, 'editor');
  const designer_salary_pool = getSalaryPool(employees, 'designer');
  const account_mgmt_salary_pool = getSalaryPool(employees, 'campaign_manager');
  const ads_salary_pool = getSalaryPool(employees, 'ads');
  const admin_support_salary_pool = getSalaryPool(employees, 'admin_support');
  const videographer_salary_pool = getSalaryPool(employees, 'videographer');
  const cgi_ai_salary_pool = getSalaryPool(employees, 'cgi_ai');
  const production_mgr_salary_pool = getSalaryPool(employees, 'production_manager');
  const founder_salary_pool = getSalaryPool(employees, 'founder');

  const active_editors_count = getActiveCount(employees, 'editor');
  const active_designers_count = getActiveCount(employees, 'designer');
  const active_account_mgmt_count = getActiveCount(employees, 'campaign_manager');
  const active_ads_count = getActiveCount(employees, 'ads');
  const active_admin_support_count = getActiveCount(employees, 'admin_support');
  const active_videographers_count = getActiveCount(employees, 'videographer');
  const active_cgi_ai_count = getActiveCount(employees, 'cgi_ai');
  const active_production_mgr_count = getActiveCount(employees, 'production_manager');
  const active_founders_count = getActiveCount(employees, 'founder');

  const reel_capacity_monthly = active_editors_count * settings.reels_per_editor_per_month;
  const static_capacity_monthly = active_designers_count * settings.statics_per_designer_per_month;

  const reel_internal_cost = reel_capacity_monthly > 0 ? editor_salary_pool / reel_capacity_monthly : 0;
  const static_internal_cost = static_capacity_monthly > 0 ? designer_salary_pool / static_capacity_monthly : 0;
  const base_mgmt_cost_per_client = account_mgmt_salary_pool / active_clients_count;

  return {
    editor_salary_pool, designer_salary_pool, account_mgmt_salary_pool, ads_salary_pool,
    admin_support_salary_pool, videographer_salary_pool, cgi_ai_salary_pool,
    production_mgr_salary_pool, founder_salary_pool,
    active_editors_count, active_designers_count, active_account_mgmt_count,
    active_ads_count, active_admin_support_count, active_videographers_count,
    active_cgi_ai_count, active_production_mgr_count, active_founders_count,
    reel_capacity_monthly, static_capacity_monthly,
    reel_internal_cost, static_internal_cost, base_mgmt_cost_per_client,
  };
}

export function calcClientMargin(
  client: Client,
  pools: DerivedPools,
  settings: DbSettings
): { total_cost: number; margin_percent: number | null; recommended_retainer: number } {
  const reelCost = client.reels_per_month * pools.reel_internal_cost;
  const staticCost = client.statics_per_month * pools.static_internal_cost;
  const shootCost = client.shoot_days_per_month * settings.shoot_day_internal_cost;
  const mgmtCost = pools.base_mgmt_cost_per_client;
  const storyCost = client.stories_per_month > 0 ? mgmtCost * (settings.stories_factor_percent / 100) : 0;
  const total_cost = reelCost + staticCost + shootCost + mgmtCost + storyCost;
  const margin_percent = client.current_retainer > 0 ? ((client.current_retainer - total_cost) / client.current_retainer) * 100 : null;
  const recommended_retainer = total_cost / (1 - settings.target_margin_percent / 100);
  return { total_cost, margin_percent, recommended_retainer };
}

// Currency formatter
export const fmt = (n: number) => '₹' + n.toLocaleString('en-IN', { maximumFractionDigits: 0 });
export const fmtPct = (n: number) => n.toFixed(1) + '%';
