export function validarEmail(email: string): boolean {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}
