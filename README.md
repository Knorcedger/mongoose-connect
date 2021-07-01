# mongoose-connect

A module to avoid mongoose connect boilerplate. Helps to easily connect to a mongoose database and handle error, reconnections etc.

### Installation

```
npm install @knorcedger/mongoose-connect
```

### Usage

```javascript
const mongoose = require("mongoose");
const mongooseConnect = require("@knorcedger/mongoose-connect");

const dbUrl = "mongodb://user:password@host:port/database";

mongooseConnect(mongoose, dbUrl);
```
