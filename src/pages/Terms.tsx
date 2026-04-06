import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import { ArrowLeft } from "lucide-react";

const Terms = () => (
  <div className="min-h-screen bg-background text-foreground">
    <SEO
      title="Terms of Service — Paras Graphics"
      description="Terms of service for Paras Graphics printing services in Ahmedabad."
      robots="noindex, follow"
    />
    <div className="container mx-auto px-4 py-16 max-w-3xl">
      <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8">
        <ArrowLeft size={16} /> Back to Home
      </Link>

      <h1 className="text-3xl font-heading font-bold mb-8">Terms of Service</h1>
      <p className="text-muted-foreground text-sm mb-6">Last updated: April 2026</p>

      <div className="prose prose-sm prose-invert max-w-none space-y-6 text-muted-foreground">
        <section>
          <h2 className="text-lg font-semibold text-foreground">1. Services</h2>
          <p>Paras Graphics provides commercial printing services including but not limited to business cards, flex banners, vinyl stickers, corporate apparel, brochures, and packaging. All orders are subject to availability and our production capacity.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">2. Orders & Payment</h2>
          <p>Orders are confirmed upon mutual agreement of specifications, quantity, and pricing. Payment terms are discussed on a per-order basis. We reserve the right to require advance payment for new customers or large orders.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">3. Design Files</h2>
          <p>Customers are responsible for providing print-ready design files in acceptable formats (PDF, AI, PSD, CDR). We offer digital proofing before printing. Once a proof is approved, we are not liable for errors present in the approved file.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">4. Quality & Returns</h2>
          <p>We strive for the highest print quality. If you are unsatisfied with the output due to a production error on our part, we will reprint the order at no additional cost. Claims must be made within 48 hours of delivery.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">5. Delivery</h2>
          <p>Estimated delivery timelines are provided at the time of order confirmation. While we make every effort to meet deadlines, delays may occur due to unforeseen circumstances. We are not liable for losses caused by delivery delays.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">6. Intellectual Property</h2>
          <p>All designs submitted by customers remain the intellectual property of the customer. We do not claim ownership of any submitted artwork. We may use completed work in our portfolio unless the customer explicitly opts out.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">7. Limitation of Liability</h2>
          <p>Our liability is limited to the value of the order in question. We are not liable for indirect, incidental, or consequential damages arising from the use of our services.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">8. Contact</h2>
          <p>For questions about these terms, contact us at parasgph@gmail.com or +91 93774 76343.</p>
        </section>
      </div>
    </div>
  </div>
);

export default Terms;