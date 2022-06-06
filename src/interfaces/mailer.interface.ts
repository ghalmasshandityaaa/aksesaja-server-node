export class SetLogEmailInterface {
  description!: string;
  sendTo!: string;
}

export class MailOptionsInterface {
  from?: string;
  to!: string;
  cc?: string | string[];
  bcc?: string | string[];
  subject!: string;
  template!: string;
  context!: {};
  attachments?: Attachment[];
  description?: string;
}

interface Attachment {
  filename: string;
  content?: any;
  path?: string;
  contentType?: string;
  cid?: string;
}
