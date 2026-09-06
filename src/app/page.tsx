import { supabase } from "@/lib/supabase";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

// revalidate = 0 le indica a Next.js que no guarde esta página en caché estática.
// Cada vez que un usuario entre o recargue, se consultará la base de datos para traer la información más reciente.
export const revalidate = 0;

// Home: Es el componente principal de la página de inicio (Landing Page).
// Al ser una función 'async', se ejecuta directamente en el servidor (React Server Component),
// lo que permite consultar la base de datos de forma segura y rápida antes de enviar el HTML al navegador.
export default async function Home() {
  // 1. Consultamos los primeros 3 servicios guardados en la tabla 'services' de Supabase
  const { data: services, error: servicesError } = await supabase
    .from("services")
    .select("id, slug, title, short_description, image_url")
    .order("created_at", { ascending: true })
    .limit(3);

  // 2. Consultamos los 4 proyectos más recientes guardados en la tabla 'projects' de Supabase
  const { data: projects, error: projectsError } = await supabase
    .from("projects")
    .select("id, title, location, image_url")
    .order("created_at", { ascending: false })
    .limit(4);

  return (
    <div className="flex flex-col">
      {/* ================= SECCIÓN HERO (PORTADA PRINCIPAL) ================= */}
      {/* Contiene la imagen de fondo con oscurecimiento, el eslogan y los botones de acción rápida */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Imagen de fondo optimizada con Next/Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000&auto=format&fit=crop"
            alt="Hero Architecture"
            fill
            className="object-cover brightness-[0.3]"
            priority
          />
        </div>
        {/* Texto principal y botones centrados sobre la imagen */}
        <div className="container mx-auto px-4 z-10 text-center text-white">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            Diseño que <span className="text-stone-300">Inspira</span>
          </h1>
          <p className="text-lg md:text-xl text-stone-200 max-w-2xl mx-auto mb-10">
            Somos DOMUS Studio, un estudio de arquitectura en El Salvador dedicado a crear espacios únicos que combinan estética, funcionalidad y sostenibilidad.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="#proyectos" 
              className="bg-white text-stone-900 px-8 py-3 rounded-none font-medium hover:bg-stone-200 transition-colors"
            >
              Ver Proyectos
            </Link>
            <Link 
              href="#servicios" 
              className="border border-white text-white px-8 py-3 rounded-none font-medium hover:bg-white/10 transition-colors"
            >
              Nuestros Servicios
            </Link>
          </div>
        </div>
      </section>

      {/* ================= SECCIÓN DE SERVICIOS ================= */}
      {/* Muestra las tarjetas de los servicios que ofrece el estudio de arquitectura */}
      <section id="servicios" className="py-24 bg-stone-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Nuestros Servicios</h2>
            <p className="text-stone-600 max-w-2xl mx-auto">
              Ofrecemos soluciones integrales para tus proyectos, desde la concepción del diseño hasta la ejecución final de la obra.
            </p>
          </div>

          {/* Si ocurrió un error con Supabase o no hay registros, mostramos un mensaje de aviso amigable */}
          {!services || servicesError ? (
            <div className="text-center text-stone-500 py-12">
              <p>Conecta tu base de datos Supabase para ver los servicios.</p>
            </div>
          ) : (
            /* Si hay datos, mostramos los servicios en una cuadrícula de 3 columnas */
            <div className="grid md:grid-cols-3 gap-8">
              {services.map((service) => (
                <Link href={`/servicios/${service.slug}`} key={service.id} className="group">
                  <div className="relative h-64 mb-6 overflow-hidden">
                    <Image
                      src={service.image_url}
                      alt={service.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-stone-600 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-stone-600 mb-4 line-clamp-2">
                    {service.short_description}
                  </p>
                  <span className="flex items-center text-sm font-medium uppercase tracking-wider gap-2">
                    Conocer más <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ================= SECCIÓN DE PROYECTOS DESTACADOS ================= */}
      {/* Muestra una galería interactiva con los trabajos más representativos */}
      <section id="proyectos" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-4">Proyectos Destacados</h2>
              <p className="text-stone-600">Descubre algunos de nuestros trabajos más recientes.</p>
            </div>
          </div>

          {/* Mensaje de respaldo si no hay proyectos cargados desde la base de datos */}
          {!projects || projectsError ? (
            <div className="text-center text-stone-500 py-12 border border-dashed border-stone-200">
              <p>Conecta tu base de datos Supabase para ver los proyectos.</p>
            </div>
          ) : (
            /* Cuadrícula de 2 columnas con tarjetas de proyectos e información al hacer hover */
            <div className="grid md:grid-cols-2 gap-4">
              {projects.map((project) => (
                <Link href={`/proyectos/${project.id}`} key={project.id} className="group block relative overflow-hidden h-80 md:h-96">
                  <Image
                    src={project.image_url}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Gradiente oscuro inferior para que el texto sea legible sobre la imagen */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-0 left-0 p-8 w-full translate-y-4 group-hover:translate-y-0 transition-transform">
                    <p className="text-stone-300 text-sm mb-2 font-medium">{project.location}</p>
                    <h3 className="text-white text-2xl font-bold">{project.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

