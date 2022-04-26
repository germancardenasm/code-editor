export const escapedCss = (text: string) =>
  text.replace(/\n/g, '').replace(/"/g, '\\"').replace(/'/g, "\\'");
