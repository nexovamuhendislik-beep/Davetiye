import type { EventDetails } from "../config";

interface VenueSectionProps {
  event: EventDetails;
}

function getMapEmbedUrl(name: string, address: string) {
  const query = address ? `${name}, ${address}` : name;
  return `https://maps.google.com/maps?q=${encodeURIComponent(query)}&hl=tr&z=15&output=embed`;
}

export function VenueSection({ event }: VenueSectionProps) {
  const { venue } = event;
  const embedUrl = getMapEmbedUrl(venue.name, venue.address);

  return (
    <section className="border-y border-petal/35 bg-ivory/90 px-6 py-16 text-center shadow-sm backdrop-blur-sm">
      <p className="section-sub">Mekan</p>
      <h2 className="section-title mt-2 text-text">
        {event.label} — {venue.name}
      </h2>
      <div className="ornament">✦</div>

      {venue.address && (
        <p className="mt-4 text-sm text-text-muted">Adres: {venue.address}</p>
      )}
      <p className="mt-2 text-sm text-text-muted">{event.displayDate}</p>

      <a
        href={venue.mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="venue-map-card group mx-auto mt-8 block max-w-lg"
        aria-label={`${venue.name} yol tarifi`}
      >
        <div className="venue-map-frame">
          <iframe
            title={`${venue.name} harita`}
            src={embedUrl}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="venue-map-iframe"
          />
          <div className="venue-map-pin" aria-hidden="true">
            <svg viewBox="0 0 24 36" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12 0C5.373 0 0 5.373 0 12c0 9 12 24 12 24s12-15 12-24C24 5.373 18.627 0 12 0z"
                fill="currentColor"
              />
              <circle cx="12" cy="12" r="4.5" fill="#fffdf9" />
            </svg>
          </div>
          <div className="venue-map-overlay">
            <span className="venue-map-cta">Yol Tarifi</span>
          </div>
        </div>
      </a>
    </section>
  );
}
