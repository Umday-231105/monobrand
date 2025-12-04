import { NextResponse } from "next/server";

type BrandColor = {
  name: string;
  hex: string;
};

type BrandResult = {
  idea: string;
  industry: string;
  audience: string;
  tone: string;
  name: string;
  tagline: string;
  colors: BrandColor[];
  website: {
    heroTitle: string;
    heroSubtitle: string;
    sections: string[];
    primaryCta: string;
    secondaryCta: string;
  };
  socialPosts: string[];
  adStoryboard: string[];
};

function simpleSlugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function guessIndustry(idea: string): string {
  const t = idea.toLowerCase();
  if (t.includes("sneaker") || t.includes("shoe")) return "Fashion / Footwear";
  if (t.includes("app") || t.includes("saas") || t.includes("software")) return "Software / SaaS";
  if (t.includes("restaurant") || t.includes("cafe")) return "Food / Hospitality";
  if (t.includes("course") || t.includes("education")) return "Education";
  if (t.includes("fitness") || t.includes("gym")) return "Health & Fitness";
  return "General Startup";
}

function guessAudience(idea: string): string {
  const t = idea.toLowerCase();
  if (t.includes("gen z")) return "Gen Z";
  if (t.includes("student")) return "Students";
  if (t.includes("founder") || t.includes("startup")) return "Startup Founders";
  if (t.includes("parents")) return "Parents";
  return "Modern digital consumers";
}

function guessTone(idea: string): string {
  const t = idea.toLowerCase();
  if (t.includes("luxury") || t.includes("premium")) return "Minimal, premium, elegant";
  if (t.includes("eco") || t.includes("sustainable") || t.includes("green"))
    return "Clean, earthy, eco-friendly";
  if (t.includes("fun") || t.includes("game") || t.includes("social"))
    return "Playful, energetic, friendly";
  return "Modern, confident, direct";
}

function generateName(idea: string, industry: string): string {
  const keywords = simpleSlugify(idea).split(" ").filter(Boolean);
  if (keywords.length === 0) return "NovaBrand";

  const first = keywords[0];
  const second = keywords[1] || "";

  if (industry.includes("Fashion")) return `${capital(first)}Step`;
  if (industry.includes("Software")) return `${capital(first)}Cloud`;
  if (industry.includes("Education")) return `${capital(first)}Learn`;
  if (industry.includes("Health")) return `${capital(first)}Fit`;

  return `${capital(first)}Labs`;
}

function capital(s: string): string {
  if (!s) return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function generateTagline(industry: string, tone: string): string {
  if (industry.includes("Fashion")) return "Style that moves with your world.";
  if (industry.includes("Software")) return "From idea to execution in a click.";
  if (industry.includes("Education")) return "Learning that fits your life.";
  if (industry.includes("Food")) return "Taste made unforgettable.";
  if (industry.includes("Health")) return "Small habits. Big changes.";
  if (tone.includes("eco")) return "Good for you. Better for the planet.";
  return "Turn bold ideas into reality.";
}

function generateColors(industry: string, tone: string): BrandColor[] {
  if (tone.toLowerCase().includes("eco")) {
    return [
      { name: "Forest Green", hex: "#2E5E3A" },
      { name: "Natural White", hex: "#F8F7F3" },
      { name: "Clay Brown", hex: "#A0673D" },
    ];
  }

  if (industry.includes("Software")) {
    return [
      { name: "Deep Navy", hex: "#020617" },
      { name: "Electric Blue", hex: "#2563EB" },
      { name: "Slate Gray", hex: "#64748B" },
    ];
  }

  return [
    { name: "Midnight", hex: "#020617" },
    { name: "Accent", hex: "#6366F1" },
    { name: "Soft Gray", hex: "#E5E7EB" },
  ];
}

function generateWebsiteCopy(name: string, industry: string, tone: string) {
  const heroTitle = `${name}: ${industry} reimagined.`;
  const heroSubtitle =
    tone.includes("eco")
      ? "Built for a world that cares about impact as much as results."
      : "Crafted for the people building what’s next.";

  const sections = [
    "Our Story",
    "What We Offer",
    "Why It Matters",
    "How It Works",
    "Testimonials",
  ];

  return {
    heroTitle,
    heroSubtitle,
    sections,
    primaryCta: "Get Started",
    secondaryCta: "Learn More",
  };
}

function generateSocialPosts(name: string, industry: string, tone: string): string[] {
  return [
    `🚀 Introducing ${name} — a new era for ${industry.toLowerCase()}.`,
    `${name} is built for people who are tired of average and ready for better.`,
    `From idea to launch, ${name} helps you move faster without losing quality.`,
    tone.includes("eco")
      ? `${name} proves you don't have to choose between impact and performance.`
      : `${name} helps you turn ambitious ideas into real, tangible results.`,
    `Tag someone who needs to know about ${name}.`,
  ];
}

function generateStoryboard(name: string, industry: string): string[] {
  return [
    "Shot 1 — Close-up of the problem in real life.",
    `Shot 2 — Quick cut to someone discovering ${name} on their laptop/phone.`,
    `Shot 3 — Fast montage of how ${name} transforms their ${industry.toLowerCase()}.`,
    "Shot 4 — Close-up UI / product hero shots.",
    "Shot 5 — Social proof: metrics, testimonials, or impact shots.",
    `Shot 6 — Clean outro with ${name} logo and a strong call-to-action.`,
  ];
}

export async function POST(req: Request) {
  try {
    const { idea } = await req.json();

    if (!idea || typeof idea !== "string" || idea.trim().length < 5) {
      return NextResponse.json(
        { error: "Please describe your idea in at least one sentence." },
        { status: 400 }
      );
    }

    const industry = guessIndustry(idea);
    const audience = guessAudience(idea);
    const tone = guessTone(idea);
    const name = generateName(idea, industry);
    const tagline = generateTagline(industry, tone);
    const colors = generateColors(industry, tone);
    const website = generateWebsiteCopy(name, industry, tone);
    const socialPosts = generateSocialPosts(name, industry, tone);
    const adStoryboard = generateStoryboard(name, industry);

    const result: BrandResult = {
      idea: idea.trim(),
      industry,
      audience,
      tone,
      name,
      tagline,
      colors,
      website,
      socialPosts,
      adStoryboard,
    };

    return NextResponse.json(result);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Something went wrong generating the brand." },
      { status: 500 }
    );
  }
}

