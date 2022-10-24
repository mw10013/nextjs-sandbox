export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      app_user: {
        Row: {
          email: string;
          role: string;
          app_user_id: number;
          created_at: string;
        };
        Insert: {
          email: string;
          role: string;
          app_user_id?: number;
          created_at?: string;
        };
        Update: {
          email?: string;
          role?: string;
          app_user_id?: number;
          created_at?: string;
        };
      };
      access_user: {
        Row: {
          name: string;
          code: string;
          activate_code_at: string | null;
          expire_code_at: string | null;
          app_user_id: number;
          access_user_id: number;
          description: string;
        };
        Insert: {
          name: string;
          code: string;
          activate_code_at?: string | null;
          expire_code_at?: string | null;
          app_user_id: number;
          access_user_id?: number;
          description?: string;
        };
        Update: {
          name?: string;
          code?: string;
          activate_code_at?: string | null;
          expire_code_at?: string | null;
          app_user_id?: number;
          access_user_id?: number;
          description?: string;
        };
      };
      access_hub: {
        Row: {
          heartbeat_at: string | null;
          app_user_id: number;
          access_hub_id: number;
          name: string;
          description: string;
          api_token: string;
        };
        Insert: {
          heartbeat_at?: string | null;
          app_user_id: number;
          access_hub_id?: number;
          name?: string;
          description?: string;
          api_token?: string;
        };
        Update: {
          heartbeat_at?: string | null;
          app_user_id?: number;
          access_hub_id?: number;
          name?: string;
          description?: string;
          api_token?: string;
        };
      };
      access_point: {
        Row: {
          name: string;
          position: number;
          access_hub_id: number;
          access_point_id: number;
          description: string;
        };
        Insert: {
          name: string;
          position: number;
          access_hub_id: number;
          access_point_id?: number;
          description?: string;
        };
        Update: {
          name?: string;
          position?: number;
          access_hub_id?: number;
          access_point_id?: number;
          description?: string;
        };
      };
      access_point_to_access_user: {
        Row: {
          access_point_id: number;
          access_user_id: number;
        };
        Insert: {
          access_point_id: number;
          access_user_id: number;
        };
        Update: {
          access_point_id?: number;
          access_user_id?: number;
        };
      };
      access_event: {
        Row: {
          at: string;
          access: string;
          code: string;
          access_user_id: number | null;
          access_point_id: number;
          access_event_id: number;
        };
        Insert: {
          at: string;
          access: string;
          code: string;
          access_user_id?: number | null;
          access_point_id: number;
          access_event_id?: number;
        };
        Update: {
          at?: string;
          access?: string;
          code?: string;
          access_user_id?: number | null;
          access_point_id?: number;
          access_event_id?: number;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}

