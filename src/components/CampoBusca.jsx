import styled from 'styled-components';

const Label = styled.label`
  display: block;
  max-width: 420px;
  margin: 0 auto 1rem;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.cores.textoSuave};
`;

const Input = styled.input`
  display: block;
  width: 100%;
  margin-top: 0.25rem;
  padding: 0.6rem 0.9rem;
  border: 1px solid ${({ theme }) => theme.cores.borda};
  border-radius: ${({ theme }) => theme.raio};
  background: #fff;
`;

export default function CampoBusca({ valor, onChange }) {
  return (
    <Label>
      Buscar presente
      <Input
        type="search"
        placeholder="Ex.: cafeteira"
        value={valor}
        onChange={(e) => onChange(e.target.value)}
      />
    </Label>
  );
}
