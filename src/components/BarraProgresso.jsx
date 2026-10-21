import styled from 'styled-components';

const Wrapper = styled.div`
  max-width: 480px;
  margin: 0 auto 2rem;
  padding: 0 1rem;
`;

const Trilho = styled.div`
  height: 10px;
  border-radius: 999px;
  background: ${({ theme }) => theme.cores.borda};
  overflow: hidden;
`;

// Prop transitória ($percentual) não vai para o DOM.
const Preenchimento = styled.div`
  height: 100%;
  width: ${({ $percentual }) => $percentual}%;
  background: ${({ theme }) => theme.cores.sucesso};
  transition: width 0.4s ease;
`;

const Legenda = styled.p`
  margin-top: 0.5rem;
  font-size: 0.9rem;
  text-align: center;
  color: ${({ theme }) => theme.cores.textoSuave};
`;

export default function BarraProgresso({ total, presenteados }) {
  const percentual = total === 0 ? 0 : Math.round((presenteados / total) * 100);

  return (
    <Wrapper>
      <Trilho
        role="progressbar"
        aria-label="Presentes já escolhidos"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percentual}
      >
        <Preenchimento $percentual={percentual} />
      </Trilho>
      <Legenda>
        {presenteados} de {total} presentes escolhidos ({percentual}%)
      </Legenda>
    </Wrapper>
  );
}
