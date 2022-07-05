# Minimal proxy

The minimum proxy is a special factory, which deploy only short contract. This contract transfer all requests to implement contract throung delegate calls, so its has very short code. Each short proxy has own memory.


Useful docs:
* https://blog.openzeppelin.com/deep-dive-into-the-minimal-proxy-contract/
* https://blockchain-academy.hs-mittweida.de/courses/solidity-coding-beginners-to-intermediate/lessons/solidity-11-coding-patterns/topic/factory-clone/
* https://docs.openzeppelin.com/contracts/4.x/api/proxy#Clones