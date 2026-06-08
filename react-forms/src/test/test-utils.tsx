import { store } from "@/app/store/store";
import { render } from "@testing-library/react";
import type { ReactNode } from "react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";

export const renderWithProviders = (ui: ReactNode) => {
  return render(
    <Provider store={store}>
      <MemoryRouter>{ui}</MemoryRouter>
    </Provider>,
  );
};
