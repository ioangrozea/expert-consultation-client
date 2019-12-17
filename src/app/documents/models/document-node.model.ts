import { DocumentNodeType } from '@app/documents/types/enums';

export interface IDocumentNode {
  id: string;
  title: string;
  content: string;
  numberOfComments: number;
  documentNodeType: DocumentNodeType;
  children: IDocumentNode[];
}

export class DocumentNode {
  id: string;
  title: string;
  content: string;
  numberOfComments: number;
  documentNodeType: DocumentNodeType;
  children: DocumentNode[];

  constructor(data: IDocumentNode) {
    this.fromJson(data);
  }

  fromJson(json: IDocumentNode) {
    this.id = json.id;
    this.title = json.title;
    this.content = json.content;
    this.documentNodeType = json.documentNodeType;
    this.numberOfComments = json.numberOfComments;
    this.children = json.children.map(value => new DocumentNode(value));
  }

  toJson(): IDocumentNode {
    return {
      id: this.id,
      title: this.title,
      content: this.content,
      documentNodeType: this.documentNodeType,
      numberOfComments: this.numberOfComments,
      children: this.children.map(value => value.toJson())
    };
  }
}
