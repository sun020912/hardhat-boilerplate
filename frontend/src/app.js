import React from "react";

import { NetworkIdGuard } from "./network/guards/network-id-guard";
import { ConnectionGuard } from "./network/guards/connection-guard";
import { WalletGuard } from "./network/guards/wallet-guard";
import { NetworkProvider } from "./network/context/network-provider";
import { SimpleLayout } from "./layouts/simple/simple-layout";
import { MthContractOverallView } from "./features/mht-contract/views/mht-contract-overall-view";

// ----------------------------------------------------------------------

export default function App() {
  return (
    <SimpleLayout>
      <WalletGuard>
        <NetworkProvider>
          <ConnectionGuard>
            <NetworkIdGuard>
              <MthContractOverallView />
            </NetworkIdGuard>
          </ConnectionGuard>
        </NetworkProvider>
      </WalletGuard>
    </SimpleLayout>
  );
}
