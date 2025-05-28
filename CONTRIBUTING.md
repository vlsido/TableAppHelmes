# Introduction

This document outlines the project's conventions for naming, formatting, testing, and other development practices. 

Following these guidelines helps ensure consistency and maintainability across the codebase.

# Test Conventions

These are the conventions for tests.

## Test Stack

• Jest  
• React Testing Library

## General

• Tests must use the "data-testid" property

## Naming

All "data-testid" names are upper case. Words are separated by underline "_".

### Common components

```
{FILE_NAME}.{PARENT_COMPONENT}.{COMPONENT_SPECIFICATION}:{TYPE}
```

e.g. ORDERS.CONTAINER:VIEW  
e.g. ORDERS.CONTAINER.HEADER:VIEW  
e.g. ORDERS.CONTAINER.HEADER.REFRESH:BUTTON  
e.g. ORDERS_TABLE.CONTAINER.ORDER_LIST:LIST

### Lists

```
{FILE}.{PARENT_COMPONENT}.{COMPONENT_SPECIFICATION}:TYPE:{ITEM-${index}}
```

e.g. ORDERS_TABLE.CONTAINER.ORDER_LIST:ITEM-3 (Zero based index)


