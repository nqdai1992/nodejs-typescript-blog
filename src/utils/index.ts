interface IURLPath {
  join(name: string): IURLPath;
  toString(): string;
}

export const URLPath = (name: string): IURLPath => ({
  join: (subname: string) => URLPath(`${name}/${subname}`),
  toString: () => `/${name}`,
});
