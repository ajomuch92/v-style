export function stringToHash(serializedString: string): string {
  let hash = 2166136261; // offset basis for FNV-1a
  for (let i = 0; i < serializedString.length; i++) {
    hash ^= serializedString.charCodeAt(i);
    hash += (hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24);
  }
  return hash.toString(36);
}

export function toKebabCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
}

export function sortObjectKeys(obj: Record<string, any>): Record<string, any> {
  const sortedKeys = Object.keys(obj).sort();
  const sortedObj = {};

  sortedKeys.forEach(key => {
    sortedObj[key] = obj[key];
  });

  return sortedObj;
}