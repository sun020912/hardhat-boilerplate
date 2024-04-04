import { Alert, Button, Stack, TextField } from "@mui/material";
import { useCallback, useMemo, useState } from "react";

import { useNetworkContext } from "../../network/hooks/use-network-context";

import { useMhtContractContext } from "./hooks/use-mht-contract-context";
import { TRANSACTION_ERROR_CODE } from "../../network/constants";

// ----------------------------------------------------------------------

export function TransferSection() {
  const { transfer, mining, balance } = useMhtContractContext();
  const { address } = useNetworkContext();

  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const isDisableTransfer = useMemo(() => {
    if (isLoading) return true;
    if (!amount || amount < 0) return true;
    if (!address) return true;
    if (parseInt(balance) < amount) return true;
    return false;
  }, [address, amount, balance, isLoading]);

  const handleTransfer = useCallback(async () => {
    try {
      setError();
      setIsLoading(true);

      const result = await transfer(recipient, amount);

      if (!result) {
        setError("Transaction failed!");
      } else {
        setRecipient("");
        setAmount("");
      }
    } catch (error) {
      if (error.code === TRANSACTION_ERROR_CODE.ACTION_REJECTED) {
        return;
      }
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }, [amount, recipient, transfer]);

  return (
    <Stack direction="column" spacing={2}>
      {error && (
        <Alert
          severity="error"
          sx={{ overflow: "hidden", maxHeight: "6rem" }}
          onClose={() => {
            setError();
          }}
        >
          {error}
        </Alert>
      )}

      {mining && <Alert severity="info">Mining... {mining}</Alert>}

      <TextField disabled label="From address" value={address} fullWidth />

      <TextField
        disabled={isLoading}
        label="To address"
        value={recipient}
        fullWidth
        onChange={(e) => setRecipient(e.target.value)}
      />

      <TextField
        disabled={isLoading}
        label="Amount of MST"
        value={amount}
        fullWidth
        type="number"
        onChange={(e) => setAmount(e.target.value)}
      />

      <Button
        disabled={isDisableTransfer}
        variant="contained"
        onClick={handleTransfer}
      >
        Transfer
      </Button>
    </Stack>
  );
}
