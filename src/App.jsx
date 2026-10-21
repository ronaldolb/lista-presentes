import { useMemo, useState } from 'react';
import styled from 'styled-components';
import Cabecalho from './components/Cabecalho';
import BarraProgresso from './components/BarraProgresso';
import CampoBusca from './components/CampoBusca';
import FiltroCategorias from './components/FiltroCategorias';
import GradePresentes from './components/GradePresentes';
import { presentes as listaInicial } from './data/presentes';
import { filtrarPresentes } from './utils/filtrarPresentes';

const Main = styled.main`
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 1rem 3rem;
`;

const Filtros = styled.div`
  margin-bottom: 2rem;
`;

export default function App({ presentes = listaInicial }) {
  const [categoria, setCategoria] = useState('Todos');
  const [busca, setBusca] = useState('');
  const [presenteados, setPresenteados] = useState(() => new Set());

  const categorias = useMemo(
    () => ['Todos', ...new Set(presentes.map((p) => p.categoria))],
    [presentes],
  );

  const visiveis = useMemo(
    () => filtrarPresentes(presentes, { categoria, busca }),
    [presentes, categoria, busca],
  );

  function presentear(id) {
    // Novo Set para manter o estado imutável.
    setPresenteados((anterior) => new Set(anterior).add(id));
  }

  return (
    <>
      <Cabecalho noivos="Ana & Pedro" data="14 de março de 2027" />
      <BarraProgresso total={presentes.length} presenteados={presenteados.size} />
      <Main>
        <Filtros>
          <CampoBusca valor={busca} onChange={setBusca} />
          <FiltroCategorias
            categorias={categorias}
            ativa={categoria}
            onChange={setCategoria}
          />
        </Filtros>
        <GradePresentes
          presentes={visiveis}
          presenteados={presenteados}
          onPresentear={presentear}
        />
      </Main>
    </>
  );
}
