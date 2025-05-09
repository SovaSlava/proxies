### Eternal Storage

#### How it works?

Eternal Storage is a design pattern used in Solidity to separate the storage logic from the contract’s business logic. It allows you to upgrade your contract without losing data stored in the contract storage. In this proxy does not uses delegatecall.

All implementaions keep data in separate storage contract.


Disadvantages:

1. Clumsy syntax for state variables.

2. It works directly for simple values and arrays but it does not work in a simple, generic way for mapping and struct values.

3. Not easy to see at a glance what state variables exist because they are not declared together anywhere.


Links:

https://www.ethereum-blockchain-developer.com/advanced-mini-courses/solidity-proxy-pattern-and-upgradable-smart-contracts/eternal-storage

https://medium.com/@bansaltushar014/design-pattern-part-1-eternal-storage-722cd16bfc52

https://fravoll.github.io/solidity-patterns/eternal_storage.html