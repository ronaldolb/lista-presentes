import { formatarPreco } from '../utils/formatarPreco';

describe('formatarPreco', () => {
  it('formata valores em reais no padrão brasileiro', () => {
    // O Intl usa espaço não separável depois do "R$", por isso o \s.
    expect(formatarPreco(489.9)).toMatch(/^R\$\s489,90$/);
  });

  it('usa ponto como separador de milhar', () => {
    expect(formatarPreco(1250)).toMatch(/^R\$\s1\.250,00$/);
  });
});
