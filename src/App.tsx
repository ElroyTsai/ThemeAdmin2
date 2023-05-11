import { useEffect } from "react";
import { getSetting } from "~/core/slices";
import store from "~/core/store";
import Layout from "./layout";

const App = () => {
  useEffect(() => {
    store.dispatch(getSetting);
  }, []);

  return <Layout />;
};

export default App;
