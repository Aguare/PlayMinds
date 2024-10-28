import NavBar from "../components/navbar";
import Card from "../components/card";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <NavBar />
      <main className="flex flex-col items-center justify-center w-full px-4 md:px-8 py-8">
        <div className="w-full max-w-7xl">
          <Card />
        </div>
      </main>
    </div>
  );
};

export default Home;
