import HeroSection from '@/components/home/hero-section';
import ServicesSection from '@/components/home/services/services-section';
import WhyChooseSection from '@/components/home/why-choose/why-choose-section';
import CaseStudiesSection from '@/components/home/case-studies/case-studies-section';
import ProcessSection from '@/components/home/process/process-section';
import TechnologiesSection from '@/components/home/technologies/technologies-section';
import ContactSection from '@/components/home/contact/contact-section';

export default function Home() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <WhyChooseSection />
      <CaseStudiesSection />
      <ProcessSection />
      <TechnologiesSection />
      <ContactSection />
    </>
  );
}