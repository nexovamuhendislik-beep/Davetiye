import { useEffect, useState } from "react";
import { events } from "./config";
import { CountdownSection } from "./components/CountdownSection";
import { EnvelopeScene } from "./components/EnvelopeScene";
import { FallingFlowers } from "./components/FallingFlowers";
import { FamilySection } from "./components/FamilySection";
import { Footer } from "./components/Footer";
import { HeroSection } from "./components/HeroSection";
import { InvitationMessage } from "./components/InvitationMessage";
import { MusicPlayer } from "./components/MusicPlayer";
import { ScheduleSection } from "./components/ScheduleSection";
import { ScratchReveal } from "./components/ScratchReveal";
import { VenueSection } from "./components/VenueSection";
import { VideoBackground } from "./components/VideoBackground";

function App() {
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    if (opened) {
      window.scrollTo(0, 0);
    }
  }, [opened]);

  const handleOpen = () => {
    window.scrollTo(0, 0);
    setOpened(true);
  };

  return (
    <>
      <div className="relative min-h-screen">
        <VideoBackground />
        <FallingFlowers />
        {opened && <MusicPlayer autoPlay />}

        <div className="relative z-10">
          <HeroSection />
          <FamilySection />

          {events.map((event) => (
            <div key={event.key}>
              <ScratchReveal event={event} />
              <ScheduleSection event={event} />
              <VenueSection event={event} />
            </div>
          ))}

          <InvitationMessage />
          <CountdownSection />
          <Footer />
        </div>
      </div>

      {!opened && <EnvelopeScene onOpen={handleOpen} />}
    </>
  );
}

export default App;
