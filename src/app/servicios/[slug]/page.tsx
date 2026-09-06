import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

// revalidate = 0 asegura que los detalles del servicio siempre se obtengan frescos desde la base de datos
export const revalidate = 0;

// Tipado de las propiedades que recibe esta página.
// En Next.js 15+, los parámetros de ruta dinámica (params) se entregan como una Promesa que debe resolverse con 'await'.
interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

// ServicePage: Componente que muestra la página individual y detallada de un servicio (ej: /servicios/diseno-arquitectonico).
export default async function ServicePage({ params }: PageProps) {
  // 1. Obtenemos el 'slug' (identificador amigable) desde la URL actual
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  
  // 2. Buscamos en la tabla 'services' de Supabase el registro que coincida exactamente con ese slug
  const { data: service, error } = await supabase
    .from("services")
    .select("*")
    .eq("slug", slug)
    .single();

  // 3. Si no existe ningún servicio con ese slug o hubo un error, enviamos al usuario a la página 404 (No encontrado)
  if (error || !service) {
    notFound();
  }

  return (
    <div className="flex-1 bg-white">
      {/* ================= HERO DEL SERVICIO ================= */}
      {/* Portada superior con la imagen del servicio oscurecida, botón de regreso y título */}
      <div className="relative h-[50vh] flex items-end">
        {/* Imagen de fondo del servicio */}
        <div className="absolute inset-0 z-0">
          <Image
            src={service.image_url}
            alt={service.title}
            fill
            className="object-cover brightness-50"
            priority
          />
        </div>
        {/* Botón para regresar a la página de inicio y encabezados */}
        <div className="container mx-auto px-4 relative z-10 pb-12">
          <Link href="/#servicios" className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Volver a servicios
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{service.title}</h1>
          <p className="text-xl text-stone-200 max-w-2xl">{service.short_description}</p>
        </div>
      </div>

      {/* ================= CONTENIDO DETALLADO ================= */}
      {/* Muestra la explicación extensa de lo que abarca este servicio */}
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-stone-900">Sobre este servicio</h2>
          <div className="prose prose-stone lg:prose-lg text-stone-700">
            <p className="whitespace-pre-wrap">{service.content}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

