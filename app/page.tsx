import Navbar from ".././components/navbar.tsx"
import HeroBanner from ".././components/Home/herobanner.tsx"
import OpinionDisplay from ".././components/Home/OpinionDisplay.tsx"
import FeatureDisplay from ".././components/Home/FeatureDisplay.tsx"
import LiteraryDisplay from ".././components/Home/LiteraryDisplay"
import SportsDisplay from ".././components/Home/SportsDisplay.tsx"

export default function App() {
  return (
    <div>
          <Navbar />
          <HeroBanner />
          <OpinionDisplay />
          <FeatureDisplay />
          <LiteraryDisplay />
          <SportsDisplay />
    </div>
  );
}
