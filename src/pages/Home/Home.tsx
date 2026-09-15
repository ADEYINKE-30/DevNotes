import Hero from "../../components/home/Hero";
import FeaturedPosts from "../../components/home/FeaturedPosts";
import LatestPosts from "../../components/home/LatestPosts";
import Newsletter from "../../components/home/Newsletter";

const Home = () => {
  return (
    <>
      <Hero />
      <FeaturedPosts />
      <LatestPosts />
      <Newsletter />
    </>
  );
};

export default Home;