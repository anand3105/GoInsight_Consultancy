import type { MetadataRoute } from "next";

/**
 * Search engines and AI assistants (GEO) may crawl everything except the API.
 * AI bots are listed explicitly so the policy stays clear if the default changes.
 */
const aiAndSearchBots = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "Google-Extended",
  "Applebot-Extended",
  "anthropic-ai",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
  "Bingbot",
  "DuckAssistBot",
  "Amazonbot",
  "Meta-ExternalAgent",
  "CCBot",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: "/api/" },
      { userAgent: aiAndSearchBots, allow: "/", disallow: "/api/" },
    ],
    sitemap: "https://goinsight.in/sitemap.xml",
    host: "https://goinsight.in",
  };
}
