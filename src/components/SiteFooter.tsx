import {
  PHONE_DISPLAY,
  PHONE_E164,
  SERVICE_CITIES,
  SITE_NAME,
  WHATSAPP_URL,
} from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-black/5 py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 text-sm text-black/50 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-2">
          <p className="font-medium text-black/70">
            {SITE_NAME} · Honduras
          </p>
          <p>
            Envíos a todo el país · {SERVICE_CITIES.join(" · ")}
          </p>
          <p>Envío gratis · Devoluciones en 30 días</p>
        </div>
        <div className="space-y-2 sm:text-right">
          <p className="text-[10px] uppercase tracking-[0.2em] text-black/35">
            Pedidos y consultas
          </p>
          <a
            href={`tel:${PHONE_E164}`}
            className="block transition-colors hover:text-black"
          >
            {PHONE_DISPLAY}
          </a>
          <a
            href={WHATSAPP_URL}
            className="block transition-colors hover:text-black"
            rel="noopener noreferrer"
            target="_blank"
          >
            WhatsApp
          </a>
        </div>
      </div>
      <div className="mx-auto mt-8 max-w-6xl px-6 text-xs text-black/35">
        © {new Date().getFullYear()} {SITE_NAME}
      </div>
    </footer>
  );
}
