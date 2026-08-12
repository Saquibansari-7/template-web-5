import FloatingPetals from './components/FloatingPetals';
import HeroSection from './components/HeroSection';
import { IntroSection, CoupleMonogramSection } from './components/IntroAndSymbol';
import { InteractiveMapSection, TravelAccommodationSection, FamilyWeddingPartySection } from './components/DesignSystem';
import { CulturalSection, SaveTheDateSection } from './components/CulturalAndSaveDate';
import { InvitationSection, EventDetailsSection } from './components/InvitationAndEvents';
import { StorySection, MemoriesSection } from './components/StoryAndMemories';
import { SendLoveSection, BlessingVerseSection, Footer } from './components/RSVPAndFooter';
import { useContent } from './admin/store';

function App() {
  const { content } = useContent();
  const s = content.sections;

  return (
    <div className="min-h-screen bg-wine">
      {/* Floating petals overlay */}
      <FloatingPetals count={12} />

      {s.hero && (
        <>
          {/* 1. Hero Section */}
          <HeroSection />

          {/* 2. Intro Text Block */}
          {s.intro && <IntroSection />}

          {/* 3. Couple Monogram Section */}
          {s.monogram && <CoupleMonogramSection />}
        </>
      )}

      {/* 4. Save The Date & Live Countdown */}
      {s.saveDate && <SaveTheDateSection />}

      {/* 5. Our Story */}
      {s.story && <StorySection />}

      {/* 6. Memories Gallery */}
      {s.memories && <MemoriesSection />}

      {/* 7. Wedding Invitation */}
      {s.invitation && <InvitationSection />}

      {/* 8. Event Details / Schedule */}
      {s.events && <EventDetailsSection />}

      {/* 9. Cultural Highlight */}
      {s.cultural && <CulturalSection />}

      {/* 10. Family & Wedding Party */}
      {s.family && <FamilyWeddingPartySection />}

      {/* 11. Travel & Accommodation */}
      {s.travel && <TravelAccommodationSection />}

      {/* 12. Interactive Map */}
      {s.map && <InteractiveMapSection />}

      {/* 13. Send Love (RSVP blessings board) */}
      {s.sendLove && <SendLoveSection />}

      {/* 14. Sacred Blessing Verse */}
      {s.blessing && <BlessingVerseSection />}

      {/* 15. Footer */}
      <Footer />
    </div>
  );
}

export default App;
