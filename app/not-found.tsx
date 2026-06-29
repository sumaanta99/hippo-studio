import Link from "next/link";

import { Button } from "@/components/Button";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <p className="text-sm uppercase tracking-[0.18em] text-zinc-600">404</p>
      <h1 className="mt-3 text-2xl font-medium text-white">Page not found</h1>
      <p className="mt-3 max-w-md text-sm leading-7 text-zinc-400">
        This route doesn&apos;t exist. Head back to the terminal.
      </p>
      <Link href="/" className="mt-8">
        <Button>Back to Hippo</Button>
      </Link>
    </main>
  );
}
