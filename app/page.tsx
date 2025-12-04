"use client";

import { useState } from "react";

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

export default function Home() {
  const [idea, setIdea] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<BrandResult | null>(null);

  async function handleGenerate(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setResult(null);

    if (!idea.trim()) {
      setError("Please describe your idea first.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/generate-brand", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idea }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to generate brand.");
      }

      const data = (await res.json()) as BrandResult;
      setResult(data);
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 flex items-center justify-center px-4">
      <div className="w-full max-w-5xl py-10">
        <header className="mb-8 flex flex-col gap-2">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
            BrandForge <span className="text-indigo-400">Prototype</span>
          </h1>
          <p className="text-sm md:text-base text-slate-300 max-w-2xl">
            Turn a plain-text startup idea into a structured brand concept:
            name, tagline, colors, website outline, social posts, and an ad storyboard.
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1.5fr)] items-start">
          {/* Left side: input */}
          <section className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5 md:p-6 shadow-xl shadow-black/40">
            <form onSubmit={handleGenerate} className="flex flex-col gap-4">
              <label className="flex flex-col gap-2">
                <span className="text-sm font-medium text-slate-200">
                  Describe your idea
                </span>
                <textarea
                  className="min-h-[140px] rounded-xl border border-slate-700 bg-slate-900/80 px-3 py-2 text-sm text-slate-50 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none placeholder:text-slate-500"
                  placeholder={`Example: I want to build an eco-friendly sneaker brand for Gen Z that focuses on sustainability and minimalist design.`}
                  value={idea}
                  onChange={(e) => setIdea(e.target.value)}
                />
              </label>

              {error && (
                <p className="text-sm text-red-400 bg-red-950/40 border border-red-800 rounded-lg px-3 py-2">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-500 px-4 py-2.5 text-sm font-medium text-white shadow-lg shadow-indigo-500/30 hover:bg-indigo-400 transition disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <span className="h-4 w-4 border-2 border-slate-200/60 border-t-transparent rounded-full animate-spin" />
                    Generating…
                  </>
                ) : (
                  <>Generate Brand</>
                )}
              </button>

              <p className="text-xs text-slate-500">
                Prototype only — logic is rule-based now. We’ll plug real AI next.
              </p>
            </form>
          </section>

          {/* Right side: output */}
          <section className="space-y-4">
            {!result && !loading && (
              <div className="h-full border border-dashed border-slate-800 rounded-2xl p-6 text-sm text-slate-400 flex items-center justify-center text-center">
                Your generated brand will appear here: name, tagline, palette,
                website outline, social posts, and a mini ad storyboard.
              </div>
            )}

            {result && (
              <div className="space-y-4">
                {/* Brand core */}
                <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5">
                  <h2 className="text-lg font-semibold mb-1">
                    {result.name}
                  </h2>
                  <p className="text-sm text-slate-300 mb-3">
                    {result.tagline}
                  </p>
                  <div className="text-xs text-slate-400 space-y-1">
                    <p>
                      <span className="font-semibold text-slate-200">
                        Industry:
                      </span>{" "}
                      {result.industry}
                    </p>
                    <p>
                      <span className="font-semibold text-slate-200">
                        Audience:
                      </span>{" "}
                      {result.audience}
                    </p>
                    <p>
                      <span className="font-semibold text-slate-200">
                        Tone:
                      </span>{" "}
                      {result.tone}
                    </p>
                  </div>
                </div>

                {/* Colors */}
                <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5">
                  <h3 className="text-sm font-semibold text-slate-100 mb-3">
                    Color palette
                  </h3>
                  <div className="flex gap-3 flex-wrap">
                    {result.colors.map((c) => (
                      <div
                        key={c.hex}
                        className="flex flex-col items-start gap-2 text-xs"
                      >
                        <div
                          className="w-20 h-12 rounded-xl border border-slate-900"
                          style={{ backgroundColor: c.hex }}
                        />
                        <div className="space-y-0.5">
                          <p className="font-semibold text-slate-100">
                            {c.name}
                          </p>
                          <p className="font-mono text-slate-400">{c.hex}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Website outline */}
                <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5">
                  <h3 className="text-sm font-semibold text-slate-100 mb-2">
                    Website outline
                  </h3>
                  <p className="text-sm text-slate-200 mb-1">
                    {result.website.heroTitle}
                  </p>
                  <p className="text-xs text-slate-400 mb-3">
                    {result.website.heroSubtitle}
                  </p>
                  <ul className="text-xs text-slate-300 list-disc list-inside space-y-1 mb-3">
                    {result.website.sections.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                  <div className="flex gap-2 text-xs">
                    <span className="rounded-full bg-indigo-500/20 text-indigo-200 px-3 py-1 border border-indigo-500/40">
                      {result.website.primaryCta}
                    </span>
                    <span className="rounded-full bg-slate-800 px-3 py-1 border border-slate-700 text-slate-200">
                      {result.website.secondaryCta}
                    </span>
                  </div>
                </div>

                {/* Social posts */}
                <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5">
                  <h3 className="text-sm font-semibold text-slate-100 mb-2">
                    Social content ideas
                  </h3>
                  <ul className="text-xs text-slate-300 space-y-2">
                    {result.socialPosts.map((p, i) => (
                      <li key={i} className="border-l border-slate-700 pl-3">
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Ad storyboard */}
                <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5">
                  <h3 className="text-sm font-semibold text-slate-100 mb-2">
                    6-shot ad storyboard
                  </h3>
                  <ol className="text-xs text-slate-300 space-y-2 list-decimal list-inside">
                    {result.adStoryboard.map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ol>
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}

