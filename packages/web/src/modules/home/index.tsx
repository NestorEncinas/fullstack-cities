import React from "react";

import { FUCK_HISTORY } from "modules/login/graphql";

const Home: React.FC<FUCK_HISTORY> = ({ user }: any) => {
  return (
    <div>
      <h1> Current logged user : {JSON.stringify(user, null, 2)} </h1>
      <h2>About</h2>
      {/* {user ? <h2>{JSON.stringify(user, null, 2)}</h2> : <div> No user </div>} */}
    </div>
  );
};

export default Home;
