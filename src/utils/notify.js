import { notify } from 'notiwind';

export const notifySuccess = (title, text) =>
  notify(
    {
      group: 'generic',
      title,
      text,
      type: 'success',
    },
    4000,
  );
export const notifyError = (title, text) =>
  notify(
    {
      group: 'generic',
      title,
      text,
      type: 'error',
    },
    4000,
  );
