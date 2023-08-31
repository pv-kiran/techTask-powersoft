import { Routes, Route } from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import SigninPage from "./pages/SigninPage";
import AppLayout from "./utils/AppLayout";
import WelcomePage from "./pages/WelcomePage";
import AuthProvider from "./context/AuthProvider";
import PublicRoutes from "./utils/PublicRoutes";
import RecruiterRoutes from "./utils/RecruiterRoutes";
import CandidateRoutes from "./utils/CandidateRoutes";
import ViewSchedule from "./components/ViewSchedule";
import BookSchedule from "./components/BookSchedule";
import RecruiterSchedule from "./components/RecruiterSchedule";

function App() {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<WelcomePage />}></Route>
            <Route element={<PublicRoutes></PublicRoutes>}>
              <Route path="/signup" element={<SignupPage />}></Route>
              <Route path="/signin" element={<SigninPage />}></Route>
            </Route>
            <Route element={<RecruiterRoutes />}>
              <Route path="/scheduling" element={<RecruiterSchedule />}></Route>
            </Route>
            <Route element={<CandidateRoutes />}>
              <Route path="/schedule/view" element={<ViewSchedule />}></Route>
              <Route path="/schedule/book" element={<BookSchedule />}></Route>
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
