import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Services from "@/components/Services";
import WhyChooseUs from "@/components/WhyChooseUs";
import OurProcess from "@/components/OurProcess";
import Portfolio from "@/components/Portfolio";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import WhatsAppFAB from "@/components/WhatsAppFAB";
import ScrollProgress from "@/components/ScrollProgress";
import SEO from "@/components/SEO";

const Index = () => (
  <>
    <SEO
      title="Paras Graphics — Premium Printing Services in Ahmedabad"
      description="Your trusted printing partner since 1997. Business cards, brochures, banners, packaging & more. 50,000+ happy clients in Ahmedabad. Get a free quote today!"
    />
    <Header />
    <Hero />
    <Stats />
    <Services />
    <WhyChooseUs />
    <OurProcess />
    <Portfolio />
    <Testimonials />
    <Contact />
    <Footer />
    <WhatsAppFAB />
    <ScrollProgress />
  </>
);

export default Index;
