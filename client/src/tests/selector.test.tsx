import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi, describe, test, expect } from 'vitest';
import { Selector } from '@/shared/components/Selector';

const MOCK_ITEMS = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
];

const DEFAULT_PROPS = {
  placeholder: 'Select a fruit',
  label: 'Fruits',
  items: MOCK_ITEMS,
};

describe('Selector Component', () => {
  test('renders the placeholder correctly', () => {
    render(<Selector {...DEFAULT_PROPS} />);
    expect(screen.getByText('Select a fruit')).toBeInTheDocument();
  });

  test('opens the menu and displays items when clicked', async () => {
    const user = userEvent.setup();
    render(<Selector {...DEFAULT_PROPS} />);

    const trigger = screen.getByRole('combobox');
    await user.click(trigger);

    await waitFor(() => {
      expect(screen.getByText('Fruits')).toBeInTheDocument();
    });
    expect(screen.getByRole('option', { name: 'Apple' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Banana' })).toBeInTheDocument();
  });

  test('calls onValueChange when an item is selected', async () => {
    const user = userEvent.setup();

    const handleValueChange = vi.fn();

    render(<Selector {...DEFAULT_PROPS} onValueChange={handleValueChange} />);

    await user.click(screen.getByRole('combobox'));
    const option = await screen.findByRole('option', { name: 'Apple' });
    await user.click(option);

    expect(handleValueChange).toHaveBeenCalledTimes(1);
    expect(handleValueChange).toHaveBeenCalledWith('apple');
  });

  test('displays the selected value instead of placeholder', () => {
    render(<Selector {...DEFAULT_PROPS} value='banana' />);
    expect(screen.queryByText('Select a fruit')).not.toBeInTheDocument();
    expect(screen.getByText('Banana')).toBeInTheDocument();
  });
});
