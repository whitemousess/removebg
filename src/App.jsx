import { useEffect } from "react";

import MainLayout from "~/layout/MainLayout";
import lang from "~/assets/language";

function App() {
  useEffect(() => {
    document.title = lang.titleWeb;
  }, []);

  return <MainLayout />;
}

export default App;
