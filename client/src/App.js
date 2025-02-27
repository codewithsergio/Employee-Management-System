import "./App.css";
import Table from "./components/Table";
import AddEmployee from "./components/AddEmployee";
import UpdateEmployee from "./components/UpdateEmployee";
import { createBrowserRouter, Route } from "react-router-dom";
import { createRoutesFromElements, RouterProvider } from "react-router";
import RootLayout from "./components/RootLayout";
import { ContextProvider } from "./context/Context";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="" element={<RootLayout />}>
      <Route
        index
        element={
          <>
            <Table />
          </>
        }
      />
      <Route
        path="addemployee"
        element={
          <>
            <AddEmployee />
          </>
        }
      />
      <Route
        path="updateemployee"
        element={
          <>
            <UpdateEmployee />
          </>
        }
      />
    </Route>
  )
);

function App() {
  return (
    <div className="App">
      <ContextProvider>
        <RouterProvider router={router} />
      </ContextProvider>
    </div>
  );
}

export default App;
