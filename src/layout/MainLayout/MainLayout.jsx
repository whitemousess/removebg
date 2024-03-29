import { HashRouter as Router, Routes, Route } from "react-router-dom";

import Home from "~/Page/Home";
import Upload from "~/Page/Upload";

function MainLayout() {
  return (
    <Router>
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/upload" Component={Upload} />
      </Routes>
    </Router>
  );
}

export default MainLayout;
