import { useContext } from "react";
import { NetworkContext } from "../context/network-context";

// ----------------------------------------------------------------------

export const useNetworkContext = () => {
  const context = useContext(NetworkContext);

  if (!context) {
    throw new Error("useNetworkContext is outside NetworkProvider.");
  }

  return context;
};
