import React, { useMemo } from "react";
import { Alert, AlertTitle, Button, Stack } from "@mui/material";

// ----------------------------------------------------------------------

export function WalletGuard({ children }) {
  const guard = useMemo(
    () => (
      <Stack direction="column" spacing={2} width="100%">
        <Alert severity="error">
          <AlertTitle>No Wallet Detected</AlertTitle>
          No Ethereum wallet was detected. Please install{" "}
          <strong>Metamask</strong> to continue!
        </Alert>

        <Button variant="contained" href="http://metamask.io" target="blank">
          Install Metamask
        </Button>
      </Stack>
    ),
    []
  );

  if (!window.ethereum) return guard;

  return <>{children}</>;
}
