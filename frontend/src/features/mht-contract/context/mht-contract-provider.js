import { ethers } from "ethers";
import { useCallback, useEffect, useMemo, useReducer, useState } from "react";

import { useNetworkContext } from "../../../network/hooks/use-network-context";
import { RECEIPT_STATUS } from "../../../network/constants";
import TokenArtifact from "../../../contracts/Token.json";
import contractAddress from "../../../contracts/contract-address.json";

import { MhtContractContext } from "./mht-contract-context";

// ----------------------------------------------------------------------

const actionType = {
  initial: "initial",
  update: "update",
};

const initialState = {
  contract: undefined,
  name: undefined,
  symbol: undefined,
  balance: undefined,
};

const reducer = (state, action) => {
  if (action.type === actionType.initial) {
    return {
      constract: action.payload.address,
      name: action.payload.name,
      symbol: action.payload.symbol,
      balance: action.payload.balance,
    };
  }

  if (action.type === actionType.update) {
    return {
      ...state,
      balance: action.payload.balance,
    };
  }

  return state;
};

// ----------------------------------------------------------------------

export function MhtContractProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { address, provider } = useNetworkContext();

  const [mining, setMining] = useState();

  const contract = useMemo(
    () =>
      new ethers.Contract(
        contractAddress.Token,
        TokenArtifact.abi,
        provider.getSigner(0)
      ),
    [provider]
  );

  const initialize = useCallback(async () => {
    try {
      const name = await contract.name();
      const symbol = await contract.symbol();
      const balance = await contract.balanceOf(address);

      dispatch({
        type: actionType.initial,
        payload: {
          contract,
          name,
          symbol,
          balance,
        },
      });
    } catch (error) {
      console.error(error);
    }
  }, [address, contract]);

  const transfer = useCallback(
    async (recipient, amount) => {
      const transaction = await contract.transfer(recipient, amount);
      setMining(transaction.hash);
      const receipt = await transaction.wait();
      setMining();

      if (receipt.status === RECEIPT_STATUS.FAILED) {
        return false;
      }
      return true;
    },
    [contract]
  );

  const memoizedValue = useMemo(
    () => ({
      ...state,
      mining,
      transfer,
    }),
    [mining, state, transfer]
  );

  useEffect(() => {
    initialize();
  }, [initialize]);

  useEffect(() => {
    const interval = setInterval(async () => {
      const balance = await contract.balanceOf(address);
      dispatch({
        type: actionType.update,
        payload: {
          balance,
        },
      });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [address, contract]);

  return (
    <MhtContractContext.Provider value={memoizedValue}>
      {children}
    </MhtContractContext.Provider>
  );
}
