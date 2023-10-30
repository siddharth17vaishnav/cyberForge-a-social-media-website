export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
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
            foreignKeyName: 'post_comments_post_id_fkey'
            columns: ['post_id']
            referencedRelation: 'post_likes'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'post_comments_user_id_fkey'
            columns: ['user_id']
            referencedRelation: 'user_profiles'
            referencedColumns: ['id']
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
            foreignKeyName: 'post_likes_post_id_fkey'
            columns: ['post_id']
            referencedRelation: 'posts'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'post_likes_user_id_fkey'
            columns: ['user_id']
            referencedRelation: 'user_profiles'
            referencedColumns: ['id']
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
            foreignKeyName: 'posts_user_id_fkey'
            columns: ['user_id']
            referencedRelation: 'user_profiles'
            referencedColumns: ['id']
          }
        ]
      }
      user_profiles: {
        Row: {
          created_at: string
          email: string | null
          first_name: string | null
          id: number
          last_name: string | null
          profile: string | null
          user_name: string | null
        }
        Insert: {
          created_at?: string
          email?: string | null
          first_name?: string | null
          id?: number
          last_name?: string | null
          profile?: string | null
          user_name?: string | null
        }
        Update: {
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
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
