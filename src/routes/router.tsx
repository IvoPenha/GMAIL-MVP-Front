import { BrowserRouter, Route, Routes } from "react-router-dom";
import MailListPage from "../pages/MailListPage/MailListPage";
import LoginPage from "../pages/LoginPage/LoginPage";
import ProtectedRoute from './components/protectedRoute';
import { SettingsPage } from '../pages/Settings/settingsPage';
import { MainLayout } from '../layout';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login"
          element={
            <LoginPage />
          }
        >
        </Route>
        <Route path='/' element={<ProtectedRoute component={MainLayout} />}>
          <Route path="/boletos" element={<ProtectedRoute component={MailListPage} />} />
          <Route path='/settings' element={<ProtectedRoute component={SettingsPage} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes