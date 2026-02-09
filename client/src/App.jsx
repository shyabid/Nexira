import { RouterProvider } from "react-router";
import router from "./routes/router";
import AuthProvider from "./providers/AuthProvider";
import ThemeProvider from "./providers/ThemeProvider";

function App() {
  return (
    <>
      <AuthProvider>
        <ThemeProvider>
          <RouterProvider router={router} />
        </ThemeProvider>
      </AuthProvider>
    </>
  );
}

export default App;
