import { startLanguageServer, EmptyFileSystem } from 'langium';
import {
  createConnection,
  BrowserMessageReader,
  BrowserMessageWriter,
} from 'vscode-languageserver/browser.js';
import { createMermaidServices } from 'mermaid-parser';

declare const self: DedicatedWorkerGlobalScope;

/* browser specific setup code */
const messageReader = new BrowserMessageReader(self);
const messageWriter = new BrowserMessageWriter(self);

const connection = createConnection(messageReader, messageWriter) as any;

// Inject the shared services and language-specific services
const { shared } = createMermaidServices({ connection, ...EmptyFileSystem });

// Start the language server with the shared services
startLanguageServer(shared);
