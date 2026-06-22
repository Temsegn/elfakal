import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Industries from "@/components/sections/Industries";
import Services from "@/components/sections/Services";
import Products from "@/components/sections/Products";
import WhyChoose from "@/components/sections/WhyChoose";
import Process from "@/components/sections/Process";
import Projects from "@/components/sections/Projects";
import News from "@/components/sections/News";
import Trust from "@/components/sections/Trust";
import Testimonials from "@/components/sections/Testimonials";
import Contact from "@/components/sections/Contact";
import FaqJsonLd from "@/components/seo/FaqJsonLd";
import BreadcrumbJsonLd from "@/components/seo/BreadcrumbJsonLd";

export default function Home() {
  return (
    <>
      <FaqJsonLd />
      <BreadcrumbJsonLd items={[{ name: "Home", path: "/" }]} />
      <Hero />
      <About />
      <Industries />
      <Services />
      <Products />
      <WhyChoose />
      <Process />
      <Projects />
      <News />
      <Trust />
      <Testimonials />
      <Contact />
    </>
  );
}
