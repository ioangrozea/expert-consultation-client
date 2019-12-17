import {
  DocumentMetadata,
  IDocumentMetadata
} from '@app/documents/models/document-metadata.model';
import {
  DocumentNode,
  IDocumentNode
} from '@app/documents/models/document-node.model';

export interface IDocumentConsolidate {
  id: string;
  documentMetadata: IDocumentMetadata;
  documentNode?: IDocumentNode;
}

export class DocumentConsolidate {
  id: string;
  documentMetadata: DocumentMetadata;
  documentNode?: DocumentNode;

  constructor(data: IDocumentConsolidate) {
    this.fromJson(data);
  }

  fromJson(data: IDocumentConsolidate) {
    this.id = data.id;
    this.documentMetadata = new DocumentMetadata(data.documentMetadata);
    this.documentNode = new DocumentNode(data.documentNode);
  }

  toJson(): IDocumentConsolidate {
    return {
      id: this.id,
      documentMetadata: this.documentMetadata.toJson(),
      documentNode: this.documentNode.toJson()
    };
  }
}
