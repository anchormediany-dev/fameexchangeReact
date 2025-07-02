import { FaGavel, FaUserShield, FaExchangeAlt, FaLock } from "react-icons/fa";
import { MdPayments, MdOutlineCancel, MdOutlineSecurity } from "react-icons/md";
import { RiShieldCheckFill } from "react-icons/ri";

const terms = [
  {
    title: "Eligibility",
    content:
      "You must be at least 13 years old to use the platform. If you are under 18, a parent or guardian must supervise your use and agree to these terms. You must provide accurate information and follow all applicable laws.",
    icon: <FaUserShield />,
  },
  {
    title: "Services We Provide",
    content:
      "The Fame Exchange allows fans and investors to buy Branded Talent Shares (BTS), join live virtual Meet & Greets, and access AI-powered talent tools. All payments are made using real currency, not cryptocurrency.",
    icon: <FaExchangeAlt />,
  },
  {
    title: "Account Registration",
    content:
      "You are responsible for keeping your login details secure. Do not use someone else’s account. You are fully responsible for all activity under your account.",
    icon: <FaLock />,
  },
  {
    title: "User Conduct",
    content:
      "You may not use the platform for illegal activities, impersonate others, spread harmful code, or try to cheat the BTS system. Misuse of the platform may lead to suspension.",
    icon: <RiShieldCheckFill />,
  },
  {
    title: "About BTS",
    content:
      "Branded Talent Shares (BTS) are digital engagement tokens. They are not real investments and have no cash value. BTS can only be used within the Fame Exchange and do not represent ownership or profit.",
    icon: <MdOutlineSecurity />,
  },
  {
    title: "Payments & Cancellations",
    content:
      "All payments are processed in U.S. Dollars. You can buy BTS, book virtual events, or purchase merchandise. Fans must cancel bookings at least 24 hours in advance for a full refund. If a Talent cancels, you will receive a refund or credit.",
    icon: <MdPayments />,
  },
  {
    title: "Talent Expectations",
    content:
      "Talents must update their availability, attend scheduled events, and provide accurate personal information. Fame Exchange may remove Talents who violate rules or mislead fans.",
    icon: <FaUserShield />,
  },
  {
    title: "Intellectual Property",
    content:
      "All content on the platform is owned by The Fame Exchange or its partners. You may not reuse or copy our content. Any content you upload remains yours, but we may use it to promote the platform.",
    icon: <FaGavel />,
  },
  {
    title: "Disclaimers",
    content:
      "We do not guarantee BTS value, platform availability, or any results. Use of the platform is at your own risk. No warranties are given for services, performance, or content.",
    icon: <MdOutlineCancel />,
  },
  {
    title: "Limitation of Liability",
    content:
      "We are not responsible for indirect or unexpected damages. Our total liability to you will not exceed the amount you paid in the past 12 months.",
    icon: <FaGavel />,
  },
  {
    title: "Indemnification",
    content:
      "You agree to protect and hold The Fame Exchange harmless from any claims, damages, or costs that result from your misuse of the platform or violation of these terms.",
    icon: <RiShieldCheckFill />,
  },
  {
    title: "Account Termination",
    content:
      "We may suspend or delete your account at any time if you break the rules, act fraudulently, or fail to meet payment terms. In such cases, BTS and scheduled sessions may be lost without refund.",
    icon: <MdOutlineSecurity />,
  },
  {
    title: "Legal Jurisdiction",
    content:
      "These terms are governed by the laws of New York. Any legal issues must be handled in Nassau County, New York.",
    icon: <FaGavel />,
  },
  {
    title: "Dispute Resolution",
    content:
      "You must first try to resolve disputes directly with us. If unresolved, disputes will go to binding arbitration. You waive your right to class action lawsuits and jury trials.",
    icon: <FaGavel />,
  },
  {
    title: "Changes to Terms",
    content:
      "We may update these terms at any time. You agree to the updated terms by continuing to use the platform after changes are posted.",
    icon: <MdOutlineCancel />,
  },
];

export default terms;
