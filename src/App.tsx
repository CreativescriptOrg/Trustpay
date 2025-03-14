import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "jotai";
import TransactionWizard from "./TransactionWizard";
import "./index.css";

// Create a client for react-query
const queryClient = new QueryClient();

function App() {
  return (
    <Provider>
      <QueryClientProvider client={queryClient}>
        <div className="App">
          <TransactionWizard />
        </div>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
