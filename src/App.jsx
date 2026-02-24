import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { CreateUserPage } from "./pages/users/CreateUsersPage";
import { UpdateUserPage } from "./pages/users/UpdateUsersPage";
import { UsersPage } from "./pages/users/UsersPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/users/create" element={<CreateUserPage />} />
          <Route path="/users/edit/:id" element={<UpdateUserPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}