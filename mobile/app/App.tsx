import React from "react";
import { Provider as PaperProvider } from "react-native-paper";
import { Provider as StoreProvider } from "react-redux";
import { store } from "./data/stores/store";
import Main from "./ui/pages/Main/Main";

const App: React.FC = () => {
  return (
    <PaperProvider>
      <StoreProvider store={store}>
        <Main />
      </StoreProvider>
    </PaperProvider>
  );
};

export default App;
