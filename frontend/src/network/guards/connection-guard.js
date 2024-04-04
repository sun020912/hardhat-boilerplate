import React, { useCallback, useMemo, useState } from "react";
import { Alert, AlertTitle, Stack } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import { useNetworkContext } from "../hooks/use-network-context";

// ----------------------------------------------------------------------

export function ConnectionGuard({ children }) {
  const { address, connect } = useNetworkContext();

  const [isLoading, setIsLoading] = useState(false);

  const handleConnect = useCallback(async () => {
    setIsLoading(true);
    await connect();
    setIsLoading(false);
  }, [connect]);

  const guard = useMemo(
    () => (
      <Stack direction="column" spacing={2} my={4}>
        <Alert severity="info">
          <AlertTitle>Connect</AlertTitle>
          Connect to wallet to continue!
        </Alert>

        <LoadingButton
          variant="contained"
          loading={isLoading}
          fullWidth
          onClick={handleConnect}
        >
          Connect
        </LoadingButton>
      </Stack>
    ),
    [handleConnect, isLoading]
  );

  if (!address) return guard;

  return <>{children}</>;
}
