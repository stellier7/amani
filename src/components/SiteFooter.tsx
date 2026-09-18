export function SiteFooter() {
  return (
    <footer className="border-t border-black/5 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-6 text-sm text-black/40 sm:flex-row">
        <span>© {new Date().getFullYear()} Amani Joyería · Honduras</span>
        <span>Envío gratis · Devoluciones en 30 días</span>
      </div>
    </footer>
  );
}
