import styled from 'styled-components';
import { formatarPreco } from '../utils/formatarPreco';

const Cartao = styled.article`
  display: flex;
  flex-direction: column;
  padding: 1.25rem;
  border-radius: ${({ theme }) => theme.raio};
  background: ${({ theme }) => theme.cores.cartao};
  box-shadow: ${({ theme }) => theme.sombra};
  opacity: ${({ $presenteado }) => ($presenteado ? 0.6 : 1)};
  transition: transform 0.2s, opacity 0.2s;

  &:hover {
    transform: translateY(-2px);
  }
`;

const Icone = styled.div`
  display: grid;
  place-items: center;
  height: 110px;
  margin-bottom: 1rem;
  border-radius: calc(${({ theme }) => theme.raio} - 4px);
  background: #f6efeb;
  font-size: 3rem;
`;

const Categoria = styled.span`
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: ${({ theme }) => theme.cores.textoSuave};
`;

const Nome = styled.h3`
  margin: 0.25rem 0 0.5rem;
  font-size: 1.15rem;
`;

const Preco = styled.p`
  margin-bottom: 1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.cores.primariaEscura};
`;

const Botao = styled.button`
  margin-top: auto;
  padding: 0.7rem;
  border: none;
  border-radius: ${({ theme }) => theme.raio};
  background: ${({ theme }) => theme.cores.primaria};
  color: #fff;
  cursor: pointer;
  transition: background 0.2s;

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.cores.primariaEscura};
  }

  &:disabled {
    background: ${({ theme }) => theme.cores.sucesso};
    cursor: default;
  }
`;

export default function CartaoPresente({ presente, presenteado, onPresentear }) {
  return (
    <Cartao $presenteado={presenteado} aria-label={presente.nome}>
      <Icone aria-hidden="true">{presente.emoji}</Icone>
      <Categoria>{presente.categoria}</Categoria>
      <Nome>{presente.nome}</Nome>
      <Preco>{formatarPreco(presente.preco)}</Preco>
      <Botao
        type="button"
        disabled={presenteado}
        onClick={() => onPresentear(presente.id)}
      >
        {presenteado ? 'Presenteado ✓' : 'Presentear'}
      </Botao>
    </Cartao>
  );
}
