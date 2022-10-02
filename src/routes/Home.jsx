import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CardsSection from "../components/CardsSection";

export default function Home() {
  return (
    <div>
      <Navbar></Navbar>
      <CardsSection></CardsSection>
      <Footer></Footer>
    </div>
  );
}
