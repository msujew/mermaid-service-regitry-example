import { ExtensionContext, Uri } from 'vscode';
import { LanguageClient, LanguageClientOptions } from 'vscode-languageclient/browser.js';

let client: LanguageClient;

// This function is called when the extension is activated.
export function activate(context: ExtensionContext): void {
  client = startLanguageClient(context);
}

// This function is called when the extension is deactivated.
export function deactivate(): Thenable<void> | undefined {
  if (client) {
    return client.stop();
  }
  return undefined;
}

function startLanguageClient(context: ExtensionContext): LanguageClient {
  const serverMain = Uri.joinPath(context.extensionUri, 'dist/browser/language-server.js');

  const worker = new Worker(serverMain.toString());

  // Options to control the language client
  const clientOptions: LanguageClientOptions = {
    documentSelector: [{ scheme: '*', language: 'mermaid' }],
  };

  // Create the language client and start the client.
  const client = new LanguageClient('mermaid', 'Mermaid', clientOptions, worker);

  // Start the client. This will also launch the server
  client.start();
  return client;
}
