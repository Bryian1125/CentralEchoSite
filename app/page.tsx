import HeroBanner from "../components/Home/HeroBanner.tsx"
import CategoryDisplay from "../components/Home/CategoryDisplay.tsx"
import LiteraryDisplay from "../components/Home/LiteraryDisplay.tsx"

export default function App() {
  return (
    <div>
          <HeroBanner />
          <CategoryDisplay title="OPINION" link="opinion" />
          <CategoryDisplay title="FEATURE" link="feature" />
          <LiteraryDisplay link="literary" />
          <CategoryDisplay title="SPORTS" link="sports" />
    </div>
  );
}
