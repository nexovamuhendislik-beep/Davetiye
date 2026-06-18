export type EventKey = "kina" | "dugun";

export interface ScheduleItem {
  time: string;
  label: string;
}

export interface EventDetails {
  key: EventKey;
  label: string;
  day: string;
  month: string;
  year: string;
  displayDate: string;
  date: string;
  venue: {
    name: string;
    address: string;
    mapsUrl: string;
  };
  schedule: ScheduleItem[];
}

export const couple = {
  bride: "Gülsena",
  groom: "Yusuf",
};

export const tagline = "Evleniyoruz!";

/** Geri sayım hedefi — düğün başlangıcı */
export const countdownTarget = "2026-07-07T19:00:00+03:00";

export const invitationLetter = {
  greeting: "Sevgili dostlarımız ve ailemiz,",
  body: "Bu mutlu günümüzde yanımızda olmanız bizim için çok değerli. Sevgi ve desteğiniz hayatımızın en güzel hediyesi. Birlikte kutlamak için sizi davet etmekten mutluluk duyarız.",
};

export const families = {
  groom: {
    label: "Damat Ailesi",
    members: ["Ramazan", "Nafiye Bilen"],
  },
  bride: {
    label: "Gelin Ailesi",
    members: ["Osman", "Havva Yerebasmaz"],
  },
};

export const musicSrc = "";
export const videoSrc = "";

export const events: EventDetails[] = [
  {
    key: "kina",
    label: "Kına",
    day: "06",
    month: "Temmuz",
    year: "2026",
    displayDate: "6 Temmuz 2026, Pazartesi",
    date: "2026-07-06T19:00:00+03:00",
    venue: {
      name: "Asden Davet Evi",
      address: "",
      mapsUrl:
        "https://www.google.com/maps/search/?api=1&query=Asden+Davet+Evi",
    },
    schedule: [
      { time: "19:00", label: "Kına Başlangıcı" },
      { time: "20:00", label: "Damat Girişi" },
      { time: "21:00", label: "Kına Yakımı" },
      { time: "22:00", label: "After Girişi" },
      { time: "23:00", label: "Kapanış" },
    ],
  },
  {
    key: "dugun",
    label: "Düğün",
    day: "07",
    month: "Temmuz",
    year: "2026",
    displayDate: "7 Temmuz 2026, Salı",
    date: "2026-07-07T19:00:00+03:00",
    venue: {
      name: "Vadi Royal Düğün Salonu",
      address: "",
      mapsUrl:
        "https://www.google.com/maps/search/?api=1&query=Vadi+Royal+Düğün+Salonu",
    },
    schedule: [
      { time: "18:00", label: "Gelin Alma" },
      { time: "19:00", label: "Düğün Başlangıcı" },
      { time: "20:00", label: "Gelin Damat Dansı" },
      { time: "21:00", label: "Nikah Töreni" },
      { time: "22:00", label: "Düğün Pastası Kesimi" },
      { time: "22:15", label: "Takı Töreni" },
      { time: "23:00", label: "Kapanış" },
    ],
  },
];
