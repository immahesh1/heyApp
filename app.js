const path = require('path');
const express = require('express');
const app = express();

app.use(express.static(path.join(__dirname,'public')));

const port = process.env.PORT || 4000;
app.listen(port,()=>console.log(`App started on port: ${port}`));