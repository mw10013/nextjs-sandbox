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
      artist: {
        Row: {
          name: string | null;
          artistid: number;
        };
        Insert: {
          name?: string | null;
          artistid?: number;
        };
        Update: {
          name?: string | null;
          artistid?: number;
        };
      };
      album: {
        Row: {
          title: string | null;
          artistid: number | null;
          albumid: number;
        };
        Insert: {
          title?: string | null;
          artistid?: number | null;
          albumid?: number;
        };
        Update: {
          title?: string | null;
          artistid?: number | null;
          albumid?: number;
        };
      };
      employee: {
        Row: {
          lastname: string | null;
          firstname: string | null;
          title: string | null;
          reportsto: number | null;
          birthdate: string | null;
          hiredate: string | null;
          address: string | null;
          city: string | null;
          state: string | null;
          country: string | null;
          postalcode: string | null;
          phone: string | null;
          fax: string | null;
          email: string | null;
          employeeid: number;
        };
        Insert: {
          lastname?: string | null;
          firstname?: string | null;
          title?: string | null;
          reportsto?: number | null;
          birthdate?: string | null;
          hiredate?: string | null;
          address?: string | null;
          city?: string | null;
          state?: string | null;
          country?: string | null;
          postalcode?: string | null;
          phone?: string | null;
          fax?: string | null;
          email?: string | null;
          employeeid?: number;
        };
        Update: {
          lastname?: string | null;
          firstname?: string | null;
          title?: string | null;
          reportsto?: number | null;
          birthdate?: string | null;
          hiredate?: string | null;
          address?: string | null;
          city?: string | null;
          state?: string | null;
          country?: string | null;
          postalcode?: string | null;
          phone?: string | null;
          fax?: string | null;
          email?: string | null;
          employeeid?: number;
        };
      };
      customer: {
        Row: {
          firstname: string | null;
          lastname: string | null;
          company: string | null;
          address: string | null;
          city: string | null;
          state: string | null;
          country: string | null;
          postalcode: string | null;
          phone: string | null;
          fax: string | null;
          email: string | null;
          supportrepid: number | null;
          customerid: number;
        };
        Insert: {
          firstname?: string | null;
          lastname?: string | null;
          company?: string | null;
          address?: string | null;
          city?: string | null;
          state?: string | null;
          country?: string | null;
          postalcode?: string | null;
          phone?: string | null;
          fax?: string | null;
          email?: string | null;
          supportrepid?: number | null;
          customerid?: number;
        };
        Update: {
          firstname?: string | null;
          lastname?: string | null;
          company?: string | null;
          address?: string | null;
          city?: string | null;
          state?: string | null;
          country?: string | null;
          postalcode?: string | null;
          phone?: string | null;
          fax?: string | null;
          email?: string | null;
          supportrepid?: number | null;
          customerid?: number;
        };
      };
      invoice: {
        Row: {
          customerid: number | null;
          invoicedate: string | null;
          billingaddress: string | null;
          billingcity: string | null;
          billingstate: string | null;
          billingcountry: string | null;
          billingpostalcode: string | null;
          total: number | null;
          invoiceid: number;
        };
        Insert: {
          customerid?: number | null;
          invoicedate?: string | null;
          billingaddress?: string | null;
          billingcity?: string | null;
          billingstate?: string | null;
          billingcountry?: string | null;
          billingpostalcode?: string | null;
          total?: number | null;
          invoiceid?: number;
        };
        Update: {
          customerid?: number | null;
          invoicedate?: string | null;
          billingaddress?: string | null;
          billingcity?: string | null;
          billingstate?: string | null;
          billingcountry?: string | null;
          billingpostalcode?: string | null;
          total?: number | null;
          invoiceid?: number;
        };
      };
      invoiceline: {
        Row: {
          invoiceid: number | null;
          trackid: number | null;
          unitprice: number | null;
          quantity: number | null;
          invoicelineid: number;
        };
        Insert: {
          invoiceid?: number | null;
          trackid?: number | null;
          unitprice?: number | null;
          quantity?: number | null;
          invoicelineid?: number;
        };
        Update: {
          invoiceid?: number | null;
          trackid?: number | null;
          unitprice?: number | null;
          quantity?: number | null;
          invoicelineid?: number;
        };
      };
      track: {
        Row: {
          name: string | null;
          albumid: number | null;
          mediatypeid: number | null;
          genreid: number | null;
          composer: string | null;
          milliseconds: number | null;
          bytes: number | null;
          unitprice: number | null;
          trackid: number;
        };
        Insert: {
          name?: string | null;
          albumid?: number | null;
          mediatypeid?: number | null;
          genreid?: number | null;
          composer?: string | null;
          milliseconds?: number | null;
          bytes?: number | null;
          unitprice?: number | null;
          trackid?: number;
        };
        Update: {
          name?: string | null;
          albumid?: number | null;
          mediatypeid?: number | null;
          genreid?: number | null;
          composer?: string | null;
          milliseconds?: number | null;
          bytes?: number | null;
          unitprice?: number | null;
          trackid?: number;
        };
      };
      playlist: {
        Row: {
          name: string | null;
          playlistid: number;
        };
        Insert: {
          name?: string | null;
          playlistid?: number;
        };
        Update: {
          name?: string | null;
          playlistid?: number;
        };
      };
      playlisttrack: {
        Row: {
          playlistid: number;
          trackid: number;
        };
        Insert: {
          playlistid: number;
          trackid: number;
        };
        Update: {
          playlistid?: number;
          trackid?: number;
        };
      };
      genre: {
        Row: {
          name: string | null;
          genreid: number;
        };
        Insert: {
          name?: string | null;
          genreid?: number;
        };
        Update: {
          name?: string | null;
          genreid?: number;
        };
      };
      mediatype: {
        Row: {
          name: string | null;
          mediatypeid: number;
        };
        Insert: {
          name?: string | null;
          mediatypeid?: number;
        };
        Update: {
          name?: string | null;
          mediatypeid?: number;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      get_all_albums: {
        Args: { artistid: number; OUT: unknown; OUT: unknown };
        Returns: Record<string, unknown>[];
      };
    };
    Enums: {
      [_ in never]: never;
    };
  };
}

