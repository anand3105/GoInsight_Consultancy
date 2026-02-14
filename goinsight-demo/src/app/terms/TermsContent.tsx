"use client";

import LegalPageLayout, {
  LegalSection,
} from "@/components/LegalPageLayout";

const sections: LegalSection[] = [
  {
    id: "acceptance",
    title: "Acceptance of Terms",
    content: (
      <>
        <p>
          By accessing or using GoInsight&apos;s website and services, you agree
          to be bound by these Terms of Service. If you do not agree to these
          terms, please do not use our website or services.
        </p>
        <p>
          These terms apply to all visitors, users, clients, and others who
          access or use our services. We reserve the right to update or modify
          these terms at any time. Continued use of our services after any
          changes constitutes acceptance of the revised terms.
        </p>
      </>
    ),
  },
  {
    id: "services",
    title: "Services Description",
    content: (
      <>
        <p>
          GoInsight provides data analytics consulting services, including but
          not limited to:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            <span className="font-medium">Analytics Consulting:</span> Strategic
            data analytics advisory, business intelligence strategy development,
            and data maturity assessments.
          </li>
          <li>
            <span className="font-medium">Power BI & Dashboard Development:</span>{" "}
            Design, development, and deployment of interactive dashboards and
            reports using Power BI and other BI platforms.
          </li>
          <li>
            <span className="font-medium">Custom Dashboard Solutions:</span>{" "}
            Bespoke analytics dashboards tailored to specific industry and
            business needs.
          </li>
          <li>
            <span className="font-medium">AI/ML Solutions:</span> Machine
            learning models, predictive analytics, natural language processing,
            and AI-powered automation solutions.
          </li>
          <li>
            <span className="font-medium">Training & Workshops:</span>{" "}
            Corporate training programmes on data analytics, Power BI, Python,
            and AI/ML tools for teams and organisations.
          </li>
        </ul>
        <p>
          The specific scope, deliverables, and timelines for each engagement
          are defined in individual project proposals or Statements of Work
          (SOW) agreed upon with the client.
        </p>
      </>
    ),
  },
  {
    id: "client-obligations",
    title: "Client Obligations",
    content: (
      <>
        <p>As a client of GoInsight, you agree to:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            Provide accurate, complete, and timely information, data, and access
            necessary for the delivery of services.
          </li>
          <li>
            Designate a point of contact for project communication and decision
            making.
          </li>
          <li>
            Review and provide feedback on deliverables within the timelines
            agreed in the SOW.
          </li>
          <li>
            Ensure that any data shared with GoInsight is owned by you or that
            you have the legal right to share it for the intended purpose.
          </li>
          <li>
            Not use our services for any unlawful purpose or in violation of any
            applicable laws or regulations.
          </li>
          <li>
            Maintain the confidentiality of any proprietary tools, methodologies,
            or frameworks shared by GoInsight during the engagement.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "intellectual-property",
    title: "Intellectual Property Rights",
    content: (
      <>
        <p>
          All intellectual property rights are governed by the specific terms of
          each engagement:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            <span className="font-medium">Client deliverables:</span> Upon full
            payment, clients receive ownership of the specific deliverables
            (dashboards, reports, models) created exclusively for them, as
            defined in the SOW.
          </li>
          <li>
            <span className="font-medium">GoInsight IP:</span> All proprietary
            methodologies, frameworks, templates, code libraries, training
            materials, and tools developed by GoInsight remain the exclusive
            property of GoInsight.
          </li>
          <li>
            <span className="font-medium">Pre-existing IP:</span> Each party
            retains ownership of their pre-existing intellectual property. No
            licence is granted to the other party&apos;s pre-existing IP unless
            explicitly stated.
          </li>
          <li>
            <span className="font-medium">Website content:</span> All content on
            the GoInsight website — including text, graphics, logos, images, and
            software — is the property of GoInsight and is protected by Indian
            and international copyright laws.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "confidentiality",
    title: "Confidentiality & NDAs",
    content: (
      <>
        <p>
          Both GoInsight and its clients agree to maintain strict
          confidentiality regarding all proprietary and sensitive information
          exchanged during the course of an engagement:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            A mutual Non-Disclosure Agreement (NDA) is executed before the
            commencement of any project involving sensitive or proprietary data.
          </li>
          <li>
            Confidential information shall not be disclosed to any third party
            without prior written consent of the disclosing party.
          </li>
          <li>
            Confidentiality obligations survive the termination of the engagement
            for a period as specified in the NDA (typically 2–5 years).
          </li>
          <li>
            Exceptions to confidentiality include information that becomes
            publicly available through no fault of the receiving party, was
            already known prior to disclosure, or is required to be disclosed by
            law.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "payment",
    title: "Payment Terms",
    content: (
      <>
        <p>Payment terms for GoInsight&apos;s services are as follows:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            Pricing, payment schedules, and milestones are defined in the
            project proposal or SOW agreed upon before the engagement begins.
          </li>
          <li>
            Unless otherwise specified, invoices are payable within 15 days of
            the invoice date.
          </li>
          <li>
            A project advance (typically 30–50% of the project value) may be
            required before work commences.
          </li>
          <li>
            Late payments may attract interest at the rate of 1.5% per month on
            the outstanding amount.
          </li>
          <li>
            GoInsight reserves the right to suspend services if payments are
            overdue by more than 30 days.
          </li>
          <li>
            All fees are exclusive of applicable taxes (GST). Taxes will be
            charged as per the prevailing rates.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "limitation-of-liability",
    title: "Limitation of Liability",
    content: (
      <>
        <p>
          To the maximum extent permitted by applicable law:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            GoInsight&apos;s total liability for any claim arising out of or
            relating to the services shall not exceed the total fees paid by the
            client for the specific engagement giving rise to the claim.
          </li>
          <li>
            GoInsight shall not be liable for any indirect, incidental, special,
            consequential, or punitive damages, including but not limited to loss
            of profits, data, business, or goodwill.
          </li>
          <li>
            GoInsight does not guarantee specific business outcomes, revenue
            increases, or cost savings resulting from the use of our analytics
            insights and recommendations.
          </li>
          <li>
            GoInsight is not liable for delays or failures in performance caused
            by circumstances beyond our reasonable control, including force
            majeure events.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "indemnification",
    title: "Indemnification",
    content: (
      <>
        <p>
          You agree to indemnify, defend, and hold harmless GoInsight, its
          founders, employees, and agents from and against any claims, damages,
          losses, liabilities, and expenses (including reasonable legal fees)
          arising out of or relating to:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Your use of our services in violation of these terms.</li>
          <li>
            Any breach of your representations, warranties, or obligations under
            these terms or the applicable SOW.
          </li>
          <li>
            Any data or materials provided by you that infringe upon the
            intellectual property or other rights of a third party.
          </li>
          <li>
            Your failure to comply with applicable laws or regulations in
            connection with the use of our services.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "termination",
    title: "Termination",
    content: (
      <>
        <p>
          Either party may terminate an engagement under the following
          conditions:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            <span className="font-medium">By mutual agreement:</span> Both
            parties may agree to terminate the engagement at any time in writing.
          </li>
          <li>
            <span className="font-medium">For convenience:</span> Either party
            may terminate with 30 days&apos; written notice, subject to payment
            for work completed up to the termination date.
          </li>
          <li>
            <span className="font-medium">For cause:</span> Either party may
            terminate immediately if the other party materially breaches the
            terms and fails to cure the breach within 15 days of written notice.
          </li>
          <li>
            <span className="font-medium">Effect of termination:</span> Upon
            termination, the client shall pay for all services rendered and
            expenses incurred up to the date of termination. GoInsight will
            deliver all completed work and return or destroy client data as per
            the agreed terms.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "governing-law",
    title: "Governing Law & Jurisdiction",
    content: (
      <>
        <p>
          These Terms of Service shall be governed by and construed in
          accordance with the laws of India. Any disputes arising from or
          relating to these terms or our services shall be subject to the
          exclusive jurisdiction of the courts of New Delhi, India.
        </p>
        <p>
          The parties agree to first attempt to resolve any disputes amicably
          through good-faith negotiation. If the dispute cannot be resolved
          within 30 days, either party may pursue legal remedies in the courts
          of competent jurisdiction in New Delhi.
        </p>
      </>
    ),
  },
  {
    id: "msme-registration",
    title: "MSME Registration Details",
    content: (
      <>
        <p>
          GoInsight is a registered Micro, Small and Medium Enterprise (MSME)
          under the Government of India:
        </p>
        <div className="bg-white rounded-xl border border-gray-100 p-5 mt-2">
          <ul className="space-y-2 text-sm">
            <li>
              <span className="font-medium text-brand-dark">
                Udyam Registration Number:
              </span>{" "}
              UDYAM-DL-11-0027676
            </li>
            <li>
              <span className="font-medium text-brand-dark">
                Enterprise Type:
              </span>{" "}
              Micro Enterprise
            </li>
            <li>
              <span className="font-medium text-brand-dark">
                Classification:
              </span>{" "}
              Services
            </li>
            <li>
              <span className="font-medium text-brand-dark">Location:</span> New
              Delhi, India
            </li>
          </ul>
        </div>
        <p>
          As a registered MSME, GoInsight benefits from and complies with
          provisions under the Micro, Small and Medium Enterprises Development
          (MSMED) Act, 2006, including payment protection provisions for service
          providers.
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
          If you have any questions about these Terms of Service, please contact
          us:
        </p>
        <div className="bg-white rounded-xl border border-gray-100 p-5 mt-2">
          <p className="font-semibold text-brand-dark mb-2">
            GoInsight — Legal Inquiries
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

export default function TermsContent() {
  return (
    <LegalPageLayout
      title="Terms of Service"
      lastUpdated="February 14, 2026"
      sections={sections}
    />
  );
}
