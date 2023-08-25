import { generate } from 'langium-cli';

export async function generateLangium() {
  await generate({ file: `./packages/mermaid-parser/langium-config.json` });
}
