import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Collection from "./components/Collection";
import Essentials from "./components/Essentials";
import SaleSection from "./components/SaleSection";

import { Routes, Route } from "react-router-dom";
import Shop from "./page/Shop";
import Collections from "./page/Collections";
import SaleSections from "./page/SaleSections";
import Book from "./page/Book";
import Footer from "./page/Footer";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        {/* Home */}
        <Route
          path="/"
          element={
            <>
              <Hero />
              <Collection />
              <Essentials />
              <SaleSection />
              <Footer/>
            </>
          }
        />

        {/* Pages */}
        <Route path="/shop" element={<Shop />} />
        <Route path="/Collection" element={<Collections />} />
        <Route path="/sale" element={<SaleSections />} />
        <Route path="/Lookbook" element={<SaleSections />} />
        <Route path="/sale" element={<SaleSections />} />
        <Route path="/Book" element={<Book/>} />
        <Route path="/Footer" element={<Footer/>} />
      </Routes>
    </>
  );
}

export default App;