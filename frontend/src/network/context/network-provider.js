import { useCallback, useEffect, useMemo, useReducer } from "react";
import { ethers } from "ethers";

import { NetworkContext } from "./network-context";

// ----------------------------------------------------------------------

const actionType = {
  initial: "initial",
  accountsChanged: "accountsChanged",
  chainChanged: "chainChanged",
};

const initialState = {
  address: undefined,
  provider: undefined,
  networkId: undefined,
};

const reducer = (state, action) => {
  if (action.type === actionType.initial) {
    return {
      address: action.payload.address,
      provider: action.payload.provider,
      networkId: action.payload.networkId,
    };
  }

  if (action.type === actionType.accountsChanged) {
    return {
      ...state,
      address: action.payload.address,
    };
  }

  if (action.type === actionType.chainChanged) {
    return {
      ...state,
      networkId: action.payload.networkId,
    };
  }

  return state;
};

// ----------------------------------------------------------------------

export function NetworkProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const provider = useMemo(
    () => new ethers.providers.Web3Provider(window.ethereum),
    []
  );

  const connect = useCallback(async () => {
    const [address] = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    const networkId = parseInt(window.ethereum.networkVersion, 10);

    dispatch({
      type: actionType.initial,
      payload: {
        address,
        provider,
        networkId,
      },
    });
  }, [provider]);

  const memoizedValue = useMemo(
    () => ({
      ...state,
      connect,
    }),
    [connect, state]
  );

  useEffect(() => {
    window.ethereum.on("accountsChanged", ([newAddress]) => {
      dispatch({
        type: actionType.accountsChanged,
        payload: { address: newAddress },
      });
    });

    window.ethereum.on("chainChanged", (hexNetworkId) => {
      dispatch({
        type: actionType.chainChanged,
        payload: { networkId: parseInt(hexNetworkId) },
      });
    });
  });

  return (
    <NetworkContext.Provider value={memoizedValue}>
      {children}
    </NetworkContext.Provider>
  );
}
