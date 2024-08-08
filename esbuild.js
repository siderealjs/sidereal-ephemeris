import esbuild from "esbuild";

esbuild
  .build({
    entryPoints: ["src/index.ts"],
    bundle: true,
    outfile: "dist/index.js",
    sourcemap: true,
    minify: true,
    platform: "node",
    target: ["esnext"],
    format: "esm", // Assicurati di usare il formato corretto
  })
  .catch(() => process.exit(1));
