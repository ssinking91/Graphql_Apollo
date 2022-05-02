import "./App.css";
import React, { useState } from "react";

// ApolloClient 모듈 임포트
import { ApolloProvider } from "@apollo/client";
import { ApolloClient, InMemoryCache } from "@apollo/client";

import Roles from "./components/roles";
import Teams from "./components/teams";
import People from "./components/people";

// client : GraphQL 서버로와 정보를 주고받을 ApolloClient 객체
// uri :	GraphQL 서버의 주소
// cache :	InMemoryCache를 통한 캐시 관리
const client = new ApolloClient({
  uri: "http://localhost:4000",
  cache: new InMemoryCache(),
});

function App() {
  const [menu, setMenu] = useState("Roles");

  let mainComp = {
    Roles: <Roles />,
    Teams: <Teams />,
    People: <People />,
  };

  function NavMenus() {
    return ["Roles", "Teams", "People"].map((_menu, _key) => {
      return (
        <li
          key={_key}
          className={menu === _menu ? "on" : ""}
          onClick={() => {
            setMenu(_menu);
          }}
        >
          {_menu}
        </li>
      );
    });
  }

  // 내부 요소들을 ApolloProvider 로 감싸준다.
  return (
    <div className="App">
      <ApolloProvider client={client}>
        <header className="App-header">
          <h1>Company Management</h1>
          <nav>
            <ul>{NavMenus()}</ul>
          </nav>
        </header>
        <main>{mainComp[menu]}</main>
      </ApolloProvider>
    </div>
  );
}

export default App;
