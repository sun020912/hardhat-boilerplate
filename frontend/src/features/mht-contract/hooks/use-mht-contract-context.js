import { useContext } from "react";
import { MhtContractContext } from "../context/mht-contract-context";

// ----------------------------------------------------------------------

export const useMhtContractContext = () => {
  const context = useContext(MhtContractContext);

  if (!context) {
    throw new Error("useMhtContractContext is outside MhtContractProvider.");
  }

  return context;
};
