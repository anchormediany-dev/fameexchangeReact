import {
  FiFileText,
  FiCalendar,
  FiEdit2,
  FiAlertTriangle,
  FiUsers,
  FiBook,
  FiShield,
  FiClipboard,
  FiEye,
  FiFlag,
  FiGlobe,
  FiDatabase,
  FiAward,
  FiBell,
  FiRefreshCw,
  FiMail,
} from "react-icons/fi";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import { FcManager } from "react-icons/fc";
const amlData = [
  {
    id: 1,
    icon: <FiShield />,
    title: "Introduction",
    content: (
      <>
        <p>
          <strong>The Fame Exchange Inc.</strong> ("TFE", "we", "our", or "us")
          is committed to the highest standards of anti-money laundering (AML)
          compliance and counter-terrorist financing (CTF) practices. This AML
          Policy outlines the internal controls, procedures, and regulatory
          responsibilities we maintain to detect, prevent, and report any
          activities that may be related to money laundering, terrorism
          financing, or other financial crimes.
        </p>
        <p className="mt-4">
          Although The Fame Exchange does not operate as a financial
          institution, and does not issue or trade securities or digital assets,
          we are committed to voluntarily adhering to applicable AML best
          practices under U.S. laws (such as the Bank Secrecy Act (BSA), USA
          PATRIOT Act) and international standards (including FATF
          Recommendations).
        </p>
      </>
    ),
  },
  {
    id: 2,
    icon: <FiBook />,
    title: "Purpose of this Policy",
    content: (
      <>
        <p className="mb-4">This policy is intended to:</p>
        <ul className="space-y-3 list-disc pl-6 marker:text-[#e2cb68]">
          <li>
            Establish controls to detect and prevent the use of The Fame
            Exchange's services for illicit financial activity;
          </li>
          <li>
            Comply with applicable laws and regulations regarding AML/CTF;
          </li>
          <li>
            Protect our users, Talent, investors, and business from reputational
            and legal risk;
          </li>
          <li>
            Ensure accountability and transparency across all transactional
            activity.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: 3,
    icon: <FiGlobe />,
    title: "Scope",
    content: (
      <>
        <p className="mb-4">
          This AML Policy applies to all individuals and entities who interact
          with The Fame Exchange platform, including:
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          <div className="bg-white/5 p-4 rounded-lg border border-white/10 hover:border-[#e2cb68]/30 transition-all">
            <h3 className="font-bold text-[#e2cb68] mb-2">Fans/Investors</h3>
            <p className="text-sm">
              Who engage in BTS-related purchases or virtual experience bookings
            </p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10 hover:border-[#e2cb68]/30 transition-all">
            <h3 className="font-bold text-[#e2cb68] mb-2">Talent</h3>
            <p className="text-sm">
              Artists, Athletes, Influencers who earn fiat revenue from branded
              share activity
            </p>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10 hover:border-[#e2cb68]/30 transition-all">
            <h3 className="font-bold text-[#e2cb68] mb-2">Employees</h3>
            <p className="text-sm">
              Who handle customer service, operations, finance, or onboarding
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 4,
    icon: <FiBook />,
    title: "Definitions",
    content: (
      <>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white/5 p-6 rounded-xl border border-white/10 hover:border-[#e2cb68]/50 transition-all group">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-[#e2cb68]/10 flex items-center justify-center group-hover:bg-[#e2cb68]/20 transition-all">
                <span className="text-[#e2cb68] text-lg font-bold">ML</span>
              </div>
              <h3 className="font-bold text-lg">Money Laundering</h3>
            </div>
            <p>
              The process of concealing the origins of illegally obtained money,
              typically by transferring it through legitimate businesses or
              accounts.
            </p>
          </div>

          <div className="bg-white/5 p-6 rounded-xl border border-white/10 hover:border-[#e2cb68]/50 transition-all group">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-[#e2cb68]/10 flex items-center justify-center group-hover:bg-[#e2cb68]/20 transition-all">
                <span className="text-[#e2cb68] text-lg font-bold">TF</span>
              </div>
              <h3 className="font-bold text-lg">Terrorist Financing</h3>
            </div>
            <p>
              The process of providing funds for terrorist activity through
              either legal or illegal means.
            </p>
          </div>

          <div className="bg-white/5 p-6 rounded-xl border border-white/10 hover:border-[#e2cb68]/50 transition-all group">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-[#e2cb68]/10 flex items-center justify-center group-hover:bg-[#e2cb68]/20 transition-all">
                <span className="text-[#e2cb68] text-lg font-bold">KY</span>
              </div>
              <h3 className="font-bold text-lg">KYC</h3>
            </div>
            <p>
              Know Your Customer - A process to verify the identity of clients
              and assess their risk profiles.
            </p>
          </div>

          <div className="bg-white/5 p-6 rounded-xl border border-white/10 hover:border-[#e2cb68]/50 transition-all group">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-[#e2cb68]/10 flex items-center justify-center group-hover:bg-[#e2cb68]/20 transition-all">
                <span className="text-[#e2cb68] text-lg font-bold">CT</span>
              </div>
              <h3 className="font-bold text-lg">CTR</h3>
            </div>
            <p>
              Currency Transaction Report - A report filed for cash transactions
              over $10,000.
            </p>
          </div>

          <div className="bg-white/5 p-6 rounded-xl border border-white/10 hover:border-[#e2cb68]/50 transition-all group">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-[#e2cb68]/10 flex items-center justify-center group-hover:bg-[#e2cb68]/20 transition-all">
                <span className="text-[#e2cb68] text-lg font-bold">SA</span>
              </div>
              <h3 className="font-bold text-lg">SAR</h3>
            </div>
            <p>
              Suspicious Activity Report - A report made to authorities when
              suspicious or unusual activity is identified.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 5,
    icon: <FiUsers />,
    title: "AML Compliance Officer",
    content: (
      <>
        <p>
          We designate a qualified AML Compliance Officer who is responsible
          for:
        </p>
        <ul className="space-y-3 list-disc pl-6 marker:text-[#e2cb68] mt-4">
          <li>Developing and maintaining AML procedures;</li>
          <li>Overseeing KYC and risk management practices;</li>
          <li>Monitoring transactions for suspicious activity;</li>
          <li>Filing reports with appropriate authorities, when necessary;</li>
          <li>Ensuring ongoing training and policy updates;</li>
          <li>Coordinating audits or regulatory inquiries.</li>
        </ul>

        <div className="mt-8 bg-[#0A0B0E] p-6 rounded-xl border border-[#e2cb68]/30">
          <h3 className="text-xl font-bold text-[#e2cb68] mb-4 flex items-center gap-2">
            Contact Our Compliance Team
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <div className="mt-1 text-[#e2cb68]">
                <FaEnvelope />
              </div>
              <div>
                {/* <p className="text-sm text-gray-400">Email</p> */}
                <p className="font-medium">aml@thefameexchange.com</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="mt-1 text-[#e2cb68]">
                <FaPhoneAlt />
              </div>
              <div>
                {/* <p className="text-sm text-gray-400">Phone</p> */}
                <p className="font-medium">1-800-123-4567</p>
              </div>
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 6,
    icon: <FiClipboard />,
    title: "Know Your Customer (KYC) Program",
    content: (
      <>
        <p>
          To prevent anonymity-based abuse, The Fame Exchange implements a
          tiered KYC program.
        </p>

        <div className="space-y-8 mt-6">
          <div>
            <h3 className="text-xl font-semibold text-[#e2cb68] mb-3">
              For Fans/Investors (Buyers)
            </h3>
            <ul className="space-y-2 list-disc pl-6 marker:text-[#e2cb68]">
              <li>Full name, email, verified mobile number;</li>
              <li>
                Government-issued ID (for transactions exceeding thresholds);
              </li>
              <li>
                Address and date of birth (if participating in BTS resale
                markets or scheduled financial engagement);
              </li>
              <li>
                Optional selfie verification (for high-risk jurisdictions).
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-[#e2cb68] mb-3">
              For Talent (Sellers)
            </h3>
            <ul className="space-y-2 list-disc pl-6 marker:text-[#e2cb68]">
              <li>Government-issued ID;</li>
              <li>Legal name and business name (if applicable);</li>
              <li>Address and contact info;</li>
              <li>Banking information for payouts (must match legal ID);</li>
              <li>
                Media and career background (for reputation verification).
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-[#e2cb68] mb-3">
              For Business Partners or Vendors
            </h3>
            <ul className="space-y-2 list-disc pl-6 marker:text-[#e2cb68]">
              <li>Company registration documents;</li>
              <li>List of beneficial owners (if applicable);</li>
              <li>Tax Identification Numbers (TIN/EIN);</li>
              <li>
                Compliance contacts and jurisdictional licenses, if necessary.
              </li>
            </ul>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 7,
    icon: <FiAlertTriangle />,
    title: "Risk Assessment and User Categorization",
    content: (
      <>
        <p>We apply a risk-based approach (RBA) to all users:</p>

        <div className="overflow-x-auto mt-6">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-[#e2cb68]/30">
                <th className="text-left py-3 px-4 font-bold text-[#e2cb68]">
                  Risk Level
                </th>
                <th className="text-left py-3 px-4 font-bold text-[#e2cb68]">
                  Description
                </th>
                <th className="text-left py-3 px-4 font-bold text-[#e2cb68]">
                  Controls Applied
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              <tr>
                <td className="py-3 px-4 font-semibold">Low</td>
                <td className="py-3 px-4">
                  Basic users with limited transactional history
                </td>
                <td className="py-3 px-4">
                  Email verification, payment gateway KYC
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold">Medium</td>
                <td className="py-3 px-4">
                  Frequent buyers, larger BTS holders, Talent with high
                  engagement
                </td>
                <td className="py-3 px-4">
                  Enhanced ID checks, behavioral monitoring
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold">High</td>
                <td className="py-3 px-4">
                  International users, PEPs, or high-volume purchasers
                </td>
                <td className="py-3 px-4">
                  Manual review, document authentication, possible onboarding
                  denial
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </>
    ),
  },
  {
    id: 8,
    icon: <FiEye />,
    title: "Monitoring and Detection",
    content: (
      <>
        <p>We use automated tools and manual review processes to monitor:</p>
        <ul className="space-y-2 list-disc pl-6 marker:text-[#e2cb68] mt-4">
          <li>Transaction volume and frequency;</li>
          <li>Abnormal patterns or inconsistencies;</li>
          <li>Sudden large purchases or withdrawals;</li>
          <li>Use of multiple accounts or proxies;</li>
          <li>Transactions from sanctioned jurisdictions.</li>
        </ul>

        <div className="mt-6">
          <h3 className="text-xl font-semibold text-[#e2cb68] mb-3">
            Red Flag Indicators may include:
          </h3>
          <ul className="space-y-2 list-disc pl-6 marker:text-[#e2cb68]">
            <li>Attempts to bypass KYC thresholds;</li>
            <li>Rapid trading or BTS flipping without clear purpose;</li>
            <li>
              Multiple accounts with the same IP, device, or payment method;
            </li>
            <li>
              Talent accounts receiving high-volume transactions from few
              sources.
            </li>
          </ul>
        </div>

        <p className="mt-6 italic">
          All suspicious activity is escalated to the Compliance Officer and
          reviewed within 24 hours.
        </p>
      </>
    ),
  },
  {
    id: 9,
    icon: <FiFlag />,
    title: "Suspicious Activity Reporting",
    content: (
      <>
        <p>If we detect suspicious behavior, The Fame Exchange will:</p>
        <ul className="space-y-2 list-disc pl-6 marker:text-[#e2cb68] mt-4">
          <li>
            File a Suspicious Activity Report (SAR) with the appropriate federal
            or state authorities when required;
          </li>
          <li>Maintain a copy of the report and internal notes;</li>
          <li>Not inform the involved party (per "non-tipping-off" rules);</li>
          <li>Document follow-up actions and outcomes.</li>
        </ul>
        <p className="mt-4 font-semibold italic">
          We reserve the right to suspend or terminate any account associated
          with suspicious activity without prior notice.
        </p>
      </>
    ),
  },
  {
    id: 10,
    icon: <FiGlobe />,
    title: "Prohibited and Sanctioned Jurisdictions",
    content: (
      <>
        <p>
          The Fame Exchange does not serve or support users located in or
          transacting from the following:
        </p>
        <ul className="space-y-2 list-disc pl-6 marker:text-[#e2cb68] mt-4">
          <li>
            Countries sanctioned by the U.S. Department of the Treasury's Office
            of Foreign Assets Control (OFAC);
          </li>
          <li>
            Jurisdictions known for high risk of money laundering or terrorist
            financing (per FATF);
          </li>
          <li>
            Users identified on Sanctions, Blocked Persons, or Terror
            Watchlists.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: 11,
    icon: <FiDatabase />,
    title: "Recordkeeping",
    content: (
      <>
        <p>In compliance with applicable regulations:</p>
        <ul className="space-y-2 list-disc pl-6 marker:text-[#e2cb68] mt-4">
          <li>
            All KYC data is securely retained for a minimum of 5 years from
            account closure or last transaction;
          </li>
          <li>
            SARs and internal reports are kept confidential and protected;
          </li>
          <li>
            Access to data is restricted to compliance and authorized legal
            personnel only.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: 12,
    icon: <FiAward />,
    title: "Employee Training",
    content: (
      <>
        <p>
          All staff involved in compliance, onboarding, finance, or customer
          support undergo regular AML training that covers:
        </p>
        <ul className="space-y-2 list-disc pl-6 marker:text-[#e2cb68] mt-4">
          <li>Recognizing red flags;</li>
          <li>Responding to suspicious activity;</li>
          <li>Confidentiality obligations;</li>
          <li>Annual policy updates.</li>
        </ul>
      </>
    ),
  },
  {
    id: 13,
    icon: <FiShield />,
    title: "Platform Integrity and Reporting Violations",
    content: (
      <>
        <p>
          Users are encouraged to report suspected abuse, fraud, or financial
          misconduct involving other users by contacting{" "}
          <span className="text-[#e2cb68] font-semibold">
            aml@thefameexchange.com
          </span>
          . Reports are confidential and investigated discreetly.
        </p>
      </>
    ),
  },
  {
    id: 14,
    icon: <FiRefreshCw />,
    title: "Policy Updates",
    content: (
      <>
        <p>
          This policy may be updated periodically to reflect regulatory changes,
          platform evolution, or industry best practices. Revisions will be
          posted on our website, and material changes will be communicated to
          affected users.
        </p>
      </>
    ),
  },
  {
    id: 15,
    icon: <FiMail />,
    title: "Contact Us",
    content: (
      <>
        <p>For any questions, feedback, or compliance inquiries:</p>
        <div className="mt-6 bg-[#e2cb68]/10 p-6 rounded-xl border border-[#e2cb68]/30">
          <h3 className="text-xl font-bold text-[#e2cb68] mb-4">
            The Fame Exchange Inc.
          </h3>
          <div className="space-y-3">
            <p className="flex items-start gap-3">
              <span className="mt-1">
                <FcManager className="text-[#e2cb68]" />
              </span>
              <span>AML Compliance Officer</span>
            </p>
            <p className="flex items-start gap-3">
              <span className="mt-1">
                <FaMapMarkerAlt className="text-[#e2cb68]" />
              </span>
              <span>825 E Gate Blvd, Garden City, NY 11530</span>
            </p>
            <p className="flex items-start gap-3">
              <span className="mt-1">
                <FaEnvelope className="text-[#e2cb68]" />
              </span>
              <span>aml@thefameexchange.com</span>
            </p>
            <p className="flex items-start gap-3">
              <span className="mt-1">
                <FaPhoneAlt className="text-[#e2cb68]" />
              </span>
              <span>1-800-123-4567</span>
            </p>
            <p className="flex items-start gap-3">
              <span className="mt-1">
                <FiGlobe className="text-[#e2cb68]" />
              </span>
              <span>www.thefameexchange.com</span>
            </p>
          </div>
        </div>
      </>
    ),
  },
];
export default amlData;
