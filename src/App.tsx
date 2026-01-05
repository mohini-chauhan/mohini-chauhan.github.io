
import ThemeProvider from "./context/ThemeContext";
import Layout from "./components/Layout";
import './index.css';
export function App() {
  return (
    <ThemeProvider>
      <Layout>
        hello
      </Layout>
    </ThemeProvider>
  );
}

export default App;
