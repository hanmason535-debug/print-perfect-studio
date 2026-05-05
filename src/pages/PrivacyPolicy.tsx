import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import { ArrowLeft } from "lucide-react";

const PrivacyPolicy = () => (
  <div className="min-h-screen bg-background text-foreground">
    <SEO
      title="Privacy Policy — Paras Graphics"
      description="Privacy policy for Paras Graphics, Ahmedabad. Learn how we handle your data."
      canonical="https://parasgraphics.com/privacy-policy"
      robots="noindex, follow"
    />
    <div className="container mx-auto px-4 py-16 max-w-3xl">
      <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8">
        <ArrowLeft size={16} /> Back to Home
      </Link>

      <h1 className="text-3xl font-heading font-bold mb-8">Privacy Policy</h1>
      <p className="text-muted-foreground text-sm mb-6">Last updated: April 2026</p>

      <div className="prose prose-sm prose-invert max-w-none space-y-6 text-muted-foreground">
        <section>
          <h2 className="text-lg font-semibold text-foreground">1. Information We Collect</h2>
          <p>When you contact us via our website, WhatsApp, phone, or email, we may collect your name, phone number, email address, and details about your print requirements. If you upload design files, we store them temporarily to process your order.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">2. How We Use Your Information</h2>
          <p>We use your information solely to fulfil your printing orders, communicate about your projects, and improve our services. We do not sell or share your personal information with third parties for marketing purposes.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">3. Cookies</h2>
          <p>Our website uses essential cookies to remember your preferences (such as theme selection and cookie consent). We do not use tracking or advertising cookies. You can manage cookies through our consent banner.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">4. Data Security</h2>
          <p>We take reasonable measures to protect your personal data. Design files uploaded for orders are stored securely and deleted after order completion unless you request otherwise.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">5. Third-Party Services</h2>
          <p>Our website may embed Google Maps for directions to our shop. Google's own privacy policy applies to their services. We do not integrate any other third-party analytics or tracking tools.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">6. Your Rights</h2>
          <p>You may request access to, correction of, or deletion of your personal data at any time by contacting us at parasgph@gmail.com or calling +91 93774 76343.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-foreground">7. Contact</h2>
          <p>Paras Graphics, Ahmedabad, Gujarat, India<br />Email: parasgph@gmail.com<br />Phone: +91 93774 76343</p>
        </section>
      </div>
    </div>
  </div>
);

export default PrivacyPolicy;