import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CartaoPresente from '../components/CartaoPresente';
import { renderComTema } from '../../test/renderComTema';

const presente = {
  id: 7,
  nome: 'Cafeteira espresso',
  categoria: 'Cozinha',
  preco: 899,
  emoji: '☕',
};

describe('<CartaoPresente />', () => {
  it('mostra nome, categoria e preço formatado', () => {
    renderComTema(
      <CartaoPresente presente={presente} presenteado={false} onPresentear={() => {}} />,
    );

    expect(screen.getByRole('heading', { name: 'Cafeteira espresso' })).toBeInTheDocument();
    expect(screen.getByText('Cozinha')).toBeInTheDocument();
    expect(screen.getByText(/899,00/)).toBeInTheDocument();
  });

  it('chama onPresentear com o id ao clicar', async () => {
    const usuario = userEvent.setup();
    const onPresentear = jest.fn();

    renderComTema(
      <CartaoPresente presente={presente} presenteado={false} onPresentear={onPresentear} />,
    );
    await usuario.click(screen.getByRole('button', { name: 'Presentear' }));

    expect(onPresentear).toHaveBeenCalledTimes(1);
    expect(onPresentear).toHaveBeenCalledWith(7);
  });

  it('desabilita o botão quando já foi presenteado', () => {
    renderComTema(
      <CartaoPresente presente={presente} presenteado onPresentear={() => {}} />,
    );

    expect(screen.getByRole('button', { name: /presenteado/i })).toBeDisabled();
  });
});
