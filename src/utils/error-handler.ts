import mitt from 'mitt';

export type ErrorDialogPayload = { title: string; message: string };

export const errorDialogEmitter = mitt<{ show: ErrorDialogPayload }>();

export function showError(title: string, message: string) {
  errorDialogEmitter.emit('show', { title, message });
} 