import { pickDefinedValue } from '@aenode/is';
import type { PropOptions } from '@aenode/prop-options';

export function hasAnnotation(documentation: string, annotationName: string) {
  if (documentation.match(new RegExp(`@${annotationName}`, 'i'))) {
    return 'true';
  }
  return undefined;
}

export function getAnnotationValue(
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
  annotaitonName: string,
) {
  const result = getAnnotationValue(documentation, annotaitonName);

  if (result) {
    return `'${result}'`;
  }

  return undefined;
}

export type StringPropOptionsRecord = Partial<
  Record<keyof PropOptions, string | undefined>
>;

export function extractAnnotations(
  documentation: string,
): StringPropOptionsRecord {
  const annotations: StringPropOptionsRecord = {
    isRequired: hasAnnotation(documentation, 'required'),
    isInternal: hasAnnotation(documentation, 'internal'),
    isReadOnly: hasAnnotation(documentation, 'readonly'),
    isWriteOnly: hasAnnotation(documentation, 'writeonly'),
    isEncriped: hasAnnotation(documentation, 'encript'),
    isHashed: hasAnnotation(documentation, 'hash'),

    isIncluded: hasAnnotation(documentation, 'include'),
    isSelected: hasAnnotation(documentation, 'select'),

    minLength: getAnnotationValue(documentation, 'minLength'),
    maxLength: getAnnotationValue(documentation, 'maxLength'),
    min: getAnnotationValue(documentation, 'min'),
    max: getAnnotationValue(documentation, 'max'),
    maxItems: getAnnotationValue(documentation, 'maxitems'),
    minItems: getAnnotationValue(documentation, 'minitems'),
    pattern: getAnnotationStringValue(documentation, 'pattern'),
    format: getAnnotationStringValue(documentation, 'format'),
  };

  return pickDefinedValue(annotations);
}
