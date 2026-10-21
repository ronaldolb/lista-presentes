// Função pura: fácil de testar isoladamente.
export function filtrarPresentes(lista, { categoria = 'Todos', busca = '' } = {}) {
  const termo = busca.trim().toLowerCase();

  return lista.filter((presente) => {
    const passaCategoria = categoria === 'Todos' || presente.categoria === categoria;
    const passaBusca = termo === '' || presente.nome.toLowerCase().includes(termo);
    return passaCategoria && passaBusca;
  });
}
