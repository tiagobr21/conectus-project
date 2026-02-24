
import { faker } from "@faker-js/faker";

export function generateUsers(quantity = 10) {
    
    const password = faker.internet.password({ length: 6 });

  return Array.from({ length: quantity }).map((_, index) => ({
    id: index + 1,
    name: faker.person.fullName(),
    email: faker.internet.email(),
    matricula: faker.number.int({ min: 1000, max: 9999 }).toString(),
    password: password,
    confirmPassword: password,
  }));
}