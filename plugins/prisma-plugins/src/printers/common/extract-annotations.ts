import { pickDefinedValue } from '@aenode/is';
import type { PropOptions } from '@aenode/prop-options';

export function hasAnnotation(documentation: string, annotationName: string) {
  if (documentation.match(new RegExp(`@${annotationName}`, 'i'))) {
    return 'true';
  }
  return undefined;
}

export function getAnnotationNumberValue(
  documentation: string,
  annotationName: string,
): string | undefined {
  const matches = documentation.match(
    new RegExp(`@${annotationName}\\((\\d+)\\)`, 'i'),
  );

  if (matches && matches[1]) {
    return matches[1];
  }
  return undefined;
}

export function getAnnotationStringValue(
  documentation: string,
  annotationName: string,
): string | undefined {
  const matches = documentation.match(
    new RegExp(`@${annotationName}\\((\\w+)\\)`, 'i'),
  );

  if (matches && matches[1]) {
    return `'${matches[1]}'`;
  }
  return undefined;
}

export function getAnnotationArrayStringValue(
  documentation: string,
  annotationName: string,
): string | undefined {
  const matches = documentation.match(
    new RegExp(`@${annotationName}\\((\\w+)\\)`, 'i'),
  );

  if (matches && matches[1]) {
    const preresult = `${matches[1]
      .split(',')
      .map((e) => `'${e}'`)
      .join(', ')}`;

    return `[ ${preresult} ]`;
  }
  return undefined;
}

export type StringPropOptionsRecord = Partial<
  Record<keyof PropOptions, string | undefined>
>;

export function extractAnnotations(
  documentation?: string,
): StringPropOptionsRecord | undefined {
  if (!documentation) {
    return undefined;
  }

  const annotations: StringPropOptionsRecord = {
    isRequired: hasAnnotation(documentation, 'required'),
    isInternal: hasAnnotation(documentation, 'internal'),
    isReadOnly: hasAnnotation(documentation, 'readonly'),
    isWriteOnly: hasAnnotation(documentation, 'writeonly'),
    isEncriped: hasAnnotation(documentation, 'encript'),
    isHashed: hasAnnotation(documentation, 'hash'),
    excluded: hasAnnotation(documentation, 'excluded'),

    isIncluded: hasAnnotation(documentation, 'include'),
    isSelected: hasAnnotation(documentation, 'select'),

    minLength: getAnnotationNumberValue(documentation, 'minLength'),
    maxLength: getAnnotationNumberValue(documentation, 'maxLength'),
    min: getAnnotationNumberValue(documentation, 'min'),
    max: getAnnotationNumberValue(documentation, 'max'),
    maxItems: getAnnotationNumberValue(documentation, 'maxitems'),
    minItems: getAnnotationNumberValue(documentation, 'minitems'),
    pattern: getAnnotationStringValue(documentation, 'pattern'),
    format: getAnnotationStringValue(documentation, 'format'),
    isIn: getAnnotationArrayStringValue(documentation, 'isIn'),
    isNotIn: getAnnotationArrayStringValue(documentation, 'isNotIn'),
  };

  return pickDefinedValue(annotations);
}
