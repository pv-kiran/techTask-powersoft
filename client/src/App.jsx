import { Routes, Route } from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import SigninPage from "./pages/SigninPage";
import AppLayout from "./utils/AppLayout";
import WelcomePage from "./pages/WelcomePage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<WelcomePage />}></Route>
          <Route path="/signup" element={<SignupPage />}></Route>
          <Route path="/signin" element={<SigninPage />}></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
