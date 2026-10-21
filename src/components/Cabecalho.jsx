import styled from 'styled-components';

const Header = styled.header`
  text-align: center;
  padding: 3rem 1rem 2rem;
  background: linear-gradient(180deg, #f3e6e1 0%, ${({ theme }) => theme.cores.fundo} 100%);
`;

const Titulo = styled.h1`
  font-size: 2rem;
  color: ${({ theme }) => theme.cores.primariaEscura};

  @media (min-width: ${({ theme }) => theme.bp.tablet}) {
    font-size: 2.75rem;
  }
`;

const Subtitulo = styled.p`
  margin-top: 0.5rem;
  color: ${({ theme }) => theme.cores.textoSuave};
`;

export default function Cabecalho({ noivos, data }) {
  return (
    <Header>
      <Titulo>{noivos}</Titulo>
      <Subtitulo>Lista de presentes · {data}</Subtitulo>
    </Header>
  );
}
