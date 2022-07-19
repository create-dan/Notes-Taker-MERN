import "./App.css";
import Header from "./components/Header/header";
import LandingPage from "./screens/LandingPage/LandingPage";
import MyNotes from "./screens/MyNotes/MyNotes";
import Footer from "./components/Footer/footer";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegisterScreen from "./screens/RegisterScreen/RegisterScreen";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import CreateNote from "./screens/CreateNote/CreateNote";
import SingleNote from "./screens/SingleNote/SingleNote";
import { useState } from "react";
import ProfileScreen from "./screens/ProfileScreen/ProfileScreen";

function App() {
  const [search, setSearch] = useState("");
  console.log(search);
  return (
    <BrowserRouter>
      <Header setSearch={setSearch} />
      <main>
        <Routes>
          <Route path="/" element={<LandingPage />} exact />
          <Route path="/login" element={<LoginScreen />} exact />
          <Route path="/profile" element={<ProfileScreen />} exact />
          <Route path="/createnote" element={<CreateNote />} exact />
          <Route path="/note/:id" element={<SingleNote />} exact />
          <Route path="/register" element={<RegisterScreen />} exact />
          <Route path="/mynotes" element={<MyNotes search={search} />} exact />
        </Routes>
      </main>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
