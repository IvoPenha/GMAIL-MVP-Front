import { BrowserRouter, Route, Routes } from "react-router-dom";
import MailListPage from "../pages/MailListPage/MailListPage";
import LoginPage from "../pages/LoginPage/LoginPage";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"   element={<MailListPage />} />
        <Route path="/login"
        element={
          <LoginPage/>
        }
        >
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes