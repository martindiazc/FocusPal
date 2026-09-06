import { Session, User } from "@supabase/supabase-js";
import { create } from "zustand";
import { supabase } from "../services/supabase";
import { Profile } from "../types";

interface AuthStore {
  // Estado
  user: User | null;
  profile: Profile | null;
  session: Session | null;
  loading: boolean;
  error: string | null;

  // Acciones
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, nombre: string) => Promise<void>;
  signOut: () => Promise<void>;
  loadSession: () => Promise<void>;
  setProfile: (profile: Profile) => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  profile: null,
  session: null,
  loading: false,
  error: null,

  // Cargar sesión existente al abrir la app
  loadSession: async () => {
    set({ loading: true });
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session?.user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", session.user.id)
          .single();

        set({ user: session.user, session, profile });
      }
    } catch (error) {
      console.error("Error loading session:", error);
    } finally {
      set({ loading: false });
    }
  },

  // Iniciar sesión con email y contraseña
  signIn: async (email: string, password: string) => {
    set({ loading: true, error: null });
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password,
      });
      if (error) throw error;

      // Cargar perfil después del login
      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", data.user.id)
        .single();

      set({ user: data.user, session: data.session, profile });
    } catch (error: any) {
      set({ error: error.message || "Error al iniciar sesión" });
    } finally {
      set({ loading: false });
    }
  },

  // Crear cuenta con email, contraseña y nombre
  signUp: async (email: string, password: string, nombre: string) => {
    set({ loading: true, error: null });
    try {
      const { data, error } = await supabase.auth.signUp({
        email: email.trim().toLowerCase(),
        password,
        options: {
          data: { full_name: nombre },
        },
      });
      if (error) throw error;

      // El trigger de Supabase crea el perfil automáticamente
      // Solo necesitamos esperar un momento y cargarlo
      if (data.user) {
        await new Promise((r) => setTimeout(r, 1000));
        const { data: profile } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", data.user.id)
          .single();

        set({ user: data.user, session: data.session, profile });
      }
    } catch (error: any) {
      set({ error: error.message || "Error al crear la cuenta" });
    } finally {
      set({ loading: false });
    }
  },

  // Cerrar sesión
  signOut: async () => {
    set({ loading: true });
    try {
      await supabase.auth.signOut();
      set({ user: null, profile: null, session: null });
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  setProfile: (profile: Profile) => set({ profile }),
  clearError: () => set({ error: null }),
}));
