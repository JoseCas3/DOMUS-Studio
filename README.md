# DOMUS Studio - Estudio de Arquitectura

Landing page desarrollada como proyecto evaluado sobre el **Dominio del App Router y Gestión de Datos con Next.js**.

## Descripción del Proyecto

DOMUS Studio es una aplicación web moderna que funciona como portafolio y landing page para un estudio de arquitectura ficticio. El proyecto demuestra el uso de:
- **Next.js 16+** (App Router).
- **Rutas Dinámicas** (`/servicios/[slug]` y `/proyectos/[id]`).
- **Supabase** como base de datos serverless (PostgreSQL).
- **Server Components** para el fetching de datos directo desde la base de datos, optimizando SEO y rendimiento.
- Diseño responsivo y moderno utilizando **Tailwind CSS**.

## Instalación Local

Sigue estos pasos para ejecutar el proyecto en tu entorno local:

1. **Clonar el repositorio**
   ```bash
   git clone <url-de-tu-repo>
   cd domus-studio
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar base de datos (Supabase)**
   - Crea un proyecto en [Supabase](https://supabase.com/).
   - Ve a la sección de "SQL Editor" en tu panel de Supabase.
   - Copia y pega el contenido del archivo `supabase_schema.sql` (incluido en la raíz de este proyecto) y ejecútalo. Esto creará las tablas `services` y `projects`, configurará las políticas RLS y poblará la base de datos con datos de ejemplo.

4. **Variables de Entorno**
   - Renombra el archivo `.env.local.example` a `.env.local`.
   - Reemplaza los valores con tus credenciales de Supabase (las encuentras en Project Settings > API).
   ```env
   NEXT_PUBLIC_SUPABASE_URL=tu_url_aqui
   NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key_aqui
   ```

5. **Ejecutar el servidor de desarrollo**
   ```bash
   npm run dev
   ```
   Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver la aplicación.

## Despliegue en Vercel
Para desplegar este proyecto en Vercel:
1. Sube tu código a un repositorio de GitHub.
2. Crea un nuevo proyecto en Vercel e importa tu repositorio.
3. En la configuración de variables de entorno de Vercel, agrega `NEXT_PUBLIC_SUPABASE_URL` y `NEXT_PUBLIC_SUPABASE_ANON_KEY` con tus valores de producción.
4. Haz clic en Deploy.
