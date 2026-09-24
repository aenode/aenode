import { faker } from '@faker-js/faker';

export function userExample() {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const fullName = [firstName, lastName].join(' ');
  const middleName = faker.person.middleName();
  const email = faker.internet.email({ firstName, lastName });
  const password = faker.internet.password({
    length: 6,
    memorable: true,
    prefix: '!aA1_',
  });

  const bio = faker.person.bio();
  const title = faker.person.jobTitle();
  const description = faker.person.jobDescriptor();
  const avatar = 'avatar.svg';
  return {
    firstName,
    lastName,
    middleName,
    email,
    username: email,
    password,
    fullName,
    bio,
    title,
    role: title,
    description,
    avatar: avatar,
    imgage: avatar,
    img: avatar,
  };
}
