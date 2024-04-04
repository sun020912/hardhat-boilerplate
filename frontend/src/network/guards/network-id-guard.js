import React, { useMemo } from "react";
import { Alert, AlertTitle } from "@mui/material";

import { NETWORK_ID } from "../../config-global";

import { useNetworkContext } from "../hooks/use-network-context";

// ----------------------------------------------------------------------

export function NetworkIdGuard({ children }) {
  const { networkId } = useNetworkContext();

  const guard = useMemo(
    () => (
      <Alert severity="error">
        <AlertTitle>Wrong Network ID</AlertTitle>
        Please select network ID <strong>{NETWORK_ID}</strong> to continue!
      </Alert>
    ),
    []
  );

  if (networkId !== NETWORK_ID) return guard;

  return <>{children}</>;
}
