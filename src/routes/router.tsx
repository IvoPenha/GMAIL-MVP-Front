import { BrowserRouter, Route, Routes } from "react-router-dom";
import MailListPage from "../pages/MailListPage/MailListPage";
import LoginPage from "../pages/LoginPage/LoginPage";
import ProtectedRoute from './components/protectedRoute';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"   element={<ProtectedRoute component={MailListPage} />} />
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