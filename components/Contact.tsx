"use client";

import { motion } from "framer-motion";
import { FormEvent, useState } from "react";

import { Button } from "@/components/Button";
import { SITE } from "@/lib/constants";

type FormStatus = "idle" | "submitting" | "success" | "error";

export function ContactSection() {
  const [status, setStatus] = useState<FormStatus>("idle");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("submitting");

    const form = event.currentTarget;
    const data = new FormData(form);

    try {
      const response = await fetch(
        `https://formsubmit.co/ajax/${SITE.email}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
          },
          body: data,
        },
      );

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <motion.section
      id="contact"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5 }}
      className="mx-auto max-w-xl scroll-mt-24 px-6 py-20"
    >
      <div className="text-center">
        <h2 className="text-2xl font-medium tracking-tight text-white sm:text-3xl">
          Get in touch
        </h2>
        <p className="mt-3 text-sm leading-7 text-zinc-500">
          Questions, feedback, or just want to say hi? Send a message and
          I&apos;ll get back to you.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-8 space-y-4 rounded-xl border border-zinc-900 bg-zinc-950/40 p-6"
      >
        <input type="hidden" name="_subject" value="Hippo contact form" />
        <input type="hidden" name="_captcha" value="false" />
        <input type="text" name="_honey" className="hidden" tabIndex={-1} autoComplete="off" />

        <div>
          <label htmlFor="contact-name" className="mb-1.5 block text-sm text-zinc-400">
            Name
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            required
            className="w-full rounded-lg border border-zinc-800 bg-zinc-900/60 px-3 py-2.5 text-sm text-zinc-200 outline-none transition-colors placeholder:text-zinc-600 focus:border-violet-500/50"
            placeholder="Your name"
          />
        </div>

        <div>
          <label htmlFor="contact-email" className="mb-1.5 block text-sm text-zinc-400">
            Email
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            className="w-full rounded-lg border border-zinc-800 bg-zinc-900/60 px-3 py-2.5 text-sm text-zinc-200 outline-none transition-colors placeholder:text-zinc-600 focus:border-violet-500/50"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label htmlFor="contact-message" className="mb-1.5 block text-sm text-zinc-400">
            Message
          </label>
          <textarea
            id="contact-message"
            name="message"
            required
            rows={4}
            className="w-full resize-none rounded-lg border border-zinc-800 bg-zinc-900/60 px-3 py-2.5 text-sm text-zinc-200 outline-none transition-colors placeholder:text-zinc-600 focus:border-violet-500/50"
            placeholder="What's on your mind?"
          />
        </div>

        <Button
          type="submit"
          disabled={status === "submitting"}
          className="w-full"
        >
          {status === "submitting" ? "Sending..." : "Send message"}
        </Button>

        {status === "success" && (
          <p className="text-center text-sm text-emerald-400">
            Message sent!
          </p>
        )}
        {status === "error" && (
          <p className="text-center text-sm text-red-400">
            Something went wrong. Email me directly at{" "}
            <a href={`mailto:${SITE.email}`} className="underline hover:text-red-300">
              {SITE.email}
            </a>
            .
          </p>
        )}
      </form>
    </motion.section>
  );
}
