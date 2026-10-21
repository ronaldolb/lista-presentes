import styled from 'styled-components';
import CartaoPresente from './CartaoPresente';

// Grid responsivo: 1 coluna no celular, 2 no tablet, 4 no desktop.
const Grade = styled.section`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.25rem;

  @media (min-width: ${({ theme }) => theme.bp.tablet}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: ${({ theme }) => theme.bp.desktop}) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const Vazio = styled.p`
  padding: 2rem;
  text-align: center;
  color: ${({ theme }) => theme.cores.textoSuave};
`;

export default function GradePresentes({ presentes, presenteados, onPresentear }) {
  if (presentes.length === 0) {
    return <Vazio>Nenhum presente encontrado.</Vazio>;
  }

  return (
    <Grade aria-label="Presentes">
      {presentes.map((presente) => (
        <CartaoPresente
          key={presente.id}
          presente={presente}
          presenteado={presenteados.has(presente.id)}
          onPresentear={onPresentear}
        />
      ))}
    </Grade>
  );
}
