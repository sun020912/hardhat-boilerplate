import React from "react";
import { Stack } from "@mui/material";

import { KeyValuePair } from "../../components/key-value-pair/key-value-pair";

import { useMhtContractContext } from "./hooks/use-mht-contract-context";

// ----------------------------------------------------------------------

export function ContractInfoSection() {
  const { name, symbol, balance } = useMhtContractContext();

  return (
    <Stack direction="column" spacing={0.5}>
      <KeyValuePair title="Token name" content={name} />
      <KeyValuePair title="Token symbol" content={symbol} />
      <KeyValuePair title="Your Balance" content={balance?.toString()} />
    </Stack>
  );
}
