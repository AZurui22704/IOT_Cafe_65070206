import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import { createTheme, MantineProvider } from "@mantine/core";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { SWRConfig } from "swr";
import axios from "axios";
import HomePage from "./pages";
import { Notifications } from "@mantine/notifications";
import BooksPage from "./pages/books";
import BookByIdPage from "./pages/book-by-id";
import BookEditById from "./pages/book-edit-by-id";
import { ModalsProvider } from "@mantine/modals";
import BookCreatePage from "./pages/book-create";
import MenusPage from "./pages/menus";
import MenuCreatePage from "./pages/menu-create";
import MenuByIdPage from "./pages/menu-by-id";
import MenusEditById from "./pages/menu-edit-by-id";
import OrderCreatePage from "./pages/menu-order";
import SeeOrdersPage from "./pages/seeorders";
import OrderByIdPage from "./pages/order-by-id";


const theme = createTheme({
  primaryColor: "orange",
  fontFamily: '"Noto Sans Thai Looped", sans-serif',
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/books",
    element: <BooksPage />,
  },
  {
    path: "/books/create",
    element: <BookCreatePage />,
  },
  {
    path: "/books/:bookId",
    element: <BookByIdPage />,
  },
  {
    path: "/books/:bookId/edit",
    element: <BookEditById />,
  },
  {
    path: "/menus",
    element: <MenusPage />,

  },
  {
    path: "/menus/create",
    element: <MenuCreatePage />,
  },
  {
    path: "/menus/:menuId",
    element: <MenuByIdPage />,
  },
  {
    path: "/menus/:menuId/edit",
    element: <MenusEditById/>,
  },
  {
    path: "/orders/create",
    element: <OrderCreatePage />,
  },
  {
    path: "/orders",
    element: <SeeOrdersPage />,
  },
  {
    path: "/orders/:orderId",
    element: <OrderByIdPage />,
  },

]);

if (import.meta.env.VITE_API_URL) {
  axios.defaults.baseURL = import.meta.env.VITE_API_URL;
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <SWRConfig
      value={{
        fetcher: (url: string) =>
          axios
            .get(url, {
              baseURL: import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api/v1",
            })
            .then((res) => res.data),
      }}
    >
      <MantineProvider theme={theme}>
        <Notifications position="top-right" />
        <ModalsProvider>
          <RouterProvider router={router} />
        </ModalsProvider>
      </MantineProvider>
    </SWRConfig>
  </React.StrictMode>
);
