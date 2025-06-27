import { fireEvent, render, screen } from "@testing-library/react";
import Mortgage from "../../../src/components/mortgage/Mortgage";
import { actWrapper } from "../../helpers";
import * as api from "../../../src/api";
import * as notifications from "../../../src/utility/notifications";
import { expect } from "vitest";

const mortgage = {
  id: '1',
  attributes: {
    originalBalance: 300000,
    downPayment: 60000,
    currentBalance: 240000,
    apr: 3.5,
    term: 360,
    payment: 1350,
    tax: 300,
    insurance: 100,
    pmi: 150,
    extraPayment: 200
  }
};

describe('Mortgage', () => {
  beforeEach(() => {
    vi.mock('../../../src/api', () => {
      return {
        getMortgage: vi.fn(() => Promise.resolve({ data: {}})),
        deleteMortgage: vi.fn(() => Promise.resolve({message: 'success'})),
        createMortgage: vi.fn(() => Promise.resolve({message: 'success'}))
      }
    });
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('renders the header', () => {
    render(<Mortgage />);
    const header = screen.getByText('Manage Your Mortgage');
    expect(header).toBeInTheDocument();
  });

  describe('when no mortgage exists', () => {
    it('renders the create mortgage button', () => {
      render(<Mortgage />);
      const button = screen.getByText('Create Mortgage');
      expect(button).toBeInTheDocument();
    });

    it('does not render the edit mortgage button', () => {
      render(<Mortgage />);
      const button = screen.queryByText('Edit Mortgage');
      expect(button).not.toBeInTheDocument();
    });

    it('does not render mortgage details', () => {
      render(<Mortgage />);
      const details = screen.queryByTestId('mortgage-details');
      expect(details).not.toBeInTheDocument();
    });
  });

  describe('when a mortgage exists', () => {
    beforeEach(() => {
      vi.mock('../../../src/api', () => ({
        getMortgage: vi.fn(() => Promise.resolve({ data: { data: mortgage }})),
        deleteMortgage: vi.fn(() => Promise.resolve({message: 'success'})),
        createMortgage: vi.fn(() => Promise.resolve({message: 'success'}))
      }));
    });

    it('renders the edit mortgage button', async () => {
      render(<Mortgage />);
      const button = await screen.findByText('Edit Mortgage');
      expect(button).toBeInTheDocument();
    });

    it('renders mortgage details', async () => {
      render(<Mortgage />);
      const details = await screen.findByTestId('mortgage-details');
      expect(details).toBeInTheDocument();
    });
  });

  describe('when editing a mortgage', () => {
    beforeEach(() => {
      vi.mock('../../../src/api', () => ({
        getMortgage: vi.fn(() => Promise.resolve({ data: { data: mortgage }})),
        deleteMortgage: vi.fn(() => Promise.resolve({message: 'success'})),
        createMortgage: vi.fn(() => Promise.resolve({message: 'success'}))
      }));
    });

    afterEach(() => {
      vi.resetAllMocks();
    })

    it('renders the mortgage inputs form', async () => {
      render(<Mortgage />);
      const button = await screen.findByText('Edit Mortgage');
      await actWrapper(fireEvent.click(button));
      const inputs = screen.getByTestId('mortgage-inputs');
      expect(inputs).toBeInTheDocument();
    });

    it('calls the create function when save button is clicked', async () => {
      const spy = vi.spyOn(api, 'createMortgage');
      render(<Mortgage />);
      const button = await screen.findByText('Edit Mortgage');
      await actWrapper(fireEvent.click(button));
      const saveButton = screen.getByText('Save');
      await actWrapper(fireEvent.click(saveButton));
      expect(spy).toHaveBeenCalled();
    });

    it('calls the delete function when delete button is clicked', async () => {
      const spy = vi.spyOn(api, 'deleteMortgage');
      render(<Mortgage />);
      const button = await screen.findByText('Edit Mortgage');
      await actWrapper(fireEvent.click(button));
      const deleteButton = screen.getByText('Delete');
      await actWrapper(fireEvent.click(deleteButton));
      expect(spy).toHaveBeenCalled();
    });

    it('renders the main page when cancel button is clicked', async () => {
      render(<Mortgage />);
      const button = await screen.findByText('Edit Mortgage');
      await actWrapper(fireEvent.click(button));
      const cancelButton = screen.getByText('Cancel');
      await actWrapper(fireEvent.click(cancelButton));
      const mainPage = screen.getByText('Manage Your Mortgage');
      expect(mainPage).toBeInTheDocument();
    });

    it('alerts on error when fetching mortgage', async () => {
      api.getMortgage.mockRejectedValue('Error fetching mortgage');
      const spy = vi.spyOn(notifications, 'alert');
      render(<Mortgage />);
      await actWrapper(() => {
        fireEvent.click(screen.getByText('Edit Mortgage'));
      });
      expect(spy).toHaveBeenCalledWith('Error fetching mortgage');
    });

    it('alerts on error when creating a mortgage', async () => {
      api.createMortgage.mockRejectedValue('Error creating mortgage');
      const spy = vi.spyOn(notifications, 'alert');
      const spy2 = vi.spyOn(notifications, 'success');
      render(<Mortgage />);
      const button = await screen.findByText('Edit Mortgage');
      await actWrapper(fireEvent.click(button));
      const saveButton = await screen.findByText('Save');
      await actWrapper(fireEvent.click(saveButton));
      expect(spy2).not.toHaveBeenCalled();
      expect(spy).toHaveBeenCalledWith('Error creating mortgage');
    });

    it('alerts on error when deleting a mortgage', async () => {
      api.deleteMortgage.mockRejectedValue('Error deleting mortgage');
      const spy = vi.spyOn(notifications, 'alert');
      render(<Mortgage />);
      const button = await screen.findByText('Edit Mortgage');
      await actWrapper(fireEvent.click(button));
      const deleteButton = screen.getByText('Delete');
      await actWrapper(fireEvent.click(deleteButton));
      expect(spy).toHaveBeenCalledWith('Error deleting mortgage');
    });

    it('shows success notification on successful mortgage creation', async () => {
      const spy = vi.spyOn(notifications, 'success');
      render(<Mortgage />);
      const button = await screen.findByText('Edit Mortgage');
      await actWrapper(fireEvent.click(button));
      const saveButton = screen.getByText('Save');
      await actWrapper(fireEvent.click(saveButton));
      expect(spy).toHaveBeenCalledWith('Successfully created mortgage!');
    });

    it('handles changing mortgage inputs', async () => {
      render(<Mortgage />);
      const button = await screen.findByText('Edit Mortgage');
      await actWrapper(fireEvent.click(button));
      const originalBalanceInput = await screen.findByTestId('mortgage-inputs-original-balance');
      await actWrapper(fireEvent.change(originalBalanceInput, { target: { value: '350000' } }));
      expect(originalBalanceInput.value).toBe('350000');
    });
  });
});
