/**
 * Print prop decorator such as "@prop({ isRequried:true })"
 *
 * @param options
 * @returns
 */
export function propDecorator(options: string) {
  return `@Prop(${options})`;
}
