import { render, screen, fireEvent } from '@testing-library/react'
import Debts from '../../../src/components/debts/Debts'
import { afterEach, beforeEach } from 'vitest';
import * as api from '../../../src/api';
import { actWrapper } from '../../helpers';
import * as notify from '../../../src/utility/notifications';

const debtList = {data: {data: [
  {id: 1, attributes: {id: 1, name: "Sample Debt"}},
  {id: 2, attributes: {id: 2, name: "Another Debt"}}]
}};

describe('Debts', () => {
  beforeEach(() => {
    vi.mock('../../../src/api', () => {
      return {
        debtList: vi.fn(() => Promise.resolve(debtList)),
        deleteDebt: vi.fn(() => Promise.resolve({message: 'success'})),
        createDebt: vi.fn(() => Promise.resolve({message: 'success'})),
        updateDebt: vi.fn(() => Promise.resolve({message: 'success'}))
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

      vi.mock('../../../src/components/PieChart.jsx', () => {
        return {
          default: () => <div data-testid='mocked-piechart'></div>
        }
      })
    });
    it('renders the container page', async () => {
      render(<Debts />);
      const header = await screen.findByTestId("debts-header");
      expect(header).toBeInTheDocument();
    });

    it('renders the add button', async () => {
      render(<Debts />);
      const addButton = await screen.findByTestId("debts-add-button");
      expect(addButton).toBeInTheDocument();
    });

    it('renders the expected number of DebtRows', async () => {
      render(<Debts />);
      const debtRow = await screen.findByText("Sample Debt");
      expect(debtRow).toBeInTheDocument();
    });

    it('renders the DebtModal when editing', async () => {
      render(<Debts />);
      const debtRow = await screen.findByText("Sample Debt");
      expect(debtRow).toBeInTheDocument();
      await actWrapper(fireEvent.click(debtRow));
      const modal = screen.getByTestId("mocked-modal");
      expect(modal).toBeInTheDocument();
    });

    it('renders the DebtModal when creating', async () => {
      render(<Debts />);
      const btn = screen.getByTestId('debts-add-button');
      expect(btn).toBeInTheDocument();
      await actWrapper(fireEvent.click(btn));
      const modal = screen.getByTestId("mocked-modal");
      expect(modal).toBeInTheDocument();
    });

    it('logs an error on api failure', async () => {
      const spy = vi.spyOn(notify, 'alert')
      api.debtList.mockRejectedValue('get debts error');
      render(<Debts />);
      // Make sure the page has gotten past useEffect
      await screen.findByTestId("debts-header");
      expect(spy).toHaveBeenCalledWith('get debts error');
    })
  });

  describe('modal', () => {
    describe('when clicking "Add Debt"', () => {
      it('has the save, close, and delete buttons rendered', async () => {
        render(<Debts />);
        const debtRow = await screen.findByText("Sample Debt");
        await actWrapper(fireEvent.click(debtRow));
        const saveButton = screen.getByTestId('debts-modal-save-button');
        const closeButton = screen.getByTestId('debts-modal-close-button');
        const deleteButton = screen.getByTestId('debts-modal-delete-button');
        expect(saveButton).toBeInTheDocument();
        expect(closeButton).toBeInTheDocument();
        expect(deleteButton).toBeInTheDocument();
      });
      it('has the update button rendered', async () => {
        render(<Debts />);
        const debtRow = await screen.findByText("Sample Debt");
        await actWrapper(fireEvent.click(debtRow));
        const updateButton = screen.getByText('Update');
        expect(updateButton).toBeInTheDocument();
      });
    });

    describe('when clicking a debt row', () => {
      it('has the save and close buttons rendered', async () => {
        render(<Debts />);
        const addButton = screen.getByTestId("debts-add-button");
        await actWrapper(fireEvent.click(addButton));
        const saveButton = screen.getByTestId('debts-modal-save-button');
        const closeButton = screen.getByTestId('debts-modal-close-button');
        expect(saveButton).toBeInTheDocument();
        expect(closeButton).toBeInTheDocument();
      });
      it('has the create button rendered', async () => {
        render(<Debts />);
        const addButton = screen.getByTestId("debts-add-button");
        await actWrapper(fireEvent.click(addButton));
        const createButton = screen.getByText('Create');
        expect(createButton).toBeInTheDocument();
      });
      it('does not render the delete button', async () => {
        render(<Debts />);
        const addButton = screen.getByTestId("debts-add-button");
        await actWrapper(fireEvent.click(addButton));
        const deleteButton = screen.queryByText('Delete');
        expect(deleteButton).not.toBeInTheDocument();
      });
    });

    describe('when saving a new debt', () => {
      it('calls on createDebt', async () => {
        render(<Debts />);
        const addButton = screen.getByTestId("debts-add-button");
        await actWrapper(fireEvent.click(addButton));
        const createButton = screen.getByTestId('debts-modal-save-button');
        const spy = vi.spyOn(api, 'createDebt');
        await actWrapper(fireEvent.click(createButton));
        expect(spy).toHaveBeenCalled();
        spy.mockReset();
      });
      it('creates toast on success', async () => {
        api.createDebt.mockReturnValue('success');
        const spy = vi.spyOn(notify, 'success');
        render(<Debts />);
        const addButton = screen.getByTestId("debts-add-button");
        await actWrapper(fireEvent.click(addButton));
        const createButton = screen.getByTestId('debts-modal-save-button');
        await actWrapper(fireEvent.click(createButton));
        expect(spy).toHaveBeenCalledWith('New debt was successfully created!');
        spy.mockReset();
      });
      it('creates toast on failure', async () => {
        const spy = vi.spyOn(notify, 'alert')
        api.createDebt.mockRejectedValue('create error');
        render(<Debts />);
        const addButton = screen.getByTestId("debts-add-button");
        await actWrapper(fireEvent.click(addButton));
        const createButton = screen.getByTestId('debts-modal-save-button');
        await actWrapper(fireEvent.click(createButton));
        expect(spy).toHaveBeenCalledWith('create error');
      });
    });

    describe('when updating an existing debt', () => {
      it('calls on updateDebt', async () => {
        render(<Debts />);
        const debtRow = await screen.findByText("Sample Debt");
        await actWrapper(fireEvent.click(debtRow));
        const updateButton = screen.getByTestId('debts-modal-save-button');
        const spy = vi.spyOn(api, 'updateDebt');
        await actWrapper(fireEvent.click(updateButton));
        expect(spy).toHaveBeenCalled();
        spy.mockReset();
      });
      it('creates toast on success', async () => {
        api.updateDebt.mockReturnValue('success');
        const spy = vi.spyOn(notify, 'success');
        render(<Debts />);
        const debtRow = await screen.findByText("Sample Debt");
        await actWrapper(fireEvent.click(debtRow));
        const updateButton = screen.getByTestId('debts-modal-save-button');
        await actWrapper(fireEvent.click(updateButton));
        expect(spy).toHaveBeenCalledWith('Debt was successfully updated!');
        spy.mockReset();
      });
      it('logs an error on failure', async () => {
        const spy = vi.spyOn(notify, 'alert');
        api.updateDebt.mockRejectedValue('update error');
        render(<Debts />);
        const debtRow = await screen.findByText("Sample Debt");
        await actWrapper(fireEvent.click(debtRow));
        const updateButton = screen.getByTestId('debts-modal-save-button');
        await actWrapper(fireEvent.click(updateButton));
        expect(spy).toHaveBeenCalledWith('update error');
        spy.mockReset();
      });
    });

    describe('when deleting a debt', () => {
      it('calls on deleteDebt', async () => {
        render(<Debts />);
        const debtRow = await screen.findByText("Sample Debt");
        await actWrapper(fireEvent.click(debtRow));
        const deleteButton = screen.getByTestId('debts-modal-delete-button');
        const spy = vi.spyOn(api, 'deleteDebt');
        await actWrapper(fireEvent.click(deleteButton));
        expect(spy).toHaveBeenCalled();
      });
      it('creates toast on success', async () => {
        api.deleteDebt.mockReturnValue('success');
        const spy = vi.spyOn(notify, 'success');
        render(<Debts />);
        const debtRow = await screen.findByText("Sample Debt");
        await actWrapper(fireEvent.click(debtRow));
        const deleteButton = screen.getByTestId('debts-modal-delete-button');
        await actWrapper(fireEvent.click(deleteButton));
        expect(spy).toHaveBeenCalledWith('Debt was successfully deleted!');
        spy.mockReset();
      });
      it('logs an error on failure', async () => {
        const spy = vi.spyOn(notify, 'alert');
        api.deleteDebt.mockRejectedValue('delete error');
        render(<Debts />);
        const debtRow = await screen.findByText("Sample Debt");
        await actWrapper(fireEvent.click(debtRow));
        const deleteButton = screen.getByTestId('debts-modal-delete-button');
        await actWrapper(fireEvent.click(deleteButton));
        expect(spy).toHaveBeenCalledWith('delete error');
      });
    });

    describe('when closing the modal', () => {
      it('closes the modal when editing', async () => {
        render(<Debts />);
        const debtRow = await screen.findByText("Sample Debt");
        await actWrapper(fireEvent.click(debtRow));
        const closeButton = screen.getByTestId('debts-modal-close-button');
        await actWrapper(fireEvent.click(closeButton));
        const header = screen.queryByText('Edit Debt');
        expect(header).not.toBeInTheDocument();
      });

      it('closes the modal when creating', async () => {
        render(<Debts />);
        const addButton = screen.getByTestId("debts-add-button");
        await actWrapper(fireEvent.click(addButton));
        const closeButton = screen.getByTestId('debts-modal-close-button');
        await actWrapper(fireEvent.click(closeButton));
        const header = screen.queryByText('New Debt');
        expect(header).not.toBeInTheDocument();
      });
    });

    describe('when modifying the input', () => {
      it('updates the state object', async () => {
        render(<Debts />);
        const addButton = screen.getByTestId("debts-add-button");
        await actWrapper(fireEvent.click(addButton));
        const nameInput = screen.getByTestId('debts-modal-name-input');
        await actWrapper(fireEvent.change(nameInput, {target: {value: 'some name'}}));
        const spy = vi.spyOn(api, 'createDebt');
        const saveButton = screen.getByTestId('debts-modal-save-button')
        await actWrapper(fireEvent.click(saveButton));
        expect(spy).toHaveBeenCalledWith({name: 'some name'});
      });
    });
  });
});
