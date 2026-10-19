import { spawnSync } from "node:child_process";

const url = process.env.VIRGILIO_DB_URL;
const limit = Number(process.env.VIRGILIO_GATE_SECONDS ?? 600) * 1000;
const pause = (ms) => Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
if (!url) {
  console.error("virgilio: falta a variável VIRGILIO_DB_URL no Railway. Rode virgilio init. O código anterior continua no ar.");
  process.exit(1);
}
const deadline = Date.now() + limit;
for (;;) {
  const run = spawnSync("npx", ["--yes", "supabase@2.121.0", "db", "push", "--db-url", url, "--dry-run"], { encoding: "utf8" });
  const output = `${run.stdout ?? ""}${run.stderr ?? ""}`;
  if (run.status === 0 && /up to date/i.test(output)) {
    console.log("virgilio: banco de produção em dia; o deploy segue.");
    process.exit(0);
  }
  console.log(run.status === 0 ? "virgilio: ainda falta aplicar migração em produção; esperando o workflow do GitHub." : `virgilio: não consegui conferir o banco de produção: ${output.trim().split("\n").filter(Boolean).pop() ?? ""}`);
  if (Date.now() > deadline) {
    console.error("virgilio: o banco de produção não recebeu a migração a tempo. O código anterior continua no ar. Depois que o workflow de produção terminar, rode virgilio deploy.");
    process.exit(1);
  }
  pause(20000);
}
