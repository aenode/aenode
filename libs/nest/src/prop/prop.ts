export function Prop(): PropertyDecorator {
  return (...args) => {
    console.log(...args);
  };
}
