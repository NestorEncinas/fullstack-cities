import React, { useEffect } from "react";
import { useContext } from "react";

import { UserContext } from "context/userContext";

// import { useEffect } from "react";

import getUserDataFromAccessToken from "libs/getUserDataFromAccessToken";
import { FUCK_HISTORY } from "modules/login/graphql";

const Home: React.FC<FUCK_HISTORY> = ({ history }) => {
  useEffect(() => {
    const user = getUserDataFromAccessToken();
    if (!user) {
      history.push("/login");
    }
    console.log("Home Effect");
  });

  const user = useContext(UserContext);
  console.log("Home page", { user });
  return (
    <div>
      <h2>About</h2>
      {user ? <h2>{JSON.stringify(user, null, 2)}</h2> : <div> No user </div>}
    </div>
  );
};

export default Home;
