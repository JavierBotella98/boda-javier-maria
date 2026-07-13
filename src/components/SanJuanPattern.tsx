type SanJuanPatternProps = {
  opacity?: number;
  className?: string;
};

// Textura decorativa de fondo inspirada en la fachada de la Iglesia de San
// Juan (Málaga). Colócalo dentro de un contenedor `relative` y pon el
// contenido por encima con `relative z-10`.
export default function SanJuanPattern({
  opacity = 0.16,
  className = "",
}: SanJuanPatternProps) {
  return (
    <div
      aria-hidden
      className={`bg-pattern-sanjuan pointer-events-none absolute inset-0 ${className}`}
      style={{ opacity }}
    />
  );
}
