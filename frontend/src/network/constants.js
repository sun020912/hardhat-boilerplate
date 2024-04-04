export const RECEIPT_STATUS = {
  FAILED: 0,
  SUCCESSFUL: 1,
};

export const TRANSACTION_ERROR_CODE = {
  ACTION_REJECTED: "ACTION_REJECTED",
};

export const NETWORKS = [
  {
    name: "mainnet",
    chain: "ETH",
    chainId: "1",
    networkId: "1",
    type: "Production",
  },
  {
    name: "goerli",
    chain: "ETH",
    chainId: "5",
    networkId: "5",
    type: "Test",
  },
  {
    name: "sepolia",
    chain: "ETH",
    chainId: "11155111",
    networkId: "11155111",
    type: "Test",
  },
  {
    name: "dev",
    chain: "ETH",
    chainId: "2018",
    networkId: "2018",
    type: "Development",
  },
  {
    name: "classic",
    chain: "ETH",
    chainId: "61",
    networkId: "1",
    type: "Production",
  },
  {
    name: "mordor",
    chain: "ETH",
    chainId: "63",
    networkId: "7",
    type: "Test",
  },
  {
    name: "kotti",
    chain: "ETH",
    chainId: "6",
    networkId: "6",
    type: "Test",
  },
  {
    name: "astor",
    chain: "ETH",
    chainId: "212",
    networkId: "212",
    type: "Test",
  },
];
