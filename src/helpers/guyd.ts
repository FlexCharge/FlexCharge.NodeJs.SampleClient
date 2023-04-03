export function generateGUID(): string {
  let guid = '';
  const hexChars = '0123456789abcdef';

  for (let i = 0; i < 32; i++) {
    const randomIndex: number = Math.floor(Math.random() * hexChars.length);
    guid += hexChars[randomIndex];
  }

  guid =
    guid.slice(0, 8) +
    '-' +
    guid.slice(8, 12) +
    '-' +
    guid.slice(12, 16) +
    '-' +
    guid.slice(16, 20) +
    '-' +
    guid.slice(20);

  return guid;
}
