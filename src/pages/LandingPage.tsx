import { useReveal } from '../hooks/useReveal';
import Hero from '../components/landing/Hero';
import Marquee from '../components/landing/Marquee';
import Services from '../components/landing/Services';
import Outcomes from '../components/landing/Outcomes';
import Process from '../components/landing/Process';
import Testimonial from '../components/landing/Testimonial';
import CTABlock from '../components/landing/CTABlock';

export default function LandingPage() {
  useReveal();
  return (
    <main style={{ overflow: 'hidden' }}>
      <Hero />
      <Marquee />
      <Services />
      <Outcomes />
      <Process />
      <Testimonial />
      <CTABlock />
    </main>
  );
}
