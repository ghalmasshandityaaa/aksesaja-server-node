export const apiMessage = (name: string, event: string) => `${name} successfully ${event.toLowerCase()}`;

export type ApiResponse = {
  status: 'created' | 'modified' | 'deleted';
  message?: string;
  data?: any;
};
