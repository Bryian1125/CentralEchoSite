import HeroBanner from "../components/Home/HeroBanner"
import OpinionDisplay from "../components/Home/OpinionDisplay"
import FeatureDisplay from "../components/Home/FeatureDisplay"
import LiteraryDisplay from "../components/Home/LiteraryDisplay"
import SportsDisplay from "../components/Home/SportsDisplay"

const categories = [
    "Opinion",
    "Feature",
    "Literary",
    "Sports"
];

export default function App() {
  return (
    <div>
          <HeroBanner />
          <OpinionDisplay
              link = "opinion"
          />
          <FeatureDisplay
              link = "feature"
          />
          <LiteraryDisplay
              link = "literary"
          />
          <SportsDisplay
              link = "sports"
          />
    </div>
  );
}
