// ============================================
// ENUMERACIONES
// ============================================

export type TipoPlan = "FREE" | "SOLO" | "PAIR";
export type EstadoSesion = "ACTIVA" | "PAUSADA" | "COMPLETADA" | "CANCELADA";
export type EstadoSolicitud =
  | "PENDIENTE"
  | "APROBADA"
  | "RECHAZADA"
  | "EXPIRADA";
export type EstadoPareja = "PENDIENTE" | "ACTIVA" | "DISUELTA";
export type MotivoDesbloqueo =
  | "EMERGENCIA"
  | "TRABAJO"
  | "REVISION_RAPIDA"
  | "OTRO";
export type TipoNotificacion =
  | "SOLICITUD_DESBLOQUEO"
  | "RESPUESTA_DESBLOQUEO"
  | "SESION_INICIADA"
  | "SESION_COMPLETADA"
  | "INVITACION_PAREJA";

// ============================================
// MODELOS
// ============================================

export interface Profile {
  id: string;
  nombre: string | null;
  avatar_url: string | null;
  fcm_token: string | null;
  plan: TipoPlan;
  creado_en: string;
  actualizado_en: string;
}

export interface Pareja {
  id: string;
  usuario_a_id: string;
  usuario_b_id: string | null;
  estado: EstadoPareja;
  codigo_invitacion: string | null;
  codigo_expires_at: string | null;
  creada_en: string;
}

export interface SesionEnfoque {
  id: string;
  usuario_id: string;
  pareja_id: string | null;
  nombre: string;
  duracion_minutos: number;
  apps_bloqueadas: string[];
  estado: EstadoSesion;
  iniciada_en: string;
  finalizada_en: string | null;
}

export interface SolicitudDesbloqueo {
  id: string;
  sesion_id: string;
  solicitante_id: string;
  aprobador_id: string;
  motivo: MotivoDesbloqueo;
  mensaje: string | null;
  estado: EstadoSolicitud;
  creada_en: string;
  respondida_en: string | null;
}

export interface EstadisticasSesion {
  id: string;
  usuario_id: string;
  total_sesiones: number;
  minutos_enfocados: number;
  racha_actual_dias: number;
  racha_mejor_dias: number;
  solicitudes_desbloqueo: number;
  solicitudes_aprobadas: number;
  solicitudes_rechazadas: number;
  ultima_sesion_en: string | null;
}

// ============================================
// TIPOS DE BASE DE DATOS (Supabase)
// ============================================

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: Partial<Profile> & { id: string };
        Update: Partial<Profile>;
      };
      parejas: {
        Row: Pareja;
        Insert: Partial<Pareja>;
        Update: Partial<Pareja>;
      };
      sesiones_enfoque: {
        Row: SesionEnfoque;
        Insert: Partial<SesionEnfoque>;
        Update: Partial<SesionEnfoque>;
      };
      solicitudes_desbloqueo: {
        Row: SolicitudDesbloqueo;
        Insert: Partial<SolicitudDesbloqueo>;
        Update: Partial<SolicitudDesbloqueo>;
      };
      estadisticas_sesion: {
        Row: EstadisticasSesion;
        Insert: Partial<EstadisticasSesion>;
        Update: Partial<EstadisticasSesion>;
      };
    };
  };
}

// ============================================
// TIPOS DE UI
// ============================================

export interface ApiError {
  message: string;
  code?: string;
}

export interface AuthState {
  user: import("@supabase/supabase-js").User | null;
  profile: Profile | null;
  loading: boolean;
  error: string | null;
}
