# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a Hardhat Ignition module that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat ignition deploy ./ignition/modules/Lock.ts
```
The Scripting on Deployed contract


 ################## Deploying contract ###################
Proposal created: Proposal 1
Voted on proposal: Proposal 1
┌─────────┬──────────────────────────────────────────────┬───────────────────────────────┐
│ (index) │ 0                                            │ Values                        │
├─────────┼──────────────────────────────────────────────┼───────────────────────────────┤
│ 0       │                                              │ 'Proposal 1'                  │
│ 1       │                                              │ 'This is the first proposal.' │
│ 2       │                                              │ 3n                            │
│ 3       │ '0x30307d98d5FC2F6c83541E196FdCE5F38C86d637' │                               │
│ 4       │                                              │ 1n                            │
│ 5       │                                              │ 3n                            │
└─────────┴──────────────────────────────────────────────┴───────────────────────────────┘
All proposals: Result(3) [
  Result(6) [
    'Proposal 1',
    'This is the first proposal.',
    1n,
    Result(1) [ '0x30307d98d5FC2F6c83541E196FdCE5F38C86d637' ],
    3n,
    3n
  ],
  Result(6) [
    'Proposal 1',
    'This is the first proposal.',
    1n,
    Result(1) [ '0x30307d98d5FC2F6c83541E196FdCE5F38C86d637' ],
    3n,
    3n
  ],
  Result(6) [
    'Proposal 1',
    'This is the first proposal.',
    1n,
    Result(1) [ '0x30307d98d5FC2F6c83541E196FdCE5F38C86d637' ],
    3n,
    3n
  ]
]
┌─────────┬──────────────┬───────────────────────────────┬────┬────────────────────────────────────────────────────────────┬────┬────┐
│ (index) │ 0            │ 1                             │ 2  │ 3
    │ 4  │ 5  │
├─────────┼──────────────┼───────────────────────────────┼────┼────────────────────────────────────────────────────────────┼────┼────┤
│ 0       │ 'Proposal 1' │ 'This is the first proposal.' │ 1n │ Result(1) [ '0x30307d98d5FC2F6c83541E196FdCE5F38C86d637' ] │ 3n │ 3n │
│ 1       │ 'Proposal 1' │ 'This is the first proposal.' │ 1n │ Result(1) [ '0x30307d98d5FC2F6c83541E196FdCE5F38C86d637' ] │ 3n │ 3n │
│ 2       │ 'Proposal 1' │ 'This is the first proposal.' │ 1n │ Result(1) [ '0x30307d98d5FC2F6c83541E196FdCE5F38C86d637' ] │ 3n │ 3n │
└─────────┴──────────────┴───────────────────────────────┴────┴────────────────────────────────────────────────────────────┴────┴────┘
