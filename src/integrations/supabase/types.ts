export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      addon_features: {
        Row: {
          active: boolean
          billing_type: string
          category: string
          created_at: string
          description: string
          id: string
          name: string
          price: number
          slug: string
        }
        Insert: {
          active?: boolean
          billing_type?: string
          category?: string
          created_at?: string
          description?: string
          id?: string
          name: string
          price?: number
          slug: string
        }
        Update: {
          active?: boolean
          billing_type?: string
          category?: string
          created_at?: string
          description?: string
          id?: string
          name?: string
          price?: number
          slug?: string
        }
        Relationships: []
      }
      clients: {
        Row: {
          active: boolean
          ads_required: boolean
          assigned_campaign_manager: string | null
          client_name: string
          comments: string | null
          created_at: string
          created_by: string | null
          current_retainer: number
          gmb_required: boolean
          gst_rate: number
          id: string
          orm_required: boolean
          plan_type: string
          reels_per_month: number
          shoot_days_per_month: number
          shoot_frequency: string
          smm_required: boolean
          statics_per_month: number
          stories_per_month: number
          tds_rate: number
          tenant_id: string
          travel_type: string
          updated_at: string
          vendor_budget: number
        }
        Insert: {
          active?: boolean
          ads_required?: boolean
          assigned_campaign_manager?: string | null
          client_name: string
          comments?: string | null
          created_at?: string
          created_by?: string | null
          current_retainer?: number
          gmb_required?: boolean
          gst_rate?: number
          id?: string
          orm_required?: boolean
          plan_type?: string
          reels_per_month?: number
          shoot_days_per_month?: number
          shoot_frequency?: string
          smm_required?: boolean
          statics_per_month?: number
          stories_per_month?: number
          tds_rate?: number
          tenant_id: string
          travel_type?: string
          updated_at?: string
          vendor_budget?: number
        }
        Update: {
          active?: boolean
          ads_required?: boolean
          assigned_campaign_manager?: string | null
          client_name?: string
          comments?: string | null
          created_at?: string
          created_by?: string | null
          current_retainer?: number
          gmb_required?: boolean
          gst_rate?: number
          id?: string
          orm_required?: boolean
          plan_type?: string
          reels_per_month?: number
          shoot_days_per_month?: number
          shoot_frequency?: string
          smm_required?: boolean
          statics_per_month?: number
          stories_per_month?: number
          tds_rate?: number
          tenant_id?: string
          travel_type?: string
          updated_at?: string
          vendor_budget?: number
        }
        Relationships: [
          {
            foreignKeyName: "clients_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      contracts: {
        Row: {
          client_id: string | null
          client_name: string
          created_at: string
          created_by: string | null
          end_date: string | null
          id: string
          start_date: string
          status: string
          tenant_id: string
          updated_at: string
          value: number
        }
        Insert: {
          client_id?: string | null
          client_name: string
          created_at?: string
          created_by?: string | null
          end_date?: string | null
          id?: string
          start_date: string
          status?: string
          tenant_id: string
          updated_at?: string
          value?: number
        }
        Update: {
          client_id?: string | null
          client_name?: string
          created_at?: string
          created_by?: string | null
          end_date?: string | null
          id?: string
          start_date?: string
          status?: string
          tenant_id?: string
          updated_at?: string
          value?: number
        }
        Relationships: [
          {
            foreignKeyName: "contracts_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contracts_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      employees: {
        Row: {
          active: boolean
          created_at: string
          created_by: string | null
          email: string | null
          employee_name: string
          id: string
          joining_date: string | null
          monthly_salary: number
          overhead_multiplier_percent: number
          role_category: string
          salary_day: number | null
          tenant_id: string
          updated_at: string
        }
        Insert: {
          active?: boolean
          created_at?: string
          created_by?: string | null
          email?: string | null
          employee_name: string
          id?: string
          joining_date?: string | null
          monthly_salary?: number
          overhead_multiplier_percent?: number
          role_category?: string
          salary_day?: number | null
          tenant_id: string
          updated_at?: string
        }
        Update: {
          active?: boolean
          created_at?: string
          created_by?: string | null
          email?: string | null
          employee_name?: string
          id?: string
          joining_date?: string | null
          monthly_salary?: number
          overhead_multiplier_percent?: number
          role_category?: string
          salary_day?: number | null
          tenant_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "employees_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      fixed_expenses: {
        Row: {
          amount: number
          category: string
          created_at: string
          created_by: string | null
          id: string
          name: string
          tenant_id: string
          updated_at: string
        }
        Insert: {
          amount?: number
          category?: string
          created_at?: string
          created_by?: string | null
          id?: string
          name: string
          tenant_id: string
          updated_at?: string
        }
        Update: {
          amount?: number
          category?: string
          created_at?: string
          created_by?: string | null
          id?: string
          name?: string
          tenant_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "fixed_expenses_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      platform_admins: {
        Row: {
          created_at: string
          id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          active: boolean
          avatar_url: string | null
          created_at: string
          email: string
          full_name: string
          id: string
          onboarding_completed: boolean
          tenant_id: string
          updated_at: string
        }
        Insert: {
          active?: boolean
          avatar_url?: string | null
          created_at?: string
          email?: string
          full_name?: string
          id: string
          onboarding_completed?: boolean
          tenant_id: string
          updated_at?: string
        }
        Update: {
          active?: boolean
          avatar_url?: string | null
          created_at?: string
          email?: string
          full_name?: string
          id?: string
          onboarding_completed?: boolean
          tenant_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      support_tickets: {
        Row: {
          admin_response: string | null
          category: string
          created_at: string
          created_by: string
          description: string
          id: string
          priority: string
          resolved_at: string | null
          status: string
          subject: string
          tenant_id: string
          updated_at: string
        }
        Insert: {
          admin_response?: string | null
          category?: string
          created_at?: string
          created_by: string
          description: string
          id?: string
          priority?: string
          resolved_at?: string | null
          status?: string
          subject: string
          tenant_id: string
          updated_at?: string
        }
        Update: {
          admin_response?: string | null
          category?: string
          created_at?: string
          created_by?: string
          description?: string
          id?: string
          priority?: string
          resolved_at?: string | null
          status?: string
          subject?: string
          tenant_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "support_tickets_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      team_invitations: {
        Row: {
          accepted: boolean
          created_at: string
          email: string
          id: string
          invited_by: string | null
          role: Database["public"]["Enums"]["tenant_role"]
          tenant_id: string
        }
        Insert: {
          accepted?: boolean
          created_at?: string
          email: string
          id?: string
          invited_by?: string | null
          role?: Database["public"]["Enums"]["tenant_role"]
          tenant_id: string
        }
        Update: {
          accepted?: boolean
          created_at?: string
          email?: string
          id?: string
          invited_by?: string | null
          role?: Database["public"]["Enums"]["tenant_role"]
          tenant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "team_invitations_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      tenant_addons: {
        Row: {
          activated_at: string
          activated_by: string
          active: boolean
          addon_id: string
          expires_at: string | null
          id: string
          stripe_payment_id: string | null
          tenant_id: string
        }
        Insert: {
          activated_at?: string
          activated_by?: string
          active?: boolean
          addon_id: string
          expires_at?: string | null
          id?: string
          stripe_payment_id?: string | null
          tenant_id: string
        }
        Update: {
          activated_at?: string
          activated_by?: string
          active?: boolean
          addon_id?: string
          expires_at?: string | null
          id?: string
          stripe_payment_id?: string | null
          tenant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "tenant_addons_addon_id_fkey"
            columns: ["addon_id"]
            isOneToOne: false
            referencedRelation: "addon_features"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tenant_addons_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      tenant_settings: {
        Row: {
          ads_accounts_capacity_per_ads_person: number
          business_type: string
          created_at: string
          currency: string
          currency_symbol: string
          id: string
          reels_per_editor_per_month: number
          shoot_day_internal_cost: number
          statics_per_designer_per_month: number
          stories_factor_percent: number
          target_margin_percent: number
          tax_mode: string
          tenant_id: string
          updated_at: string
          videographer_shoots_per_month: number
        }
        Insert: {
          ads_accounts_capacity_per_ads_person?: number
          business_type?: string
          created_at?: string
          currency?: string
          currency_symbol?: string
          id?: string
          reels_per_editor_per_month?: number
          shoot_day_internal_cost?: number
          statics_per_designer_per_month?: number
          stories_factor_percent?: number
          target_margin_percent?: number
          tax_mode?: string
          tenant_id: string
          updated_at?: string
          videographer_shoots_per_month?: number
        }
        Update: {
          ads_accounts_capacity_per_ads_person?: number
          business_type?: string
          created_at?: string
          currency?: string
          currency_symbol?: string
          id?: string
          reels_per_editor_per_month?: number
          shoot_day_internal_cost?: number
          statics_per_designer_per_month?: number
          stories_factor_percent?: number
          target_margin_percent?: number
          tax_mode?: string
          tenant_id?: string
          updated_at?: string
          videographer_shoots_per_month?: number
        }
        Relationships: [
          {
            foreignKeyName: "tenant_settings_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: true
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      tenants: {
        Row: {
          company_name: string
          created_at: string
          current_period_end: string | null
          id: string
          logo_url: string | null
          owner_user_id: string | null
          slug: string
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          subscription_plan: Database["public"]["Enums"]["subscription_plan"]
          subscription_status: Database["public"]["Enums"]["subscription_status"]
          trial_ends_at: string | null
          updated_at: string
        }
        Insert: {
          company_name: string
          created_at?: string
          current_period_end?: string | null
          id?: string
          logo_url?: string | null
          owner_user_id?: string | null
          slug: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          subscription_plan?: Database["public"]["Enums"]["subscription_plan"]
          subscription_status?: Database["public"]["Enums"]["subscription_status"]
          trial_ends_at?: string | null
          updated_at?: string
        }
        Update: {
          company_name?: string
          created_at?: string
          current_period_end?: string | null
          id?: string
          logo_url?: string | null
          owner_user_id?: string | null
          slug?: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          subscription_plan?: Database["public"]["Enums"]["subscription_plan"]
          subscription_status?: Database["public"]["Enums"]["subscription_status"]
          trial_ends_at?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["tenant_role"]
          tenant_id: string
          user_id: string
        }
        Insert: {
          id?: string
          role?: Database["public"]["Enums"]["tenant_role"]
          tenant_id: string
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["tenant_role"]
          tenant_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_roles_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      vendors: {
        Row: {
          active: boolean
          created_at: string
          created_by: string | null
          id: string
          monthly_cost: number
          name: string
          service: string
          tenant_id: string
          updated_at: string
        }
        Insert: {
          active?: boolean
          created_at?: string
          created_by?: string | null
          id?: string
          monthly_cost?: number
          name: string
          service?: string
          tenant_id: string
          updated_at?: string
        }
        Update: {
          active?: boolean
          created_at?: string
          created_by?: string | null
          id?: string
          monthly_cost?: number
          name?: string
          service?: string
          tenant_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "vendors_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      admin_activate_addon: {
        Args: { _activated_by?: string; _addon_id: string; _tenant_id: string }
        Returns: undefined
      }
      admin_activate_tenant: {
        Args: { _tenant_id: string }
        Returns: undefined
      }
      admin_create_addon: {
        Args: {
          _billing_type: string
          _category: string
          _description: string
          _name: string
          _price: number
          _slug: string
        }
        Returns: string
      }
      admin_deactivate_addon: {
        Args: { _addon_id: string; _tenant_id: string }
        Returns: undefined
      }
      admin_get_stats: { Args: never; Returns: Json }
      admin_list_addons: {
        Args: never
        Returns: {
          activation_count: number
          active: boolean
          billing_type: string
          category: string
          description: string
          id: string
          name: string
          price: number
          slug: string
        }[]
      }
      admin_list_tenants: {
        Args: never
        Returns: {
          company_name: string
          created_at: string
          id: string
          member_count: number
          owner_email: string
          slug: string
          subscription_plan: string
          subscription_status: string
          trial_ends_at: string
        }[]
      }
      admin_list_tickets: {
        Args: never
        Returns: {
          admin_response: string
          category: string
          created_at: string
          description: string
          id: string
          priority: string
          reporter_email: string
          reporter_name: string
          resolved_at: string
          status: string
          subject: string
          tenant_name: string
        }[]
      }
      admin_list_users: {
        Args: never
        Returns: {
          active: boolean
          created_at: string
          email: string
          full_name: string
          id: string
          role: string
          tenant_name: string
        }[]
      }
      admin_respond_ticket: {
        Args: { _response: string; _status?: string; _ticket_id: string }
        Returns: undefined
      }
      admin_suspend_tenant: { Args: { _tenant_id: string }; Returns: undefined }
      admin_tenant_addons: {
        Args: { _tenant_id: string }
        Returns: {
          activated_at: string
          activated_by: string
          addon_id: string
          addon_name: string
          addon_slug: string
          is_active: boolean
        }[]
      }
      admin_update_tenant_plan: {
        Args: {
          _plan: Database["public"]["Enums"]["subscription_plan"]
          _tenant_id: string
        }
        Returns: undefined
      }
      check_pending_invitation: { Args: never; Returns: Json }
      complete_onboarding: {
        Args: {
          _business_type?: string
          _currency?: string
          _currency_symbol?: string
          _target_margin?: number
          _tax_mode?: string
        }
        Returns: undefined
      }
      get_user_tenant_id: { Args: { _user_id: string }; Returns: string }
      has_tenant_role: {
        Args: {
          _role: Database["public"]["Enums"]["tenant_role"]
          _user_id: string
        }
        Returns: boolean
      }
      invite_team_member: {
        Args: {
          _email: string
          _role?: Database["public"]["Enums"]["tenant_role"]
        }
        Returns: string
      }
      is_platform_admin: { Args: { _user_id: string }; Returns: boolean }
      is_tenant_admin: { Args: { _user_id: string }; Returns: boolean }
      join_tenant_by_invitation: {
        Args: { _full_name: string }
        Returns: string
      }
      remove_team_member: { Args: { _user_id: string }; Returns: undefined }
      setup_new_tenant: {
        Args: { _company_name: string; _full_name: string }
        Returns: string
      }
      tenant_has_addon: {
        Args: { _addon_slug: string; _tenant_id: string }
        Returns: boolean
      }
      update_member_role: {
        Args: {
          _new_role: Database["public"]["Enums"]["tenant_role"]
          _user_id: string
        }
        Returns: undefined
      }
    }
    Enums: {
      subscription_plan: "starter" | "growth" | "pro"
      subscription_status:
        | "trialing"
        | "active"
        | "past_due"
        | "canceled"
        | "inactive"
      tenant_role: "owner" | "admin" | "finance" | "viewer"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      subscription_plan: ["starter", "growth", "pro"],
      subscription_status: [
        "trialing",
        "active",
        "past_due",
        "canceled",
        "inactive",
      ],
      tenant_role: ["owner", "admin", "finance", "viewer"],
    },
  },
} as const
