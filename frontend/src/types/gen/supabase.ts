export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      friends: {
        Row: {
          created_at: string
          from_user_id: number
          id: number
          status: string | null
          to_user_id: number
        }
        Insert: {
          created_at?: string
          from_user_id: number
          id?: number
          status?: string | null
          to_user_id: number
        }
        Update: {
          created_at?: string
          from_user_id?: number
          id?: number
          status?: string | null
          to_user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "friends_from_user_id_fkey"
            columns: ["from_user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "friends_to_user_id_fkey"
            columns: ["to_user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      post_comments: {
        Row: {
          comment: string
          created_at: string
          id: number
          post_id: number
          user_id: number
        }
        Insert: {
          comment: string
          created_at?: string
          id?: number
          post_id: number
          user_id: number
        }
        Update: {
          comment?: string
          created_at?: string
          id?: number
          post_id?: number
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "post_comments_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_comments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      post_likes: {
        Row: {
          created_at: string
          id: number
          post_id: number
          user_id: number
        }
        Insert: {
          created_at?: string
          id?: number
          post_id: number
          user_id: number
        }
        Update: {
          created_at?: string
          id?: number
          post_id?: number
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "post_likes_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "post_likes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      posts: {
        Row: {
          created_at: string
          description: string | null
          id: number
          image: string | null
          user_id: number
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: number
          image?: string | null
          user_id: number
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: number
          image?: string | null
          user_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "posts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      user_profiles: {
        Row: {
          bio: string | null
          created_at: string
          email: string | null
          first_name: string | null
          id: number
          last_name: string | null
          profile: string | null
          user_name: string | null
        }
        Insert: {
          bio?: string | null
          created_at?: string
          email?: string | null
          first_name?: string | null
          id?: number
          last_name?: string | null
          profile?: string | null
          user_name?: string | null
        }
        Update: {
          bio?: string | null
          created_at?: string
          email?: string | null
          first_name?: string | null
          id?: number
          last_name?: string | null
          profile?: string | null
          user_name?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_posts: {
        Args: Record<PropertyKey, never>
        Returns: {
          id: number
          description: string
          image: string
          user_id: number
          user_profiles: Json
          created_at: string
          likes: Json
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
