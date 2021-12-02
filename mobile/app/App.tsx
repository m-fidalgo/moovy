import React from "react";
import { Provider } from "react-native-paper";
import Main from "./ui/pages/Main/Main";

const App: React.FC = () => {
  return (
    <Provider>
      <Main />
    </Provider>
  );
};

export default App;
