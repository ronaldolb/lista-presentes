import styled, { css } from 'styled-components';

const Lista = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
`;

const Botao = styled.button`
  padding: 0.4rem 1rem;
  border-radius: 999px;
  border: 1px solid ${({ theme }) => theme.cores.primaria};
  background: transparent;
  color: ${({ theme }) => theme.cores.primaria};
  cursor: pointer;
  transition: background 0.2s, color 0.2s;

  &:hover {
    background: #f6e9ea;
  }

  ${({ $ativo, theme }) =>
    $ativo &&
    css`
      background: ${theme.cores.primaria};
      color: #fff;

      &:hover {
        background: ${theme.cores.primariaEscura};
      }
    `}
`;

export default function FiltroCategorias({ categorias, ativa, onChange }) {
  return (
    <Lista role="group" aria-label="Filtrar por categoria">
      {categorias.map((categoria) => (
        <Botao
          key={categoria}
          type="button"
          $ativo={categoria === ativa}
          aria-pressed={categoria === ativa}
          onClick={() => onChange(categoria)}
        >
          {categoria}
        </Botao>
      ))}
    </Lista>
  );
}
