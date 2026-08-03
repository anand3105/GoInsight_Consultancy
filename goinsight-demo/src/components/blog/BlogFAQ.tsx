import { ChevronDown } from "lucide-react";
import type { BlogFAQ as BlogFAQItem } from "@/data/blog-data";

interface BlogFAQProps {
  faqs: BlogFAQItem[];
}

/**
 * Answer-engine-optimized FAQ block.
 *
 * Uses native <details>/<summary> so every answer stays in the rendered HTML
 * even when collapsed — crawlers, featured-snippet extractors, and LLMs can
 * read the text (a JS accordion that unmounts closed items cannot be indexed).
 * The `.blog-faq` class is the target of the page's SpeakableSpecification.
 */
export default function BlogFAQ({ faqs }: BlogFAQProps) {
  if (!faqs.length) return null;

  return (
    <section className="blog-faq my-10" aria-labelledby="faq-heading">
      <h2
        id="faq-heading"
        className="text-2xl md:text-3xl font-bold text-brand-dark mb-5"
      >
        Frequently Asked Questions
      </h2>

      <div className="space-y-2 not-prose">
        {faqs.map((faq, index) => (
          <details
            key={index}
            className="group border border-gray-200 rounded-lg overflow-hidden bg-white open:border-brand-yellow/50"
            {...(index === 0 ? { open: true } : {})}
          >
            <summary className="flex items-center justify-between gap-3 px-4 py-3 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
              <h3 className="text-sm md:text-base font-semibold text-brand-dark">
                {faq.question}
              </h3>
              <ChevronDown className="w-4 h-4 text-brand-yellow flex-shrink-0 transition-transform duration-200 group-open:rotate-180" />
            </summary>
            <p className="px-4 pb-4 text-sm text-gray-600 leading-relaxed">
              {faq.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
