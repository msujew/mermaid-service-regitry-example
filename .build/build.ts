import { build } from 'esbuild';

import { generateLangium } from './generateLangium.js';

const main = async () => {
  await generateLangium();
  // mermaid-parser
  await build({
    entryPoints: ['./packages/mermaid-parser/src/index.ts'],
    minify: true,
    bundle: true,
    format: 'esm',
    loader: { '.ts': 'ts' },
    outdir: './packages/mermaid-parser/dist',
  });
  // await build({
  //   entryPoints: ['./syntaxes/mermaid.monarch.ts'],
  //   minify: true,
  //   bundle: true,
  //   loader: { '.ts': 'ts' },
  //   outdir: './dist/syntaxes',
  //   tsconfig: './tsconfig.monarch.json',
  // });

  // mermaid-lsp vscode (node)
  // await build({
  //   entryPoints: [
  //     './packages/mermaid-lsp/src/node/extension.ts',
  //     './packages/mermaid-lsp/src/node/language-server.ts',
  //   ],
  //   minify: true,
  //   bundle: true,
  //   loader: { '.ts': 'ts' },
  //   external: ['vscode'],
  //   platform: 'node',
  //   outdir: './packages/mermaid-lsp/dist/node',
  // });
  // mermaid-lsp browser (browser)
  await build({
    entryPoints: [
      './packages/mermaid-lsp/src/browser/extension.ts',
      './packages/mermaid-lsp/src/browser/language-server.ts',
    ],
    minify: true,
    bundle: true,
    loader: { '.ts': 'ts' },
    external: ['vscode'],
    platform: 'browser',
    outdir: './packages/mermaid-lsp/dist/browser',
  });
};

void main();
