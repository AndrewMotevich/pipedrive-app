import { Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import About from "./pages/About";
import Form from "./pages/Form";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Navigation from "./components/Navigation/Navigation";

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Navigation />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/form" element={<Form />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </LocalizationProvider>
  );
}

export default App;
