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

Disadvantages:

1. New implementation contracts needs to inherit storage contracts that may contain many state variables that they don’t use.

2. This pattern become tightly coupled to specific proxy contracts and facets and cannot be used by other proxy contracts and facets that declare different state variables.