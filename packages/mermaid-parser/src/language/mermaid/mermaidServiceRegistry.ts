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
  private documents: LangiumDocuments;

  constructor(services: LangiumSharedServices) {
    super();
    this.documents = services.workspace.LangiumDocuments;
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
    const content: LangiumDocument<AstNode> = this.documents.getOrCreateDocument(uri);
    const text: string = content.textDocument.getText();
    if (/^\s*info/.test(text)) {
      return this.infoServices;
    } else {
      return super.getServices(uri);
    }
  }
}
