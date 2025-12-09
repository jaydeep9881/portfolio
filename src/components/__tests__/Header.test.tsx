import { render, screen, fireEvent } from '@testing-library/react';
import Header from '../Header';

describe('Header', () => {
  it('renders title and toggles theme', () => {
    const setTheme = jest.fn();
    render(<Header theme="dark" setTheme={setTheme} />);
    expect(screen.getByText(/resume/i)).toBeInTheDocument();
    const toggle = screen.getByRole('button', { name: /toggle theme/i });
    fireEvent.click(toggle);
    expect(setTheme).toHaveBeenCalled();
  });
});


