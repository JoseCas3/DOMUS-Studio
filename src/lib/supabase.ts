import { createClient } from '@supabase/supabase-js';

// Obtenemos las credenciales de conexión guardadas en las variables de entorno (.env.local)
// Estas variables públicas permiten que la aplicación se conecte con tu base de datos de Supabase.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Inicializamos y exportamos el cliente de Supabase.
// Si por alguna razón no existen las credenciales en .env.local, se usan valores de respaldo (placeholders)
// para evitar que el compilador se detenga y permitir que la interfaz muestre mensajes amigables al usuario.
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key'
);

