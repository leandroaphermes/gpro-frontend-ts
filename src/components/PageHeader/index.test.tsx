import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Menu } from "antd";

import PageHeader from ".";

it("render title e subtitle", () => {
  render(<PageHeader title="Example menu" subTitle="example submenu" />);

  expect(screen.getByText(/Example menu/i)).toBeInTheDocument();
  expect(screen.getByText(/example submenu/i)).toBeInTheDocument();
});

it("render com menu ações", async () => {
  render(
    <PageHeader
      title="Example menu"
      subTitle="example submenu"
      acoesMenu={
        <Menu>
          <Menu.Item key="menu-1">Menu 1</Menu.Item>
        </Menu>
      }
    />
  );

  fireEvent.click(screen.getByLabelText(/Mais Ações/i));

  await waitFor(() => {
    expect(screen.getByText(/Menu 1/i)).toBeInTheDocument();
  });
});
