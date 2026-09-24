import { faker } from '@faker-js/faker';
import { v4, v7 } from 'uuid';

export function productExample() {
  const price = faker.number.int({ min: 100, max: 20000 });
  const cost = faker.number.int({ min: 1, max: price - 1 });

  return {
    uuid: v4(),
    uuid7: v7(),
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    material: faker.commerce.productMaterial(),
    color: faker.color.human(),
    upc: faker.commerce.upc(),
    department: faker.commerce.department(),
    adjective: faker.commerce.productAdjective(),
    barcode: faker.commerce.isbn(13),
    ean: faker.commerce.isbn(13),
    price,
    cost,
  };
}
