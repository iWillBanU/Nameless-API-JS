require('dotenv').config();

let Nameless = require(".");
let Client = new Nameless.Client(process.env.API_URL);

Client.register("Notch", "069a79f444e94726a5befca90e38aaf5", "test@exaple.com");
