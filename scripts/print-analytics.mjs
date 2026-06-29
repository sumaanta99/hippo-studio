#!/usr/bin/env node

const apiUrl = (process.env.HIPPO_API_URL ?? "http://127.0.0.1:8000").replace(/\/$/, "");
const adminKey = process.env.ANALYTICS_ADMIN_KEY;

if (!adminKey) {
  console.error("\nSet ANALYTICS_ADMIN_KEY to read private usage metrics.\n");
  process.exit(1);
}

const response = await fetch(`${apiUrl}/admin/analytics`, {
  headers: { Authorization: `Bearer ${adminKey}` },
});

if (!response.ok) {
  console.error(`\nFailed to fetch analytics (${response.status}): ${await response.text()}\n`);
  process.exit(1);
}

const report = await response.json();
const { summary, sessions, updated_at: updatedAt } = report;

console.log("\nHippo — private usage report\n");
console.log(`API: ${apiUrl}`);
console.log(`Updated: ${updatedAt}\n`);
console.log(`Unique users:          ${summary.uniqueUsers}`);
console.log(`Total messages:        ${summary.totalMessages}`);
console.log(`Total errors:          ${summary.totalErrors}`);
console.log(`Avg latency (ms):      ${summary.avgLatencyMs}`);
console.log(`Memories created:      ${summary.totalMemoriesCreated}`);

console.log("\nIntent breakdown:");
for (const [intent, count] of Object.entries(summary.intentBreakdown ?? {})) {
  console.log(`  ${intent.padEnd(16)} ${count}`);
}

const sessionEntries = Object.entries(sessions ?? {});
if (sessionEntries.length > 0) {
  console.log("\nPer session:");
  for (const [id, session] of sessionEntries) {
    console.log(
      `  ${id} — ${session.message_count} msgs, ${session.error_count} errors, last seen ${session.last_seen}`,
    );
  }
}

console.log("");
