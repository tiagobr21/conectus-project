import { generateUsers } from "../utils/generateUsers";
import { describe, it, expect } from 'vitest';

describe('generateUsers', () => {
  it('deve criar a quantidade correta de usuários', () => {
    const users = generateUsers(5);
    expect(users).toHaveLength(5);
  });

  it('cada usuário deve ter os campos obrigatórios', () => {
    const users = generateUsers(1);
    const user = users[0];

    expect(user).toHaveProperty('id');
    expect(user).toHaveProperty('name');
    expect(user).toHaveProperty('email');
    expect(user).toHaveProperty('password');
    expect(user).toHaveProperty('confirmPassword');
  });

  it('password e confirmPassword devem ser iguais', () => {
    const users = generateUsers(3);

    users.forEach(user => {
      expect(user.password).toBe(user.confirmPassword);
    });
  });

  it('emails devem ser válidos (contém @)', () => {
    const users = generateUsers(3);

    users.forEach(user => {
      expect(user.email).toContain('@');
    });
  });
});