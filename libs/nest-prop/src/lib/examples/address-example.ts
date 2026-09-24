import { faker } from '@faker-js/faker';

export function addresssExample() {
  return {
    unit: faker.location.buildingNumber(),
    street: faker.location.street(),
    city: faker.location.city(),
    state: faker.location.state(),
    continent: faker.location.continent(),
    country: faker.location.country(),
    zipCode: faker.location.zipCode(),
    countryCode: faker.location.countryCode(),
    latitude: faker.location.latitude(),
    longitude: faker.location.longitude(),
  };
}
