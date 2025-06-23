import { render, screen, fireEvent } from '@testing-library/react'
import MonthlyExpenses from '../../../src/components/monthlyExpenses/MonthlyExpenses';
import { afterEach, beforeEach } from 'vitest';
import * as api from '../../../src/api';
import { actWrapper } from '../../helpers';
import * as notify from '../../../src/utility/notifications';

const monthlyExpenseList = {data: {data: [
  {id: 1, attributes: {id: 1, name: "Sample Monthly Expense"}},
  {id: 2, attributes: {id: 2, name: "Another Monthly Expense"}}]
}};

describe('Monthly Expenses', () => {
  beforeEach(() => {
    vi.mock('../../../src/api', () => {
      return {
        monthlyExpenseList: vi.fn(() => Promise.resolve(monthlyExpenseList)),
        deleteMonthlyExpense: vi.fn(() => Promise.resolve({message: 'success'})),
        createMonthlyExpense: vi.fn(() => Promise.resolve({message: 'success'})),
        updateMonthlyExpense: vi.fn(() => Promise.resolve({message: 'success'}))
      }
    });
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe('primary page', () => {
    beforeEach(() => {
      vi.mock('../../../src/components/modal/Modal.jsx', () => {
        return {
          default: (props) => <div data-testid="mocked-modal">{props.children}</div>
        }
      });
    });
    it('renders the container page', async () => {
      render(<MonthlyExpenses />);
      const header = await screen.findByTestId("monthly-expenses-header");
      expect(header).toBeInTheDocument();
    });

    it('renders the add button', async () => {
      render(<MonthlyExpenses />);
      const addButton = await screen.findByTestId("monthly-expenses-add-button");
      expect(addButton).toBeInTheDocument();
    });

    it('renders the expected number of Monthly ExpenseRows', async () => {
      render(<MonthlyExpenses />);
      const monthlyExpenseRow = await screen.findByText("Sample Monthly Expense");
      expect(monthlyExpenseRow).toBeInTheDocument();
    });

    it('renders the Monthly ExpenseModal when editing', async () => {
      render(<MonthlyExpenses />);
      const monthlyExpenseRow = await screen.findByText("Sample Monthly Expense");
      expect(monthlyExpenseRow).toBeInTheDocument();
      await actWrapper(fireEvent.click(monthlyExpenseRow));
      const modal = screen.getByTestId("mocked-modal");
      expect(modal).toBeInTheDocument();
    });

    it('renders the Monthly ExpenseModal when creating', async () => {
      render(<MonthlyExpenses />);
      const btn = screen.getByTestId('monthly-expenses-add-button');
      expect(btn).toBeInTheDocument();
      await actWrapper(fireEvent.click(btn));
      const modal = screen.getByTestId("mocked-modal");
      expect(modal).toBeInTheDocument();
    });

    it('logs an error on api failure', async () => {
      const spy = vi.spyOn(notify, 'alert')
      api.monthlyExpenseList.mockRejectedValue('get monthlyExpenses error');
      render(<MonthlyExpenses />);
      // Make sure the page has gotten past useEffect
      await screen.findByTestId("monthly-expenses-header");
      expect(spy).toHaveBeenCalledWith('get monthlyExpenses error');
    })
  });

  describe('modal', () => {
    describe('when clicking "Add Monthly Expense"', () => {
      it('has the save, close, and delete buttons rendered', async () => {
        render(<MonthlyExpenses />);
        const monthlyExpenseRow = await screen.findByText("Sample Monthly Expense");
        await actWrapper(fireEvent.click(monthlyExpenseRow));
        const saveButton = screen.getByTestId('monthly-expenses-modal-save-button');
        const closeButton = screen.getByTestId('monthly-expenses-modal-close-button');
        const deleteButton = screen.getByTestId('monthly-expenses-modal-delete-button');
        expect(saveButton).toBeInTheDocument();
        expect(closeButton).toBeInTheDocument();
        expect(deleteButton).toBeInTheDocument();
      });
      it('has the update button rendered', async () => {
        render(<MonthlyExpenses />);
        const monthlyExpenseRow = await screen.findByText("Sample Monthly Expense");
        await actWrapper(fireEvent.click(monthlyExpenseRow));
        const updateButton = screen.getByText('Update');
        expect(updateButton).toBeInTheDocument();
      });
    });

    describe('when clicking a monthlyExpense row', () => {
      it('has the save and close buttons rendered', async () => {
        render(<MonthlyExpenses />);
        const addButton = screen.getByTestId("monthly-expenses-add-button");
        await actWrapper(fireEvent.click(addButton));
        const saveButton = screen.getByTestId('monthly-expenses-modal-save-button');
        const closeButton = screen.getByTestId('monthly-expenses-modal-close-button');
        expect(saveButton).toBeInTheDocument();
        expect(closeButton).toBeInTheDocument();
      });
      it('has the create button rendered', async () => {
        render(<MonthlyExpenses />);
        const addButton = screen.getByTestId("monthly-expenses-add-button");
        await actWrapper(fireEvent.click(addButton));
        const createButton = screen.getByText('Create');
        expect(createButton).toBeInTheDocument();
      });
      it('does not render the delete button', async () => {
        render(<MonthlyExpenses />);
        const addButton = screen.getByTestId("monthly-expenses-add-button");
        await actWrapper(fireEvent.click(addButton));
        const deleteButton = screen.queryByText('Delete');
        expect(deleteButton).not.toBeInTheDocument();
      });
    });

    describe('when saving a new monthlyExpense', () => {
      it('calls on createMonthly Expense', async () => {
        render(<MonthlyExpenses />);
        const addButton = screen.getByTestId("monthly-expenses-add-button");
        await actWrapper(fireEvent.click(addButton));
        const createButton = screen.getByTestId('monthly-expenses-modal-save-button');
        const spy = vi.spyOn(api, 'createMonthlyExpense');
        await actWrapper(fireEvent.click(createButton));
        expect(spy).toHaveBeenCalled();
        spy.mockReset();
      });
      it('creates toast on success', async () => {
        api.createMonthlyExpense.mockReturnValue('success');
        const spy = vi.spyOn(notify, 'success');
        render(<MonthlyExpenses />);
        const addButton = screen.getByTestId("monthly-expenses-add-button");
        await actWrapper(fireEvent.click(addButton));
        const createButton = screen.getByTestId('monthly-expenses-modal-save-button');
        await actWrapper(fireEvent.click(createButton));
        expect(spy).toHaveBeenCalledWith('New expense was successfully created!');
        spy.mockReset();
      });
      it('creates toast on failure', async () => {
        const spy = vi.spyOn(notify, 'alert')
        api.createMonthlyExpense.mockRejectedValue('create error');
        render(<MonthlyExpenses />);
        const addButton = screen.getByTestId("monthly-expenses-add-button");
        await actWrapper(fireEvent.click(addButton));
        const createButton = screen.getByTestId('monthly-expenses-modal-save-button');
        await actWrapper(fireEvent.click(createButton));
        expect(spy).toHaveBeenCalledWith('create error');
      });
    });

    describe('when updating an existing monthlyExpense', () => {
      it('calls on updateMonthly Expense', async () => {
        render(<MonthlyExpenses />);
        const monthlyExpenseRow = await screen.findByText("Sample Monthly Expense");
        await actWrapper(fireEvent.click(monthlyExpenseRow));
        const updateButton = screen.getByTestId('monthly-expenses-modal-save-button');
        const spy = vi.spyOn(api, 'updateMonthlyExpense');
        await actWrapper(fireEvent.click(updateButton));
        expect(spy).toHaveBeenCalled();
        spy.mockReset();
      });
      it('creates toast on success', async () => {
        api.updateMonthlyExpense.mockReturnValue('success');
        const spy = vi.spyOn(notify, 'success');
        render(<MonthlyExpenses />);
        const monthlyExpenseRow = await screen.findByText("Sample Monthly Expense");
        await actWrapper(fireEvent.click(monthlyExpenseRow));
        const updateButton = screen.getByTestId('monthly-expenses-modal-save-button');
        await actWrapper(fireEvent.click(updateButton));
        expect(spy).toHaveBeenCalledWith('Expense was successfully updated!');
        spy.mockReset();
      });
      it('logs an error on failure', async () => {
        const spy = vi.spyOn(notify, 'alert');
        api.updateMonthlyExpense.mockRejectedValue('update error');
        render(<MonthlyExpenses />);
        const monthlyExpenseRow = await screen.findByText("Sample Monthly Expense");
        await actWrapper(fireEvent.click(monthlyExpenseRow));
        const updateButton = screen.getByTestId('monthly-expenses-modal-save-button');
        await actWrapper(fireEvent.click(updateButton));
        expect(spy).toHaveBeenCalledWith('update error');
        spy.mockReset();
      });
    });

    describe('when deleting a monthlyExpense', () => {
      it('calls on deleteMonthly Expense', async () => {
        render(<MonthlyExpenses />);
        const monthlyExpenseRow = await screen.findByText("Sample Monthly Expense");
        await actWrapper(fireEvent.click(monthlyExpenseRow));
        const deleteButton = screen.getByTestId('monthly-expenses-modal-delete-button');
        const spy = vi.spyOn(api, 'deleteMonthlyExpense');
        await actWrapper(fireEvent.click(deleteButton));
        expect(spy).toHaveBeenCalled();
      });
      it('creates toast on success', async () => {
        api.deleteMonthlyExpense.mockReturnValue('success');
        const spy = vi.spyOn(notify, 'success');
        render(<MonthlyExpenses />);
        const monthlyExpenseRow = await screen.findByText("Sample Monthly Expense");
        await actWrapper(fireEvent.click(monthlyExpenseRow));
        const deleteButton = screen.getByTestId('monthly-expenses-modal-delete-button');
        await actWrapper(fireEvent.click(deleteButton));
        expect(spy).toHaveBeenCalledWith('Expense was successfully deleted!');
        spy.mockReset();
      });
      it('logs an error on failure', async () => {
        const spy = vi.spyOn(notify, 'alert');
        api.deleteMonthlyExpense.mockRejectedValue('delete error');
        render(<MonthlyExpenses />);
        const monthlyExpenseRow = await screen.findByText("Sample Monthly Expense");
        await actWrapper(fireEvent.click(monthlyExpenseRow));
        const deleteButton = screen.getByTestId('monthly-expenses-modal-delete-button');
        await actWrapper(fireEvent.click(deleteButton));
        expect(spy).toHaveBeenCalledWith('delete error');
      });
    });

    describe('when closing the modal', () => {
      it('closes the modal when editing', async () => {
        render(<MonthlyExpenses />);
        const monthlyExpenseRow = await screen.findByText("Sample Monthly Expense");
        await actWrapper(fireEvent.click(monthlyExpenseRow));
        const closeButton = screen.getByTestId('monthly-expenses-modal-close-button');
        await actWrapper(fireEvent.click(closeButton));
        const header = screen.queryByText('Edit Monthly Expense');
        expect(header).not.toBeInTheDocument();
      });

      it('closes the modal when creating', async () => {
        render(<MonthlyExpenses />);
        const addButton = screen.getByTestId("monthly-expenses-add-button");
        await actWrapper(fireEvent.click(addButton));
        const closeButton = screen.getByTestId('monthly-expenses-modal-close-button');
        await actWrapper(fireEvent.click(closeButton));
        const header = screen.queryByText('New Monthly Expense');
        expect(header).not.toBeInTheDocument();
      });
    });

    describe('when modifying the input', () => {
      it('updates the state object', async () => {
        render(<MonthlyExpenses />);
        const addButton = screen.getByTestId("monthly-expenses-add-button");
        await actWrapper(fireEvent.click(addButton));
        const nameInput = screen.getByTestId('monthly-expenses-modal-name-input');
        await actWrapper(fireEvent.change(nameInput, {target: {value: 'some name'}}));
        const spy = vi.spyOn(api, 'createMonthlyExpense');
        const saveButton = screen.getByTestId('monthly-expenses-modal-save-button')
        await actWrapper(fireEvent.click(saveButton));
        expect(spy).toHaveBeenCalledWith({name: 'some name'});
      });
    });
  });
});
