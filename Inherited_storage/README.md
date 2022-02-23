### Inherited Storage

#### How it works?

In first deploy, proxy and implement contract inherit storage1 contract. 

In next implements, implement contract should have new storage contract (storage2), which inherit storage1

```
contract Storage1 {
    address imol;
    address proxyOwner;
}

contract Proxy is Storage1 {
    ...
}

contract Impl1 is Storage1 {
    ...
}

// Make new implement contract
contract Storage2 is Storage1 {
    string name; // new var
}
contract Impl2 is Storage2 {
    ...
}
```
