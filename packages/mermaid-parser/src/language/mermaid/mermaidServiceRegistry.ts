import type {
  AstNode,
  LangiumDocument,
  LangiumDocuments,
  LangiumServices,
  LangiumSharedServices,
  URI,
} from 'langium';
import { DefaultServiceRegistry } from 'langium';

import { InfoServices } from '../index.js';

export class MermaidServiceRegistry extends DefaultServiceRegistry {
  private infoServices!: InfoServices;
  private documents: () => LangiumDocuments;

  constructor(services: LangiumSharedServices) {
    super();
    this.documents = () => services.workspace.LangiumDocuments;
  }

  public override register(language: LangiumServices): void {
    switch (language.LanguageMetaData.languageId) {
      case 'info':
        this.infoServices = language as InfoServices;
        break;
      default:
        super.register(language);
        break;
    }
  }

  public override getServices(uri: URI): LangiumServices {
    let type: string | undefined;
    if (uri.fragment) {
        type = uri.fragment;
    } else {
        const content = this.documents().all.find(e => e.uri.toString() === uri.toString());
        if (!content) {
            throw new Error('Could not find URI: ' + uri.toString());
        }
        const text: string = content.textDocument.getText();
        type = identifyFile(text);
    }
    if (type === 'info') {
      return this.infoServices;
    } else {
      return super.getServices(uri);
    }
  }
}

export function identifyFile(text: string): string | undefined {
    if (/^\s*info/.test(text)) {
        return 'info';
    } else {
        return undefined;
    }
}