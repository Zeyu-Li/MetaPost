import { render, screen } from '@testing-library/react';
import { beforeAll, test, expect } from 'vitest';
import App from './App';

beforeAll(() => {
  // The Facebook SDK loader inserts its <script> next to the page's first one, as in index.html.
  document.head.appendChild(document.createElement('script'));
});

test('renders the MetaPost login screen', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: /MetaPost/ })).toBeInTheDocument();
  expect(screen.getByAltText('MetaPost logo')).toBeInTheDocument();
});
