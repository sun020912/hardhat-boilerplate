import { Divider, Stack } from "@mui/material";
import { MhtContractProvider } from "../context/mht-contract-provider";
import { ContractInfoSection } from "../contract-info-section";
import { TransferSection } from "../transfer-section";

// ----------------------------------------------------------------------

export function MthContractOverallView() {
  return (
    <MhtContractProvider>
      <Stack direction="column" spacing={3}>
        <ContractInfoSection />

        <Divider />

        <TransferSection />
      </Stack>
    </MhtContractProvider>
  );
}
