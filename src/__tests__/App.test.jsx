import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderComTema } from '../../test/renderComTema';

const presentes = [
  { id: 1, nome: 'Cafeteira', categoria: 'Cozinha', preco: 100, emoji: '☕' },
  { id: 2, nome: 'Jogo de panelas', categoria: 'Cozinha', preco: 200, emoji: '🍳' },
  { id: 3, nome: 'Jogo de cama', categoria: 'Quarto', preco: 300, emoji: '🛏️' },
];

function cartoes() {
  return within(screen.getByRole('region', { name: 'Presentes' })).getAllByRole('article');
}

describe('<App />', () => {
  it('lista todos os presentes ao abrir', () => {
    renderComTema(<App presentes={presentes} />);
    expect(cartoes()).toHaveLength(3);
  });

  it('filtra pela categoria escolhida', async () => {
    const usuario = userEvent.setup();
    renderComTema(<App presentes={presentes} />);

    await usuario.click(screen.getByRole('button', { name: 'Quarto' }));

    expect(cartoes()).toHaveLength(1);
    expect(screen.getByRole('button', { name: 'Quarto' })).toHaveAttribute('aria-pressed', 'true');
  });

  it('filtra pelo texto digitado na busca', async () => {
    const usuario = userEvent.setup();
    renderComTema(<App presentes={presentes} />);

    await usuario.type(screen.getByLabelText(/buscar presente/i), 'jogo');

    expect(cartoes()).toHaveLength(2);
  });

  it('mostra mensagem quando nada é encontrado', async () => {
    const usuario = userEvent.setup();
    renderComTema(<App presentes={presentes} />);

    await usuario.type(screen.getByLabelText(/buscar presente/i), 'geladeira');

    expect(screen.getByText('Nenhum presente encontrado.')).toBeInTheDocument();
  });

  it('atualiza o progresso ao presentear', async () => {
    const usuario = userEvent.setup();
    renderComTema(<App presentes={presentes} />);

    const barra = screen.getByRole('progressbar');
    expect(barra).toHaveAttribute('aria-valuenow', '0');

    await usuario.click(screen.getAllByRole('button', { name: 'Presentear' })[0]);

    expect(barra).toHaveAttribute('aria-valuenow', '33');
    expect(screen.getByText(/1 de 3 presentes escolhidos/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /presenteado/i })).toBeDisabled();
  });
});
