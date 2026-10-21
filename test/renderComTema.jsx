import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { theme } from '../src/styles/theme';

// Os componentes usam props.theme, então todo teste precisa do ThemeProvider.
export function renderComTema(ui) {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);
}
