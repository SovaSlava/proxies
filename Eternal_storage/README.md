### Eternal Storage

#### How it works?

All implementaions and proxy contract consist of mapping block

```
    mapping(bytes32 => uint256) internal uIntStorage;
    mapping(bytes32 => uint256[]) internal uIntArrayStorage;
    mapping(bytes32 => string) internal stringStorage;
    mapping(bytes32 => address) internal addressStorage;
    mapping(bytes32 => bytes) internal bytesStorage;
```

Disadvantages:

1. Clumsy syntax for state variables.

2. It works directly for simple values and arrays but it does not work in a simple, generic way for mapping and struct values.

3. Not easy to see at a glance what state variables exist because they are not declared together anywhere.