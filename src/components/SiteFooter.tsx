export function SiteFooter() {
  return (
    <footer className="border-t border-black/5 py-8">
      <div className="mx-auto flex max-w-6xl items-center justify-center px-6 text-sm text-black/40 sm:justify-between">
        <span>© {new Date().getFullYear()} Amani Joyería · Honduras</span>
      </div>
    </footer>
  );
}
