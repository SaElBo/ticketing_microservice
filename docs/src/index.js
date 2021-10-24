const express = require("express");
const app = express();
const swaggerUi = require("swagger-ui-express");


var options = {
  swaggerOptions: {
    urls: [ {

      url : "https://ticketing.dev/api/users/auth-docs.json",
      name : "Auth"
    }
  ],
  },
};
app.use("/api/docs/api-docs", swaggerUi.serve, swaggerUi.setup(null, options));


app.listen(3000, () => {
  console.log('DOCS service listening on port 3000')
})
