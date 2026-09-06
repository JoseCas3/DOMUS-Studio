-- Supabase Schema for DOMUS Studio

-- 1. Create Services Table
CREATE TABLE IF NOT EXISTS public.services (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    short_description TEXT NOT NULL,
    content TEXT NOT NULL,
    image_url TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create Projects Table
CREATE TABLE IF NOT EXISTS public.projects (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    service_id UUID REFERENCES public.services(id) ON DELETE CASCADE,
    location TEXT NOT NULL,
    image_url TEXT NOT NULL,
    completion_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Row Level Security (RLS) Policies
-- Habilitar RLS en ambas tablas
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Políticas para lectura pública (SELECT)
CREATE POLICY "Servicios son públicos" 
ON public.services FOR SELECT 
TO public 
USING (true);

CREATE POLICY "Proyectos son públicos" 
ON public.projects FOR SELECT 
TO public 
USING (true);

-- 4. Sample Data (Semilla)
-- Insertar Servicios
INSERT INTO public.services (id, slug, title, short_description, content, image_url) VALUES
('11111111-1111-1111-1111-111111111111', 'diseno-arquitectonico', 'Diseño Arquitectónico', 'Diseños innovadores y funcionales.', 'Creamos espacios que inspiran. Nuestro equipo de arquitectos desarrolla conceptos únicos adaptados a las necesidades de cada cliente, integrando estética, funcionalidad y sostenibilidad.', 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1200&auto=format&fit=crop'),
('22222222-2222-2222-2222-222222222222', 'diseno-de-interiores', 'Diseño de Interiores', 'Transformamos espacios interiores.', 'Damos vida a tus interiores mediante la selección cuidadosa de materiales, mobiliario y la correcta iluminación. Creamos ambientes que reflejan tu personalidad.', 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200&auto=format&fit=crop'),
('33333333-3333-3333-3333-333333333333', 'construccion', 'Construcción y Supervisión', 'Ejecución de obra con los más altos estándares.', 'Llevamos tus proyectos de la pantalla a la realidad. Nuestro servicio de construcción garantiza calidad y cumplimiento de tiempos y presupuestos.', 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1200&auto=format&fit=crop');

-- Insertar Proyectos
INSERT INTO public.projects (title, description, service_id, location, image_url, completion_date) VALUES
('Casa Bosque Real', 'Residencia moderna integrada con la naturaleza.', '11111111-1111-1111-1111-111111111111', 'San Salvador, El Salvador', 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200&auto=format&fit=crop', '2023-05-15'),
('Oficinas Tech Hub', 'Remodelación completa para espacio de coworking.', '22222222-2222-2222-2222-222222222222', 'Santa Tecla, El Salvador', 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop', '2023-11-20'),
('Edificio de Apartamentos Vistas', 'Diseño arquitectónico de torre residencial de 12 niveles.', '11111111-1111-1111-1111-111111111111', 'San Salvador, El Salvador', 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1200&auto=format&fit=crop', '2024-02-10'),
('Restaurante La Cúspide', 'Diseño de interiores para restaurante de alta cocina.', '22222222-2222-2222-2222-222222222222', 'Antiguo Cuscatlán, El Salvador', 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=1200&auto=format&fit=crop', '2023-08-30'),
('Plaza Comercial El Encuentro', 'Construcción desde cero de un moderno centro comercial al aire libre.', '33333333-3333-3333-3333-333333333333', 'Lourdes, El Salvador', 'https://images.unsplash.com/photo-1519999482648-25049ddd37b1?q=80&w=1200&auto=format&fit=crop', '2022-12-05');
