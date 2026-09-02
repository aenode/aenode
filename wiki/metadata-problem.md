## Metadata problem

Factory types do not work correctly with circular forward-reference types. As a result, the consumer must explicitly provide all type information manually.

Additionally, the decorator provider **must not emit decorator metadata** for these types. The builder currently attempts to resolve and validate the type itself rather than treating the factory function as the source of the type information and passing it through unchanged.
