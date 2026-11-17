import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Counters from "@/components/Counters";
import Simulator from "@/components/Simulator";
import Timeline from "@/components/Timeline";
import Trades from "@/components/Trades";
import Problems from "@/components/Problems";
import Convergence from "@/components/Convergence";
import AiDemo from "@/components/AiDemo";
import TabsCarousel from "@/components/TabsCarousel";
import Quote from "@/components/Quote";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Counters />
        <Simulator />
        <Timeline />
        <Trades />
        <Problems />
        <Convergence />
        <AiDemo />
        <TabsCarousel />
        <Quote />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
