const moment = require("moment");

const tete = new Date()
  .toISOString()
  .slice(0, 19)
  .replace("T", " ");

const paco = moment(new Date())
  .add("30", "m")
  .format("YYYY-MM-DD HH:mm:ss");
console.log(tete);
console.log(paco);
