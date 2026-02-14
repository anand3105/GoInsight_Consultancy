"use client";

import { Building2, Shield, AlertTriangle } from "lucide-react";
import LegalPageLayout, {
  LegalSection,
} from "@/components/LegalPageLayout";

const sections: LegalSection[] = [
  {
    id: "general-disclaimer",
    title: "General Disclaimer",
    content: (
      <>
        <p>
          The information, analytics insights, reports, dashboards, and
          recommendations provided by GoInsight are based on data analysis and
          industry best practices. They are intended to support and inform
          business decision-making, but should not be treated as the sole basis
          for any business decision.
        </p>
        <p>
          All analytics outputs, recommendations, and consulting advice are
          provided on an &quot;as is&quot; and &quot;as available&quot; basis,
          without warranties of any kind, either express or implied, including
          but not limited to warranties of merchantability, fitness for a
          particular purpose, or non-infringement.
        </p>
      </>
    ),
  },
  {
    id: "no-guarantee",
    title: "No Guarantee of Outcomes",
    content: (
      <>
        <p>
          While GoInsight strives to deliver high-quality analytics solutions,
          we do not guarantee specific business outcomes, including but not
          limited to:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Specific revenue increases or cost reductions.</li>
          <li>
            Particular levels of operational efficiency improvements.
          </li>
          <li>
            Guaranteed accuracy of predictive models or forecasts.
          </li>
          <li>
            Specific market performance or competitive advantage.
          </li>
        </ul>
        <p>
          Business outcomes depend on numerous factors beyond the scope of our
          services, including market conditions, implementation quality, data
          quality, organisational readiness, and other variables outside our
          control. Past results showcased on our website or in marketing
          materials are specific to those engagements and are not indicative of
          future results.
        </p>
      </>
    ),
  },
  {
    id: "third-party-tools",
    title: "Third-Party Tools & Services",
    content: (
      <>
        <p>
          GoInsight utilises various third-party tools, platforms, and services
          in the delivery of our solutions, including but not limited to:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            <span className="font-medium">Microsoft Power BI:</span>{" "}
            Dashboards and reports built on Power BI are subject to
            Microsoft&apos;s terms of service, licensing, and availability.
          </li>
          <li>
            <span className="font-medium">Cloud platforms:</span> AWS, Azure,
            Google Cloud, and other cloud services are subject to their
            respective providers&apos; terms, SLAs, and availability.
          </li>
          <li>
            <span className="font-medium">AI/ML frameworks:</span> Open-source
            and proprietary AI tools used in our solutions are subject to their
            respective licences and terms.
          </li>
          <li>
            <span className="font-medium">Data connectors:</span>{" "}
            Third-party data connectors and APIs are subject to their
            providers&apos; terms and availability.
          </li>
        </ul>
        <p>
          GoInsight is not responsible for any changes, disruptions, or
          discontinuation of third-party tools and services. We make reasonable
          efforts to stay updated with third-party changes and notify clients of
          any material impact to their solutions.
        </p>
      </>
    ),
  },
  {
    id: "website-accuracy",
    title: "Website Accuracy",
    content: (
      <>
        <p>
          While we make every effort to ensure the information on our website is
          accurate and up to date, GoInsight does not warrant the completeness,
          reliability, or accuracy of any information on this site.
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            Case studies, statistics, and client results mentioned on the website
            are based on specific past engagements and may not reflect current
            capabilities or future outcomes.
          </li>
          <li>
            Service descriptions and offerings are subject to change without
            prior notice.
          </li>
          <li>
            Any reliance you place on information from our website is strictly at
            your own risk.
          </li>
          <li>
            Links to external websites are provided for convenience only. We do
            not endorse or assume responsibility for the content or practices of
            any linked third-party websites.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "professional-advice",
    title: "Professional Advice Disclaimer",
    content: (
      <>
        <p>
          The content on this website and the services provided by GoInsight do
          not constitute professional advice in the fields of finance, law, tax,
          or regulatory compliance. Specifically:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            Analytics insights should be used as one of many inputs in your
            decision-making process, not as the sole determinant.
          </li>
          <li>
            For financial, legal, or tax decisions, please consult qualified
            professionals in the respective fields.
          </li>
          <li>
            GoInsight is not a registered financial advisor, legal firm, or
            auditing entity.
          </li>
          <li>
            Any industry-specific analytics (healthcare, finance, education,
            etc.) are provided for informational and operational purposes only
            and do not replace domain-specific professional guidance.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "msme-registration",
    title: "MSME Registration Information",
    content: (
      <>
        <p>
          GoInsight is a registered Micro, Small and Medium Enterprise (MSME)
          under the Government of India, reflecting our commitment to
          transparency and compliance.
        </p>
      </>
    ),
  },
];

export default function DisclaimerContent() {
  return (
    <LegalPageLayout
      title="Disclaimer"
      lastUpdated="February 14, 2026"
      sections={sections}
    >
      {/* Udyam Registration Card */}
      <div className="mt-4 bg-gradient-to-br from-brand-primary to-[#1a2236] rounded-2xl p-6 md:p-8 text-white relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 bg-brand-yellow/20 rounded-xl flex items-center justify-center">
              <Building2 className="w-5 h-5 text-brand-yellow" />
            </div>
            <div>
              <h3 className="font-bold text-lg">MSME Registration</h3>
              <p className="text-white/50 text-xs">
                Government of India — Udyam Registration
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 mb-5">
            <div className="bg-white/[0.06] rounded-xl p-4 border border-white/[0.04]">
              <p className="text-[10px] font-bold tracking-[0.15em] text-white/30 uppercase mb-1">
                Registration Number
              </p>
              <p className="font-semibold text-brand-yellow text-sm">
                UDYAM-DL-11-0027676
              </p>
            </div>
            <div className="bg-white/[0.06] rounded-xl p-4 border border-white/[0.04]">
              <p className="text-[10px] font-bold tracking-[0.15em] text-white/30 uppercase mb-1">
                Enterprise Type
              </p>
              <p className="font-semibold text-white text-sm">
                Micro Enterprise
              </p>
            </div>
            <div className="bg-white/[0.06] rounded-xl p-4 border border-white/[0.04]">
              <p className="text-[10px] font-bold tracking-[0.15em] text-white/30 uppercase mb-1">
                Classification
              </p>
              <p className="font-semibold text-white text-sm">Services</p>
            </div>
            <div className="bg-white/[0.06] rounded-xl p-4 border border-white/[0.04]">
              <p className="text-[10px] font-bold tracking-[0.15em] text-white/30 uppercase mb-1">
                Location
              </p>
              <p className="font-semibold text-white text-sm">
                New Delhi, India
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-2 bg-white/[0.06] rounded-lg px-3 py-2 border border-white/[0.04]">
              <Shield className="w-3.5 h-3.5 text-brand-yellow" />
              <span className="text-xs text-white/70">
                MSMED Act, 2006 Compliant
              </span>
            </div>
            <div className="flex items-center gap-2 bg-white/[0.06] rounded-lg px-3 py-2 border border-white/[0.04]">
              <AlertTriangle className="w-3.5 h-3.5 text-brand-yellow" />
              <span className="text-xs text-white/70">
                Payment Protection for Service Providers
              </span>
            </div>
          </div>
        </div>

        {/* Decorative glow */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-brand-yellow/[0.04] rounded-full blur-3xl pointer-events-none" />
      </div>
    </LegalPageLayout>
  );
}
