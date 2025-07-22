import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ExecutionTable } from '../../../src/pages/Popup/components/ExecutionTable';
import { ExecutionMeta } from '../../../src/pages/types/execution';

describe('ExecutionTable', () => {
  const mockExecutions: ExecutionMeta[] = [
    {
      id: 'exec-0-1700000000',
      startedAt: 1700000000000,
      endedAt: 1700000060000,
      stepCount: 10,
      hasErrors: false,
      url: 'https://example.com',
      title: 'Test Recording 1',
    },
    {
      id: 'exec-1-1700001000',
      startedAt: 1700001000000,
      endedAt: 1700001120000,
      stepCount: 15,
      hasErrors: true,
      url: 'https://test.com',
      title: 'Test Recording 2',
    },
  ];

  const mockOnExecutionClick = jest.fn();

  beforeEach(() => {
    mockOnExecutionClick.mockClear();
  });

  it('should render executions in descending order by date', () => {
    render(
      <ExecutionTable
        executions={mockExecutions}
        onExecutionClick={mockOnExecutionClick}
      />
    );

    const rows = screen.getAllByRole('row');
    // Header + 2 data rows
    expect(rows).toHaveLength(3);

    // Verifica se a execução mais recente aparece primeiro
    expect(rows[1]).toHaveTextContent('Test Recording 2');
    expect(rows[2]).toHaveTextContent('Test Recording 1');
  });

  it('should display correct status icons', () => {
    render(
      <ExecutionTable
        executions={mockExecutions}
        onExecutionClick={mockOnExecutionClick}
      />
    );

    expect(screen.getByText('✅')).toBeInTheDocument();
    expect(screen.getByText('❌')).toBeInTheDocument();
  });

  it('should call onExecutionClick when a row is clicked', () => {
    render(
      <ExecutionTable
        executions={mockExecutions}
        onExecutionClick={mockOnExecutionClick}
      />
    );

    const firstDataRow = screen.getAllByRole('row')[1];
    fireEvent.click(firstDataRow);

    expect(mockOnExecutionClick).toHaveBeenCalledWith('exec-1-1700001000');
  });

  it('should show empty state when no executions', () => {
    render(
      <ExecutionTable executions={[]} onExecutionClick={mockOnExecutionClick} />
    );

    expect(screen.getByText('Nenhuma execução encontrada')).toBeInTheDocument();
  });

  it('should format duration correctly', () => {
    render(
      <ExecutionTable
        executions={mockExecutions}
        onExecutionClick={mockOnExecutionClick}
      />
    );

    // 60 segundos = 1m 0s
    expect(screen.getByText('1m 0s')).toBeInTheDocument();
    // 120 segundos = 2m 0s
    expect(screen.getByText('2m 0s')).toBeInTheDocument();
  });

  it('should display step count', () => {
    render(
      <ExecutionTable
        executions={mockExecutions}
        onExecutionClick={mockOnExecutionClick}
      />
    );

    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.getByText('15')).toBeInTheDocument();
  });

  it('should apply error class to rows with errors', () => {
    const { container } = render(
      <ExecutionTable
        executions={mockExecutions}
        onExecutionClick={mockOnExecutionClick}
      />
    );

    const errorRow = container.querySelector('.has-errors');
    expect(errorRow).toBeInTheDocument();
  });
});
