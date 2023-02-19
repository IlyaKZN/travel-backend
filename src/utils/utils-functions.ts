import { hashSync } from 'bcryptjs';

const hashPassword = (password: string) => {
  const hashPassword = hashSync(password, 10);
  return hashPassword;
};

export { hashPassword };
