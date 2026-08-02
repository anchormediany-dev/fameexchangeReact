import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-[#0A0B0E] text-white relative overflow-hidden mt-12 md:mt-16">
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
            Privacy Policy
          </h1>
          <p className="text-xl text-gray-300">Effective Date: June 15, 2025</p>
          <h2 className="text-2xl md:text-3xl font-semibold mt-4 text-[#b8962d]">
            Privacy Policy for The Fame Exchange Platform
          </h2>
        </div>

        <div className="bg-[#1A1C23]/80 backdrop-blur-sm rounded-xl p-8 md:p-12 border border-gray-800">
          <p className="mb-8 text-lg">
            At <strong>The Fame Exchange</strong>, we are committed to
            protecting your privacy and ensuring that your personal data is
            handled in a secure and responsible manner. This Privacy Policy
            outlines the types of information we collect, how we use it, and the
            steps we take to protect your personal data. By using our platform,
            you agree to the collection and use of your information in
            accordance with this policy.
          </p>

          <div className="space-y-12">
            {/* Section 1 */}
            <section>
              <h2 className="text-2xl font-bold mb-6 text-[#b8962d]">
                1. Information We Collect
              </h2>
              <p className="mb-4">
                We collect personal data in order to provide, improve, and
                personalize your experience with{" "}
                <strong className="font-medium">The Fame Exchange</strong>. The data we collect
                includes:
              </p>

              <div className="ml-4 space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    a. Personal Information:
                  </h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <span className="font-medium">Fans/Investors:</span> When
                      you create an account, we collect your name, email
                      address, phone number, payment information, and other
                      details necessary for processing transactions.
                    </li>
                    <li>
                      <span className="font-medium">
                        Talent/Artists/Influencers/Athletes:
                      </span>{" "}
                      In addition to the information above, we also collect
                      professional details such as career information, social
                      media profiles, and public recognition metrics to help
                      determine the value of Branded Talent Shares (BTS).
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2">b. Usage Data:</h3>
                  <p>
                    We automatically collect information about how you interact
                    with our platform, including your IP address, browser type,
                    operating system, device information, and browsing activity
                    on the platform. This helps us analyze trends, improve
                    functionality, and ensure the security of the platform.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    c. Cookies and Tracking Technologies:
                  </h3>
                  <p>
                    We use cookies and similar tracking technologies to track
                    activity on our platform. Cookies are small files stored on
                    your device that help us improve your user experience by
                    remembering your preferences and enabling features like
                    secure login.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 2 */}
            <section>
              <h2 className="text-2xl font-bold mb-6 text-[#b8962d]">
                2. How We Use Your Information
              </h2>
              <p className="mb-4">
                We use your personal data for the following purposes:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <span className="font-medium">
                    Account Creation and Management:
                  </span>{" "}
                  To create, maintain, and manage your account, including
                  providing you with access to features such as purchasing or
                  selling Branded Talent Shares (BTS) and managing availability
                  for virtual meet-and-greets.
                </li>
                <li>
                  <span className="font-medium">Transaction Processing:</span>{" "}
                  To process payments, handle refunds, and facilitate financial
                  transactions related to your investments or bookings.
                </li>
                <li>
                  <span className="font-medium">Platform Customization:</span>{" "}
                  To personalize your experience by providing tailored content,
                  recommendations, and features based on your interactions with
                  the platform.
                </li>
                <li>
                  <span className="font-medium">Communication:</span> To send
                  you important updates, such as changes to our terms, policies,
                  and features. We may also send you promotional materials if
                  you have opted-in to receive such communications.
                </li>
                <li>
                  <span className="font-medium">
                    Analytics and Improvements:
                  </span>{" "}
                  To improve our platform by analyzing user behavior,
                  identifying trends, and troubleshooting any issues with
                  performance.
                </li>
                <li>
                  <span className="font-medium">Security:</span> To monitor for
                  and protect against fraud, unauthorized access, and other
                  harmful activities.
                </li>
              </ul>
            </section>

            {/* Section 3 */}
            <section>
              <h2 className="text-2xl font-bold mb-6 text-[#b8962d]">
                3. How We Share Your Information
              </h2>
              <p className="mb-4">
                We value your privacy and take steps to ensure your information
                is shared only when necessary for the operation of the platform.
              </p>

              <div className="ml-4 space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    a. Service Providers:
                  </h3>
                  <p>
                    We may share your information with third-party service
                    providers who help us operate the platform, such as payment
                    processors, email providers, or data storage services. These
                    providers are bound by contractual obligations to protect
                    your data.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    b. Legal Compliance:
                  </h3>
                  <p>
                    We may disclose your personal data if required to do so by
                    law or in response to valid legal requests by public
                    authorities, including to meet national security or law
                    enforcement requirements.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-2">
                    c. Business Transfers:
                  </h3>
                  <p>
                    If we are involved in a merger, acquisition, or sale of
                    assets, your personal data may be transferred as part of
                    that transaction. We will notify you before your personal
                    data is transferred to a new entity.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 4 */}
            <section>
              <h2 className="text-2xl font-bold mb-6 text-[#b8962d]">
                4. Data Retention
              </h2>
              <p>
                We retain your personal data for as long as your account is
                active or as needed to provide you with our services. If you
                wish to deactivate your account or request deletion of your
                data, you can do so by contacting our support team. Please note
                that we may retain certain information as required by law or for
                legitimate business purposes, such as fraud prevention.
              </p>
            </section>

            {/* Section 5 */}
            <section>
              <h2 className="text-2xl font-bold mb-6 text-[#b8962d]">
                5. Your Rights
              </h2>
              <p className="mb-4">
                As a user, you have the following rights regarding your personal
                data:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <span className="font-medium">Access:</span> You have the
                  right to request copies of your personal data.
                </li>
                <li>
                  <span className="font-medium">Rectification:</span> You can
                  request corrections to any inaccurate or incomplete personal
                  data.
                </li>
                <li>
                  <span className="font-medium">Erasure:</span> You can request
                  the deletion of your personal data, subject to certain
                  conditions.
                </li>
                <li>
                  <span className="font-medium">Objection:</span> You have the
                  right to object to the processing of your personal data for
                  specific purposes, such as marketing.
                </li>
                <li>
                  <span className="font-medium">Portability:</span> You may
                  request that we transfer your personal data to another
                  organization or directly to you, in a structured, commonly
                  used, and machine-readable format.
                </li>
              </ul>
              <p className="mt-4">
                To exercise these rights, please contact us using the
                information provided below. We will respond to your request in
                accordance with applicable data protection laws.
              </p>
            </section>

            {/* Section 6 */}
            <section>
              <h2 className="text-2xl font-bold mb-6 text-[#b8962d]">
                6. Data Security
              </h2>
              <p className="mb-4">
                We take the security of your personal data seriously and
                implement appropriate technical and organizational measures to
                protect it from unauthorized access, disclosure, alteration, or
                destruction. These measures include encryption, firewalls, and
                secure data storage systems.
              </p>
              <p>
                However, no method of transmission over the internet or method
                of electronic storage is 100% secure. While we strive to protect
                your personal data, we cannot guarantee its absolute security.
              </p>
            </section>

            {/* Section 7 */}
            <section>
              <h2 className="text-2xl font-bold mb-6 text-[#b8962d]">
                7. Third-Party Links
              </h2>
              <p>
                Our platform may contain links to third-party websites or
                services that are not operated by us. We are not responsible for
                the content, privacy policies, or practices of these third
                parties. We encourage you to review the privacy policies of any
                third-party websites you visit.
              </p>
            </section>

            {/* Section 8 */}
            <section>
              <h2 className="text-2xl font-bold mb-6 text-[#b8962d]">
                8. Children's Privacy
              </h2>
              <p>
                The Fame Exchange platform is not intended for children under
                the age of 13. We do not knowingly collect or solicit personal
                data from children under 13. If we become aware that we have
                inadvertently collected personal data from a child under 13, we
                will take steps to delete that information as soon as possible.
              </p>
            </section>

            {/* Section 9 */}
            <section>
              <h2 className="text-2xl font-bold mb-6 text-[#b8962d]">
                9. Changes to This Privacy Policy
              </h2>
              <p>
                We may update this Privacy Policy from time to time. Any changes
                will be posted on this page with an updated "Effective Date." We
                encourage you to review this Privacy Policy periodically to stay
                informed about how we are protecting your data.
              </p>
            </section>

            {/* Section 10 */}
            <section>
              <h2 className="text-2xl font-bold mb-6 text-[#b8962d]">
                10. Contact Us
              </h2>
              <p className="mb-4">
                If you have any questions or concerns about this Privacy Policy
                or how we handle your personal data, please contact us at:
              </p>
              <div className="space-y-2">
                <p>
                  <span className="font-bold">
                    <strong>The Fame Exchange</strong>
                  </span>
                </p>
                <p>
                  Email:{" "}
                  <strong className="text-base">
                    privacy@thefameexchange.com
                  </strong>
                </p>
                <p>
                  Phone: <strong className="text-base">1-800-123-4567</strong>
                </p>
                <p>
                  Website:{" "}
                  <span className="text-blue-400 cursor-pointer">
                    www.thefameexchange.com
                  </span>
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

export default PrivacyPolicy;
