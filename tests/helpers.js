import { act } from "@testing-library/react";

export async function actWrapper(callback) {
  await act(async () => {
    callback;
    await Promise.resolve();
  });
}
