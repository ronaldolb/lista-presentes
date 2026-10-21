import { filtrarPresentes } from '../utils/filtrarPresentes';

const lista = [
  { id: 1, nome: 'Cafeteira', categoria: 'Cozinha' },
  { id: 2, nome: 'Jogo de panelas', categoria: 'Cozinha' },
  { id: 3, nome: 'Jogo de cama', categoria: 'Quarto' },
];

describe('filtrarPresentes', () => {
  it('retorna tudo quando não há filtro', () => {
    expect(filtrarPresentes(lista)).toHaveLength(3);
  });

  it('filtra por categoria', () => {
    const resultado = filtrarPresentes(lista, { categoria: 'Quarto' });
    expect(resultado.map((p) => p.id)).toEqual([3]);
  });

  it('busca pelo nome sem diferenciar maiúsculas', () => {
    const resultado = filtrarPresentes(lista, { busca: '  JOGO ' });
    expect(resultado.map((p) => p.id)).toEqual([2, 3]);
  });

  it('combina categoria e busca', () => {
    const resultado = filtrarPresentes(lista, { categoria: 'Cozinha', busca: 'jogo' });
    expect(resultado.map((p) => p.id)).toEqual([2]);
  });
});
