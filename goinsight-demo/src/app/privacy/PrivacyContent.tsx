"use client";

import LegalPageLayout, {
  LegalSection,
} from "@/components/LegalPageLayout";

const sections: LegalSection[] = [
  {
    id: "information-we-collect",
    title: "Information We Collect",
    content: (
      <>
        <p>
          We collect information to provide and improve our services. The types
          of information we collect include:
        </p>
        <p className="font-semibold text-brand-dark">Personal Information</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            Name, email address, phone number, and company name when you fill
            out contact forms, request consultations, or engage our services.
          </li>
          <li>
            Billing and payment information when you purchase our consulting
            services.
          </li>
          <li>
            Professional details such as job title and department, relevant to
            delivering our analytics solutions.
          </li>
        </ul>
        <p className="font-semibold text-brand-dark">Analytics & Usage Data</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            Browser type, device information, IP address, and operating system.
          </li>
          <li>
            Pages visited, time spent on pages, referring URLs, and navigation
            patterns on our website.
          </li>
          <li>
            We use analytics tools (such as Google Analytics) to understand
            website usage and improve our services.
          </li>
        </ul>
        <p className="font-semibold text-brand-dark">Cookies</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            <span className="font-medium">Essential cookies:</span> Required for
            the website to function properly (session management, security).
          </li>
          <li>
            <span className="font-medium">Analytics cookies:</span> Help us
            understand how visitors interact with our website.
          </li>
          <li>
            <span className="font-medium">Preference cookies:</span> Remember
            your settings and preferences for a better experience.
          </li>
        </ul>
        <p>
          You can control cookie preferences through your browser settings. Note
          that disabling certain cookies may affect website functionality.
        </p>
      </>
    ),
  },
  {
    id: "how-we-use-information",
    title: "How We Use Your Information",
    content: (
      <>
        <p>We use the information we collect for the following purposes:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            <span className="font-medium">Service delivery:</span> To provide
            analytics consulting, dashboard development, AI/ML solutions, and
            training services as agreed with clients.
          </li>
          <li>
            <span className="font-medium">Communication:</span> To respond to
            inquiries, send project updates, share relevant insights, and
            provide customer support.
          </li>
          <li>
            <span className="font-medium">Improvement:</span> To analyse usage
            patterns, improve our website and services, and develop new
            offerings.
          </li>
          <li>
            <span className="font-medium">Legal compliance:</span> To comply
            with applicable laws, regulations, and legal processes.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "data-sharing",
    title: "Data Sharing & Third-Party Services",
    content: (
      <>
        <p>
          We do not sell, trade, or rent your personal information to third
          parties. We may share information in the following circumstances:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            <span className="font-medium">Service providers:</span> Trusted
            third-party vendors who assist in operating our website, conducting
            our business, or serving our clients (e.g., hosting providers,
            payment processors), subject to confidentiality agreements.
          </li>
          <li>
            <span className="font-medium">Analytics platforms:</span> We use
            tools such as Google Analytics to collect anonymised usage data for
            website improvement.
          </li>
          <li>
            <span className="font-medium">Legal requirements:</span> When
            required by law, regulation, legal process, or governmental request.
          </li>
          <li>
            <span className="font-medium">Business transfers:</span> In
            connection with a merger, acquisition, or sale of assets, your
            information may be transferred as part of that transaction.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "data-security",
    title: "Data Security",
    content: (
      <>
        <p>
          We implement appropriate technical and organisational measures to
          protect your personal information against unauthorised access,
          alteration, disclosure, or destruction. These measures include:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>SSL/TLS encryption for data transmitted to and from our website.</li>
          <li>Access controls limiting data access to authorised personnel only.</li>
          <li>Regular security assessments and updates to our systems.</li>
          <li>
            Secure storage of client data with industry-standard encryption
            protocols.
          </li>
        </ul>
        <p>
          While we strive to use commercially acceptable means to protect your
          personal information, no method of transmission over the Internet or
          electronic storage is 100% secure. We cannot guarantee absolute
          security.
        </p>
      </>
    ),
  },
  {
    id: "client-data-confidentiality",
    title: "Client Data & Confidentiality",
    content: (
      <>
        <p>
          As an analytics consulting firm, we often work with sensitive business
          data. We treat all client data with the utmost confidentiality:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            All client engagements are governed by Non-Disclosure Agreements
            (NDAs) executed before any data is shared.
          </li>
          <li>
            Client datasets used for analytics, dashboards, or AI/ML projects
            are processed solely for the agreed-upon scope and are never shared
            with other clients or third parties.
          </li>
          <li>
            We maintain strict data segregation practices to ensure client data
            is isolated and protected.
          </li>
          <li>
            Upon project completion or contract termination, client data is
            returned or securely deleted as per the terms of the engagement.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "data-retention",
    title: "Data Retention",
    content: (
      <>
        <p>
          We retain personal information only for as long as necessary to fulfil
          the purposes for which it was collected, including:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            <span className="font-medium">Contact form submissions:</span>{" "}
            Retained for up to 2 years from the date of submission, unless an
            ongoing business relationship exists.
          </li>
          <li>
            <span className="font-medium">Client project data:</span> Retained
            for the duration of the engagement plus any period required by
            applicable law or contractual obligations.
          </li>
          <li>
            <span className="font-medium">Analytics data:</span> Anonymised
            website analytics data may be retained indefinitely for trend
            analysis.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "your-rights",
    title: "Your Rights",
    content: (
      <>
        <p>
          You have the following rights regarding your personal information:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            <span className="font-medium">Right to access:</span> Request a copy
            of the personal data we hold about you.
          </li>
          <li>
            <span className="font-medium">Right to correction:</span> Request
            correction of inaccurate or incomplete personal data.
          </li>
          <li>
            <span className="font-medium">Right to deletion:</span> Request
            deletion of your personal data, subject to legal and contractual
            obligations.
          </li>
          <li>
            <span className="font-medium">Right to object:</span> Object to the
            processing of your personal data for certain purposes.
          </li>
          <li>
            <span className="font-medium">Right to withdraw consent:</span>{" "}
            Withdraw consent previously given for data processing, without
            affecting the lawfulness of processing based on consent before its
            withdrawal.
          </li>
        </ul>
        <p>
          To exercise any of these rights, please contact us at{" "}
          <a
            href="mailto:hello@goinsight.in"
            className="text-brand-yellow hover:underline font-medium"
          >
            hello@goinsight.in
          </a>
          . We will respond to your request within 30 days.
        </p>
      </>
    ),
  },
  {
    id: "indian-it-act",
    title: "Compliance with Indian IT Act 2000",
    content: (
      <>
        <p>
          GoInsight is committed to compliance with the Information Technology
          Act, 2000 and the Information Technology (Reasonable Security Practices
          and Procedures and Sensitive Personal Data or Information) Rules, 2011.
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            We implement reasonable security practices and procedures as required
            under Section 43A of the IT Act.
          </li>
          <li>
            Sensitive personal data is collected, stored, and processed in
            accordance with Rule 5 and Rule 6 of the SPDI Rules.
          </li>
          <li>
            We maintain a comprehensive privacy policy as mandated by Section 72A
            of the IT Act.
          </li>
          <li>
            Our Grievance Officer can be reached at{" "}
            <a
              href="mailto:hello@goinsight.in"
              className="text-brand-yellow hover:underline font-medium"
            >
              hello@goinsight.in
            </a>{" "}
            for any privacy-related concerns or complaints.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "cookies-policy",
    title: "Cookies Policy",
    content: (
      <>
        <p>
          Our website uses cookies and similar tracking technologies to enhance
          your browsing experience. Here is how we use them:
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse mt-2">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2 pr-4 font-semibold text-brand-dark">
                  Cookie Type
                </th>
                <th className="text-left py-2 pr-4 font-semibold text-brand-dark">
                  Purpose
                </th>
                <th className="text-left py-2 font-semibold text-brand-dark">
                  Duration
                </th>
              </tr>
            </thead>
            <tbody className="text-brand-secondary">
              <tr className="border-b border-gray-100">
                <td className="py-2 pr-4">Essential</td>
                <td className="py-2 pr-4">Site functionality, security</td>
                <td className="py-2">Session</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-2 pr-4">Analytics</td>
                <td className="py-2 pr-4">
                  Usage tracking, site improvement
                </td>
                <td className="py-2">Up to 2 years</td>
              </tr>
              <tr>
                <td className="py-2 pr-4">Preferences</td>
                <td className="py-2 pr-4">User settings, language</td>
                <td className="py-2">1 year</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          You may opt out of non-essential cookies at any time through your
          browser settings. For most browsers, you can find cookie management
          options under &quot;Settings&quot; → &quot;Privacy&quot; or
          &quot;Security&quot;.
        </p>
      </>
    ),
  },
  {
    id: "contact",
    title: "Contact Us",
    content: (
      <>
        <p>
          If you have any questions or concerns about this Privacy Policy or our
          data practices, please contact us:
        </p>
        <div className="bg-white rounded-xl border border-gray-100 p-5 mt-2">
          <p className="font-semibold text-brand-dark mb-2">
            GoInsight — Privacy Inquiries
          </p>
          <ul className="space-y-1 text-sm">
            <li>
              <span className="font-medium text-brand-dark">Email:</span>{" "}
              <a
                href="mailto:hello@goinsight.in"
                className="text-brand-yellow hover:underline"
              >
                hello@goinsight.in
              </a>
            </li>
            <li>
              <span className="font-medium text-brand-dark">Phone:</span>{" "}
              <a
                href="tel:+917042549224"
                className="text-brand-yellow hover:underline"
              >
                +91-7042549224
              </a>
            </li>
            <li>
              <span className="font-medium text-brand-dark">Website:</span>{" "}
              <a
                href="https://goinsight.in"
                className="text-brand-yellow hover:underline"
              >
                goinsight.in
              </a>
            </li>
          </ul>
        </div>
      </>
    ),
  },
];

export default function PrivacyContent() {
  return (
    <LegalPageLayout
      title="Privacy Policy"
      lastUpdated="February 14, 2026"
      sections={sections}
    />
  );
}
