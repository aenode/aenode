export type Names = {
  camel: string;
  pascal: string;
  kebab: string;
  snake: string;
  constant: string;
  title: string;
  sentence: string;
};

export function names(name: string): Names {
  return {
    camel: name,
    constant: name,
    pascal: name,
    kebab: name,
    sentence: name,
    snake: name,
    title: name,
  };
}
