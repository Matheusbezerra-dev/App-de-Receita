import Footer from './Footer';
import BodyRecipes from './BodyRecipes';
import Header from './Header';

export default function Meals() {
  return (
    <div>
      <Header titlePage="Meals" buttonSearch />
      <BodyRecipes title="Meals" />
      <Footer />
    </div>
  );
}
