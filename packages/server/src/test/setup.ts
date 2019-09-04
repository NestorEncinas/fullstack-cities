import { testConn } from "./utils/testConn";

testConn(true).then(() => {
  process.exit();
});
