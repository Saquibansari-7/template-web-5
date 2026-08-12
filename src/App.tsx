import FloatingPetals from './components/FloatingPetals';
import HeroSection from './components/HeroSection';
import { IntroSection, CoupleMonogramSection } from './components/IntroAndSymbol';
import { InteractiveMapSection, TravelAccommodationSection, FamilyWeddingPartySection } from './components/DesignSystem';
import { CulturalSection, SaveTheDateSection } from './components/CulturalAndSaveDate';
import { InvitationSection, EventDetailsSection } from './components/InvitationAndEvents';
import { StorySection, MemoriesSection } from './components/StoryAndMemories';
import { SendLoveSection, BlessingVerseSection, Footer } from './components/RSVPAndFooter';

function App() {
  return (
    <div className="min-h-screen bg-wine">
      {/* Floating petals overlay */}
      <FloatingPetals count={12} />

      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Intro Text Block */}
      <IntroSection />

      {/* 3. Couple Monogram Section */}
      <CoupleMonogramSection />

      {/* 4. Save The Date & Live Countdown */}
      <SaveTheDateSection />

      {/* 5. Our Story */}
      <StorySection />

      {/* 6. Memories Gallery */}
      <MemoriesSection />

      {/* 7. Wedding Invitation */}
      <InvitationSection />

      {/* 8. Event Details / Schedule */}
      <EventDetailsSection />

      {/* 9. Cultural Highlight */}
      <CulturalSection />

      {/* 10. Family & Wedding Party */}
      <FamilyWeddingPartySection />

      {/* 11. Travel & Accommodation */}
      <TravelAccommodationSection />

      {/* 12. Interactive Map */}
      <InteractiveMapSection />

      {/* 13. Send Love (RSVP blessings board) */}
      <SendLoveSection />

      {/* 14. Sacred Blessing Verse */}
      <BlessingVerseSection />

      {/* 15. Footer */}
      <Footer />
    </div>
  );
}

export default App;
