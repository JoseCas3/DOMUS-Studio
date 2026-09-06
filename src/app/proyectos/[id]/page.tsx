import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, MapPin, Calendar, Building2 } from "lucide-react";

// revalidate = 0 garantiza que siempre veamos los datos más recientes del proyecto
export const revalidate = 0;

// Tipado de las propiedades que recibe la página.
// 'id' corresponde al identificador UUID único del proyecto que viene en la URL.
interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

// ProjectPage: Componente que muestra la vista detallada de un proyecto específico (ej: /proyectos/1111-...).
export default async function ProjectPage({ params }: PageProps) {
  // 1. Extraemos el 'id' del proyecto desde los parámetros de la URL
  const resolvedParams = await params;
  const { id } = resolvedParams;

  // 2. Consultamos la tabla 'projects' buscando ese 'id'.
  // Nota: 'services(title)' hace una relación (JOIN) automática con la tabla 'services'
  // gracias a la clave foránea service_id, permitiéndonos saber el nombre del servicio al que pertenece.
  const { data: project, error } = await supabase
    .from("projects")
    .select("*, services(title)")
    .eq("id", id)
    .single();

  // 3. Si no existe el proyecto o hubo un fallo en la consulta, mostramos la pantalla 404
  if (error || !project) {
    notFound();
  }

  return (
    <div className="flex-1 bg-stone-50">
      <div className="container mx-auto px-4 py-8">
        {/* Enlace para volver a la sección de proyectos en la página principal */}
        <Link href="/#proyectos" className="inline-flex items-center text-stone-500 hover:text-stone-800 mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Volver a proyectos
        </Link>

        {/* Diseño a dos columnas (en pantallas medianas y grandes) */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* ================= COLUMNA IZQUIERDA: IMAGEN DEL PROYECTO ================= */}
          <div className="relative h-[60vh] lg:h-[80vh] rounded-xl overflow-hidden shadow-2xl">
            <Image
              src={project.image_url}
              alt={project.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* ================= COLUMNA DERECHA: INFORMACIÓN Y FICHA TÉCNICA ================= */}
          <div className="flex flex-col justify-center">
            {/* Título principal del proyecto */}
            <h1 className="text-4xl md:text-5xl font-bold text-stone-900 mb-6">{project.title}</h1>
            
            {/* Barra de metadatos destacados (Ubicación, Categoría de servicio y Año) */}
            <div className="flex flex-col sm:flex-row gap-6 mb-8 text-stone-600 border-y border-stone-200 py-6">
              {/* Ubicación física */}
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-stone-400" />
                <span>{project.location}</span>
              </div>
              {/* Servicio asociado */}
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-stone-400" />
                <span>{project.services?.title || "Proyecto"}</span>
              </div>
              {/* Año de finalización (solo si fue definido en la base de datos) */}
              {project.completion_date && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-stone-400" />
                  <span>{new Date(project.completion_date).getFullYear()}</span>
                </div>
              )}
            </div>

            {/* Descripción textual completa de la obra */}
            <div className="prose prose-stone text-stone-700">
              <p className="text-lg leading-relaxed whitespace-pre-wrap">{project.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

