const IAGO_DIGITAL_URL = "https://iagodigital.vercel.app";

export function SiteFooter() {
  return (
    <footer className="border-t border-black/5 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-6 text-sm text-black/40 sm:flex-row sm:justify-between sm:gap-4">
        <span>© {new Date().getFullYear()} Amani Joyería · Honduras</span>
        <p className="text-[10.5px] text-black/35">
          Desarrollado por{" "}
          <a
            href={IAGO_DIGITAL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-black/50 transition-colors hover:text-black"
          >
            IAGO Digital
          </a>
        </p>
      </div>
    </footer>
  );
}
