import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Building2 } from "lucide-react";

// Configuramos la tipografía principal del sitio (Inter) desde Google Fonts
const inter = Inter({ subsets: ["latin"] });

// Metadatos globales para motores de búsqueda (SEO) y la pestaña del navegador
export const metadata: Metadata = {
  title: "DOMUS Studio | Arquitectura y Diseño",
  description: "Estudio de arquitectura en El Salvador especializado en diseño residencial, comercial e interiores.",
};

// RootLayout: Es la plantilla base que envuelve a toda la aplicación.
// Todo lo que pongas aquí (como el menú de navegación y el pie de página)
// se repetirá en todas las páginas del sitio de forma automática.
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={`${inter.className} min-h-screen flex flex-col bg-stone-50 text-stone-900`}>
        {/* ================= BARRA DE NAVEGACIÓN (HEADER) ================= */}
        {/* Se queda fija en la parte superior (sticky) con un efecto de vidrio esmerilado */}
        <header className="sticky top-0 z-50 w-full bg-stone-50/80 backdrop-blur-md border-b border-stone-200">
          <div className="container mx-auto px-4 h-16 flex items-center justify-between">
            {/* Logotipo y nombre del estudio */}
            <Link href="/" className="flex items-center gap-2 text-stone-900 hover:text-stone-600 transition-colors">
              <Building2 className="w-6 h-6" />
              <span className="font-bold text-xl tracking-tight">DOMUS Studio</span>
            </Link>
            {/* Enlaces del menú principal */}
            <nav className="flex gap-6 text-sm font-medium">
              <Link href="/" className="hover:text-stone-500 transition-colors">Inicio</Link>
              <Link href="/#servicios" className="hover:text-stone-500 transition-colors">Servicios</Link>
              <Link href="/#proyectos" className="hover:text-stone-500 transition-colors">Proyectos</Link>
            </nav>
          </div>
        </header>

        {/* ================= CONTENIDO PRINCIPAL ================= */}
        {/* Aquí es donde se renderiza la página actual que esté viendo el usuario (page.tsx) */}
        <main className="flex-1 flex flex-col">
          {children}
        </main>

        {/* ================= PIE DE PÁGINA (FOOTER) ================= */}
        {/* Muestra información de la empresa, enlaces rápidos y datos de contacto */}
        <footer className="bg-stone-900 text-stone-400 py-12">
          <div className="container mx-auto px-4 grid gap-8 md:grid-cols-3">
            {/* Columna 1: Presentación y misión */}
            <div>
              <div className="flex items-center gap-2 text-white mb-4">
                <Building2 className="w-5 h-5" />
                <span className="font-bold text-lg tracking-tight">DOMUS Studio</span>
              </div>
              <p className="text-sm">
                Creando espacios que inspiran y transforman la forma en que vivimos y trabajamos.
              </p>
            </div>
            {/* Columna 2: Enlaces a servicios específicos */}
            <div>
              <h3 className="text-white font-semibold mb-4">Servicios</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/servicios/diseno-arquitectonico" className="hover:text-white transition-colors">Diseño Arquitectónico</Link></li>
                <li><Link href="/servicios/diseno-de-interiores" className="hover:text-white transition-colors">Diseño de Interiores</Link></li>
                <li><Link href="/servicios/construccion" className="hover:text-white transition-colors">Construcción</Link></li>
              </ul>
            </div>
            {/* Columna 3: Información de contacto */}
            <div>
              <h3 className="text-white font-semibold mb-4">Contacto</h3>
              <ul className="space-y-2 text-sm">
                <li>San Salvador, El Salvador</li>
                <li>contacto@domusstudio.com</li>
                <li>+503 2222-3333</li>
              </ul>
            </div>
          </div>
          {/* Fila de derechos de autor con el año actual dinámico */}
          <div className="container mx-auto px-4 mt-8 pt-8 border-t border-stone-800 text-sm text-center">
            © {new Date().getFullYear()} DOMUS Studio. Todos los derechos reservados.
          </div>
        </footer>
      </body>
    </html>
  );
}

