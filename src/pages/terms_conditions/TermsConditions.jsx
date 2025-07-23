import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen bg-[#0A0B0E] text-white relative overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-[#b8962d]/10 rounded-full filter blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#b8962d]/5 rounded-full filter blur-3xl opacity-10"></div>
      </div>

      <Navbar />

      {/* Main content */}
      <div className="relative container mx-auto pt-28 pb-20 px-4 sm:px-6 md:px-8 lg:px-12 z-10">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Terms and Conditions
          </h1>
          <div className="text-xl text-gray-300 flex gap-5 items-center justify-center">
            <p>Effective Date: June 15, 2025</p>
            <p>Last Updated: June 15, 2025</p>
          </div>
          <h2 className="text-2xl md:text-3xl font-semibold mt-6 text-[#b8962d]">
            Terms and Conditions of Use
          </h2>
        </div>

        <div className="bg-[#1A1C23]/80 backdrop-blur-sm rounded-xl p-8 md:p-12 border border-gray-800">
          <p className="mb-8 text-lg">
            Welcome to <strong>The Fame Exchange</strong>. These Terms and
            Conditions ("Terms") govern your use of our website, mobile
            applications, services, and products (collectively, the "Platform")
            operated by <strong>The Fame Exchange Inc.,</strong> located at 825
            E Gate Blvd, Garden City, NY 11530 ("Fame Exchange," "we," "our," or
            "us").
          </p>
          <p className="mb-8 text-lg">
            Please read these Terms carefully before using the Platform. By
            accessing or using the Platform, you agree to be bound by these
            Terms, our <strong className="font-medium">Privacy Policy,</strong>{" "}
            and any additional terms applicable to specific services. If you do
            not agree with these Terms, you may not use the Platform.
          </p>

          <div className="space-y-12">
            {/* Section 1 */}
            <section>
              <h2 className="text-2xl font-bold mb-6 text-[#b8962d]">
                1. Eligibility
              </h2>
              <p className="mb-4">
                You must be at least 13 years of age to access the Platform. If
                you are under 18, you may only use the Platform under the
                supervision of a parent or legal guardian who agrees to be bound
                by these Terms.
              </p>
              <p>
                By registering for an account, you represent and warrant that:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>All information you provide is truthful and accurate.</li>
                <li>You will maintain the accuracy of such information.</li>
                <li>
                  Your use of the Platform does not violate any applicable law
                  or regulation.
                </li>
              </ul>
            </section>

            {/* Section 2 */}
            <section>
              <h2 className="text-2xl font-bold mb-6 text-[#b8962d]">
                2. Description of Services
              </h2>
              <p className="mb-4">
                The Fame Exchange provides the following services:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>
                  A social trading platform where{" "}
                  <strong>fans and investors can engage with Talent</strong> by
                  acquiring <strong>Branded Talent Shares (BTS)</strong>.
                </li>
                <li>
                  A virtual reality platform for live{" "}
                  <strong>INVERSE Meet & Greets,</strong>
                  enabling fans to schedule real-time digital interactions with
                  Talent.
                </li>
                <li>
                  Talent onboarding and brand valuation systems using
                  AI-assisted social metrics and media footprint analysis.
                </li>
                <li>
                  Fiat-based transactions (credit/debit cards, ACH) to purchase
                  BTS or experiences.
                </li>
              </ul>
              <p>
                The Fame Exchange does{" "}
                <strong>not offer or sell any securities</strong> or financial
                instruments and is not a registered broker-dealer, investment
                advisor, or crowdfunding portal. BTS are not shares in the legal
                or equity sense—they are non-financial participation tokens
                representing fan engagement and popularity, not ownership or
                earnings rights.
              </p>
            </section>

            {/* Section 3 */}
            <section>
              <h2 className="text-2xl font-bold mb-6 text-[#b8962d]">
                3. Account Registration and Security
              </h2>
              <p className="mb-4">
                You may be required to create an account to access certain
                features. You agree to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Maintain the confidentiality of your login credentials.</li>
                <li>
                  Notify us immediately of any unauthorized use of your account.
                </li>
                <li>Not use anyone else's account without permission.</li>
              </ul>
              <p className="mt-4">
                You are responsible for all activity that occurs under your
                account.
              </p>
            </section>

            {/* Section 4 */}
            <section>
              <h2 className="text-2xl font-bold mb-6 text-[#b8962d]">
                4. User Conduct
              </h2>
              <p className="mb-4">You agree not to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  Use the Platform for any illegal or unauthorized purpose.
                </li>
                <li>
                  Interfere with or disrupt the integrity or performance of the
                  Platform.
                </li>
                <li>
                  Impersonate any person or entity, or falsely state or
                  misrepresent your affiliation.
                </li>
                <li>
                  Exploit or misuse the platform to manipulate BTS valuations or
                  artificially inflate rankings.
                </li>
                <li>
                  Transmit any viruses, worms, malware, or other harmful code.
                </li>
              </ul>
            </section>

            {/* Section 5 */}
            <section>
              <h2 className="text-2xl font-bold mb-6 text-[#b8962d]">
                5. Branded Talent Shares (BTS)
              </h2>
              <p className="mb-4">
                BTS are <strong>fan engagement units</strong> associated with
                registered Talent on the platform. They are:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-4">
                <li>
                  Non-fungible and cannot be converted into real-world equity or
                  securities.
                </li>
                <li>Traded solely within the Fame Exchange ecosystem.</li>
                <li>
                  Valued based on social media presence, engagement metrics, and
                  user sentiment, not on financial returns.
                </li>
              </ul>
              <p className="mb-4">
                <strong>BTS are not investment vehicles</strong>. Any engagement
                or purchase is{" "}
                <strong>
                  entirely at your discretion and for entertainment purposes
                  only
                </strong>
                .
              </p>
              <p>
                We reserve the right to modify, suspend, or terminate the BTS
                program at any time.
              </p>
            </section>

            {/* Section 6 */}
            <section>
              <h2 className="text-2xl font-bold mb-6 text-[#b8962d]">
                6. Payments, Cancellations, and Refunds
              </h2>

              <div className="ml-4 space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-2">a. Payments</h3>
                  <p>
                    All payments on the Platform must be made in U.S. Dollars
                    via approved payment processors. You authorize us to charge
                    your selected payment method for any services purchased,
                    including but not limited to:
                  </p>
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>BTS acquisitions</li>
                    <li>INVERSE virtual experiences</li>
                    <li>Merchandise or event tickets</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    b. Fan Cancellations (INVERSE Experiences)
                  </h3>
                  <p>
                    Cancellations must be made{" "}
                    <strong>
                      at least 24 hours before the scheduled session
                    </strong>{" "}
                    for a full refund. Late cancellations or no-shows are{" "}
                    <strong>non-refundable</strong>. Exceptions may apply for
                    technical issues or verified emergencies at Fame Exchange's
                    discretion.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    c. Talent Cancellations
                  </h3>
                  <p>If Talent cancels a session, fans will be offered:</p>
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    <li>A full refund, or</li>
                    <li>A credit toward a rescheduled session</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 7 */}
            <section>
              <h2 className="text-2xl font-bold mb-6 text-[#b8962d]">
                7. Talent Responsibilities and Representations
              </h2>
              <p className="mb-4">Talent who join the Platform agree to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  Maintain accurate schedules and availability on their
                  dashboard.
                </li>
                <li>Fulfill agreed upon live or virtual experiences.</li>
                <li>
                  Not misrepresent their identity, achievements, or career
                  metrics.
                </li>
              </ul>
              <p className="mt-4">
                Fame Exchange reserves the right to suspend or remove Talent who
                violate community guidelines, fail to deliver services, or
                mislead fans.
              </p>
            </section>

            {/* Section 8 */}
            <section>
              <h2 className="text-2xl font-bold mb-6 text-[#b8962d]">
                8. Intellectual Property
              </h2>
              <p className="mb-4">
                All content on the Platform—including text, graphics, logos,
                videos, BTS mechanics, and software—is the exclusive property of
                The Fame Exchange or its licensors and is protected by
                intellectual property laws.
              </p>
              <p className="mb-4">
                Users may not copy, reproduce, distribute, modify, or create
                derivative works from our content without express written
                permission.
              </p>
              <p>
                You retain ownership of any content you submit or upload, but by
                doing so, you grant The Fame Exchange a{" "}
                <strong>non-exclusive, royalty-free, worldwide license</strong>{" "}
                to use, display, and promote that content on the platform.
              </p>
            </section>

            {/* Section 9 */}
            <section>
              <h2 className="text-2xl font-bold mb-6 text-[#b8962d]">
                9. Disclaimers
              </h2>
              <p className="mb-4">
                The Platform is provided "<strong>as-is</strong>" and "
                <strong>as-available</strong>" without warranties of any kind.
              </p>
              <p className="mb-4">
                We do <strong>not guarantee</strong> that the BTS market or fan
                interest will increase in value.
              </p>
              <p className="mb-4">
                Fame Exchange does{" "}
                <strong>not guarantee availability or specific results</strong>{" "}
                from virtual events or BTS purchases.
              </p>
              <p>We disclaim all warranties, including but not limited to:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Merchantability</li>
                <li>Fitness for a particular purpose</li>
                <li>Accuracy, completeness, or timeliness of the content</li>
              </ul>
            </section>

            {/* Section 10 */}
            <section>
              <h2 className="text-2xl font-bold mb-6 text-[#b8962d]">
                10. Limitation of Liability
              </h2>
              <p className="mb-4">
                To the fullest extent permitted by law,{" "}
                <strong>
                  The Fame Exchange and its affiliates will not be liable
                </strong>{" "}
                for any indirect, incidental, special, consequential, or
                punitive damages arising from your use or inability to use the
                platform.
              </p>
              <p>
                Total liability shall not exceed the amount paid by you (if any)
                in the twelve months preceding the claim.
              </p>
            </section>

            {/* Section 11 */}
            <section>
              <h2 className="text-2xl font-bold mb-6 text-[#b8962d]">
                11. Indemnification
              </h2>
              <p className="mb-4">
                You agree to indemnify, defend, and hold harmless The Fame
                Exchange, its officers, directors, employees, agents, and
                partners from any claims, liabilities, damages, costs, or
                expenses (including legal fees) arising out of your:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Violation of these Terms.</li>
                <li>Misuse of the Platform.</li>
                <li>Breach of any rights of another user or third party.</li>
              </ul>
            </section>

            {/* Section 12 */}
            <section>
              <h2 className="text-2xl font-bold mb-6 text-[#b8962d]">
                12. Termination
              </h2>
              <p className="mb-4">
                We may suspend or terminate your access to the Platform at any
                time and for any reason, including:
              </p>
              <ul className="list-disc pl-6 space-y-1 mb-4">
                <li>Violating these Terms.</li>
                <li>Engaging in fraudulent or harmful activity.</li>
                <li>
                  Failing to comply with community guidelines or payment
                  obligations.
                </li>
              </ul>
              <p>
                Upon termination, your right to use the Platform will
                immediately cease. BTS holdings or scheduled experiences may be
                forfeited without refund under certain breach conditions.
              </p>
            </section>

            {/* Section 13 */}
            <section>
              <h2 className="text-2xl font-bold mb-6 text-[#b8962d]">
                13. Governing Law and Jurisdiction
              </h2>
              <p>
                These Terms shall be governed by the laws of the{" "}
                <strong>State of New York</strong>, without regard to its
                conflict of law principles. Any legal action or proceeding shall
                be brought exclusively in the state or federal courts located in{" "}
                <strong>Nassau County, NY</strong>, and you consent to the
                jurisdiction and venue of such courts.
              </p>
            </section>

            {/* Section 14 */}
            <section>
              <h2 className="text-2xl font-bold mb-6 text-[#b8962d]">
                14. Dispute Resolution
              </h2>
              <p>
                You agree to first attempt to resolve any dispute informally by
                contacting us. If resolution cannot be reached, both parties
                agree to <strong>binding arbitration</strong> in accordance with
                the rules of the American Arbitration Association. Class actions
                and jury trials are waived.
              </p>
            </section>

            {/* Section 15 */}
            <section>
              <h2 className="text-2xl font-bold mb-6 text-[#b8962d]">
                15. Changes to Terms
              </h2>
              <p>
                We reserve the right to modify these Terms at any time. Updates
                will be posted on this page with a new effective date. Continued
                use of the Platform after changes are posted constitutes your
                acceptance of the revised Terms.
              </p>
            </section>

            {/* Section 16 */}
            <section>
              <h2 className="text-2xl font-bold mb-6 text-[#b8962d]">
                16. Contact Information
              </h2>
              <p className="mb-4">
                If you have questions about these Terms, please contact us at:
              </p>
              <div className="space-y-2">
                <p>
                  <span className="font-bold">
                    <strong>The Fame Exchange</strong>
                  </span>
                </p>
                <p>825 E Gate Blvd, Garden City, NY 11530</p>
                <p>
                  Email:{" "}
                  <strong className="text-base">
                    legal@thefameexchange.com
                  </strong>
                </p>
                <p>
                  Website:{" "}
                  <span className="text-blue-400 cursor-pointer">
                    www.thefameexchange.com
                  </span>
                </p>
                <p>
                  Phone: <strong className="text-base">1-800-123-4567</strong>
                </p>
                <p>
                  <strong>
                    {" "}
                    By using The Fame Exchange, you acknowledge that you have
                    read, understood, and agree to be bound by these Terms and
                    Conditions.
                  </strong>
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default TermsAndConditions;
