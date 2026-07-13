export default function AdminFotosPage() {
  const cloudinaryConfigured = Boolean(process.env.CLOUDINARY_CLOUD_NAME);

  return (
    <div>
      <h1 className="mb-4 font-serif text-3xl text-ink">Galería de fotos</h1>
      {cloudinaryConfigured ? (
        <p className="text-ink-soft">
          Cloudinary está configurado. (Subida de fotos pendiente de implementar
          en la fase posterior a la boda.)
        </p>
      ) : (
        <p className="text-ink-soft">
          Esta sección se activará más cerca de la boda, cuando configuréis
          Cloudinary (ver <code>.env.example</code>). Desde aquí podréis subir
          las fotos seleccionadas para que los invitados las vean y descarguen.
        </p>
      )}
    </div>
  );
}
