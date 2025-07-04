import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const AMlPolicy = () => {
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
            Anti-Money Laundering (AML) Policy
          </h1>
          <div className="text-xl text-gray-300 space-y-2">
            <p>The Fame Exchange Inc.</p>
            <p>Effective Date: June 15, 2025</p>
            <p>Last Updated: June 15, 2025</p>
          </div>
        </div>

        <div className="bg-[#1A1C23]/80 backdrop-blur-sm rounded-xl p-8 md:p-12 border border-gray-800">
          {/* Section 1 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-[#b8962d]">
              1. Introduction
            </h2>
            <p className="mb-4">
              The Fame Exchange Inc. ("TFE", "we", "our", or "us") is committed
              to the highest standards of anti-money laundering (AML) compliance
              and counter-terrorist financing (CTF) practices. This AML Policy
              outlines the internal controls, procedures, and regulatory
              responsibilities we maintain to detect, prevent, and report any
              activities that may be related to money laundering, terrorism
              financing, or other financial crimes.
            </p>
            <p>
              Although The Fame Exchange does not operate as a financial
              institution, and does not issue or trade securities or digital
              assets, we are committed to voluntarily adhering to applicable AML
              best practices under U.S. laws (such as the Bank Secrecy Act
              (BSA), USA PATRIOT Act) and international standards (including
              FATF Recommendations).
            </p>
          </section>

          {/* Section 2 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-[#b8962d]">
              2. Purpose of this Policy
            </h2>
            <p className="mb-4">This policy is intended to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Establish controls to detect and prevent the use of The Fame
                Exchange's services for illicit financial activity.
              </li>
              <li>
                Comply with applicable laws and regulations regarding AML/CTF.
              </li>
              <li>
                Protect our users, Talent, investors, and business from
                reputational and legal risk.
              </li>
              <li>
                Ensure accountability and transparency across all transactional
                activity.
              </li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-[#b8962d]">3. Scope</h2>
            <p className="mb-4">
              This AML Policy applies to all individuals and entities who
              interact with The Fame Exchange platform, including:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Fans/Investors:</strong> who engage in BTS-related
                purchases or virtual experience bookings.
              </li>
              <li>
                <strong>Talent (Artists, Athletes, Influencers):</strong> who
                earn fiat revenue from branded share activity or fan engagement.
              </li>
              <li>
                <strong>Employees, Contractors, and Partners:</strong> who
                handle customer service, operations, finance, or onboarding.
              </li>
            </ul>
          </section>

          {/* Section 4 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-[#b8962d]">
              4. Definitions
            </h2>
            <div className="grid gap-4">
              <div>
                <strong>Money Laundering:</strong>
                <p>
                  The process of concealing the origins of illegally obtained
                  money, typically by transferring it through legitimate
                  businesses or accounts.
                </p>
              </div>
              <div>
                <strong>Terrorist Financing:</strong>
                <p>
                  The process of providing funds for terrorist activity through
                  either legal or illegal means.
                </p>
              </div>
              <div>
                <strong>KYC (Know Your Customer):</strong>
                <p>
                  A process to verify the identity of clients and assess their
                  risk profiles.
                </p>
              </div>
              <div>
                <strong>CTR (Currency Transaction Report):</strong>
                <p>A report filed for cash transactions over $10,000.</p>
              </div>
              <div>
                <strong>SAR (Suspicious Activity Report):</strong>
                <p>
                  A report made to authorities when suspicious or unusual
                  activity is identified.
                </p>
              </div>
            </div>
          </section>

          {/* Section 5 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-[#b8962d]">
              5. AML Compliance Officer
            </h2>
            <p className="mb-4">
              We designate a qualified AML Compliance Officer who is responsible
              for:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>Developing and maintaining AML procedures.</li>
              <li>Overseeing KYC and risk management practices.</li>
              <li>Monitoring transactions for suspicious activity.</li>
              <li>
                Filing reports with appropriate authorities, when necessary.
              </li>
              <li>Ensuring ongoing training and policy updates.</li>
              <li>Coordinating audits or regulatory inquiries.</li>
            </ul>
            <div className="bg-[#252831] p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Contact:</h3>
              <p>AML Compliance Department</p>
              <p>
                📧 Email:{" "}
                <span className="text-blue-400">aml@thefameexchange.com</span>
              </p>
              <p>📞 Phone: 1-800-123-4567</p>
            </div>
          </section>

          {/* Section 6 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-[#b8962d]">
              6. Know Your Customer (KYC) Program
            </h2>
            <p className="mb-4">
              To prevent anonymity-based abuse, The Fame Exchange implements a
              tiered KYC program.
            </p>

            <div className="ml-4 space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  a. For Fans/Investors (Buyers)
                </h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Full name, email, verified mobile number.</li>
                  <li>
                    Government-issued ID (for transactions exceeding
                    thresholds).
                  </li>
                  <li>
                    Address and date of birth (if participating in BTS resale
                    markets or scheduled financial engagement).
                  </li>
                  <li>
                    Optional selfie verification (for high-risk jurisdictions).
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2">
                  b. For Talent (Sellers)
                </h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Government-issued ID.</li>
                  <li>Legal name and business name (if applicable).</li>
                  <li>Address and contact info.</li>
                  <li>
                    Banking information for payouts (must match legal ID).
                  </li>
                  <li>
                    Media and career background (for reputation verification).
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2">
                  c. For Business Partners or Vendors
                </h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Company registration documents.</li>
                  <li>List of beneficial owners (if applicable).</li>
                  <li>Tax Identification Numbers (TIN/EIN).</li>
                  <li>
                    Compliance contacts and jurisdictional licenses, if
                    necessary.
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 7 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-[#b8962d]">
              7. Risk Assessment and User Categorization
            </h2>
            <p className="mb-4">
              We apply a risk-based approach (RBA) to all users:
            </p>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-[#252831] rounded-lg overflow-hidden">
                <thead>
                  <tr className="text-left border-b border-gray-700">
                    <th className="py-3 px-4">Risk Level</th>
                    <th className="py-3 px-4">Description</th>
                    <th className="py-3 px-4">Controls Applied</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-700">
                    <td className="py-3 px-4 font-medium">Low</td>
                    <td className="py-3 px-4">
                      Basic users with limited transactional history
                    </td>
                    <td className="py-3 px-4">
                      Email verification, payment gateway KYC
                    </td>
                  </tr>
                  <tr className="border-b border-gray-700">
                    <td className="py-3 px-4 font-medium">Medium</td>
                    <td className="py-3 px-4">
                      Frequent buyers, larger BTS holders, Talent with high
                      engagement
                    </td>
                    <td className="py-3 px-4">
                      Enhanced ID checks, behavioral monitoring
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-medium">High</td>
                    <td className="py-3 px-4">
                      International users, PEPs, or high-volume purchasers
                    </td>
                    <td className="py-3 px-4">
                      Manual review, document authentication, possible
                      onboarding denial
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 8 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-[#b8962d]">
              8. Monitoring and Detection
            </h2>
            <p className="mb-4">
              We use automated tools and manual review processes to monitor:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>Transaction volume and frequency.</li>
              <li>Abnormal patterns or inconsistencies.</li>
              <li>Sudden large purchases or withdrawals.</li>
              <li>Use of multiple accounts or proxies.</li>
              <li>Transactions from sanctioned jurisdictions.</li>
            </ul>
            <p className="mb-4 font-medium">Red Flag Indicators may include:</p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>Attempts to bypass KYC thresholds.</li>
              <li>Rapid trading or BTS flipping without clear purpose.</li>
              <li>
                Multiple accounts with the same IP, device, or payment method.
              </li>
              <li>
                Talent accounts receiving high-volume transactions from few
                sources.
              </li>
            </ul>
            <p>
              All suspicious activity is escalated to the Compliance Officer and
              reviewed within 24 hours.
            </p>
          </section>

          {/* Section 9 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-[#b8962d]">
              9. Suspicious Activity Reporting
            </h2>
            <p className="mb-4">
              If we detect suspicious behavior, The Fame Exchange will:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>
                File a Suspicious Activity Report (SAR) with the appropriate
                federal or state authorities when required.
              </li>
              <li>Maintain a copy of the report and internal notes.</li>
              <li>
                Not inform the involved party (per "non-tipping-off" rules).
              </li>
              <li>Document follow-up actions and outcomes.</li>
            </ul>
            <p>
              We reserve the right to suspend or terminate any account
              associated with suspicious activity without prior notice.
            </p>
          </section>

          {/* Section 10 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-[#b8962d]">
              10. Prohibited and Sanctioned Jurisdictions
            </h2>
            <p>
              The Fame Exchange does not serve or support users located in or
              transacting from the following:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>
                Countries sanctioned by the U.S. Department of the Treasury's
                Office of Foreign Assets Control (OFAC).
              </li>
              <li>
                Jurisdictions known for high risk of money laundering or
                terrorist financing (per FATF).
              </li>
              <li>
                Users identified on Sanctions, Blocked Persons, or Terror
                Watchlists.
              </li>
            </ul>
          </section>

          {/* Section 11 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-[#b8962d]">
              11. Recordkeeping
            </h2>
            <p>In compliance with applicable regulations:</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>
                All KYC data is securely retained for a minimum of 5 years from
                account closure or last transaction.
              </li>
              <li>
                SARs and internal reports are kept confidential and protected.
              </li>
              <li>
                Access to data is restricted to compliance and authorized legal
                personnel only.
              </li>
            </ul>
          </section>

          {/* Section 12 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-[#b8962d]">
              12. Employee Training
            </h2>
            <p>
              All staff involved in compliance, onboarding, finance, or customer
              support undergo regular AML training that covers:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>Recognizing red flags.</li>
              <li>Responding to suspicious activity.</li>
              <li>Confidentiality obligations.</li>
              <li>Annual policy updates.</li>
            </ul>
          </section>

          {/* Section 13 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-[#b8962d]">
              13. Platform Integrity and Reporting Violations
            </h2>
            <p>
              Users are encouraged to report suspected abuse, fraud, or
              financial misconduct involving other users by contacting{" "}
              <span className="text-blue-400">aml@thefameexchange.com</span>.
              Reports are confidential and investigated discreetly.
            </p>
          </section>

          {/* Section 14 */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-[#b8962d]">
              14. Policy Updates
            </h2>
            <p>
              This policy may be updated periodically to reflect regulatory
              changes, platform evolution, or industry best practices. Revisions
              will be posted on our website, and material changes will be
              communicated to affected users.
            </p>
          </section>

          {/* Section 15 */}
          <section>
            <h2 className="text-2xl font-bold mb-6 text-[#b8962d]">
              15. Contact Us
            </h2>
            <p className="mb-4">
              For any questions, feedback, or compliance inquiries:
            </p>
            <div className="bg-[#252831] p-4 rounded-lg">
              <p>
                <strong>The Fame Exchange Inc.</strong>
              </p>
              <p>Attn: AML Compliance Officer</p>
              <p>825 E Gate Blvd</p>
              <p>Garden City, NY 11530</p>
              <p>
                📧{" "}
                <span className="text-blue-400">aml@thefameexchange.com</span>
              </p>
              <p>
                🌐{" "}
                <span className="text-blue-400">www.thefameexchange.com</span>
              </p>
            </div>
            <p className="mt-6 italic">
              By using The Fame Exchange platform, you acknowledge that you have
              read, understood, and agree to comply with this Anti-Money
              Laundering Policy.
            </p>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AMlPolicy;
