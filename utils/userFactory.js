const { faker } = require('@faker-js/faker');

function buildUser(overrides = {}) {
  const defaultUser = {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    postalCode: faker.location.zipCode(),
  };

  return {
    ...defaultUser,
    ...overrides,
  };
}

module.exports = { buildUser };
