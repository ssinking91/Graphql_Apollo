// 1. 필요한 모듈들 임포트
import { useState } from "react";
import { useQuery, gql } from "@apollo/client";

import "./components.css";

// 2. 쿼리 작성
const GET_ROLES = gql`
  query GetRoles {
    roles {
      id
    }
  }
`;

const GET_ROLE = gql`
  query GetRole($id: ID!) {
    role(id: $id) {
      id
      requirement
      members {
        id
        last_name
        serve_years
      }
      equipments {
        id
      }
      softwares {
        id
      }
    }
  }
`;

function Roles() {
  // 3. 렌더링될 컨텐츠 id를 저장할 state 지정
  const [contentId, setContentId] = useState("");

  function AsideItems() {
    const roleIcons = {
      developer: "💻",
      designer: "🎨",
      planner: "📝",
    };

    // loading : GraphQL 서버에서 정보를 받아오는 동안 표시
    // error : 요청에 오류가 발생할 시 반환
    // data	: GraphQL 요청대로 받아진 정보
    const { loading, error, data } = useQuery(GET_ROLES);

    if (loading) return <p className="loading">Loading...</p>;
    if (error) return <p className="error">Error :(</p>;

    return (
      <ul>
        {data.roles.map(({ id }) => {
          return (
            <li
              key={id}
              className={"roleItem " + (contentId === "id" ? "on" : "")}
              onClick={() => {
                setContentId(id);
              }}
            >
              <span>{contentId === id ? "🔲" : "⬛"}</span>
              {roleIcons[id]} {id}
            </li>
          );
        })}
      </ul>
    );
  }

  function MainContents() {
    const { loading, error, data } = useQuery(GET_ROLE, {
      variables: { id: contentId },
    });

    if (loading) return <p className="loading">Loading...</p>;
    if (error) return <p className="error">Error :(</p>;
    if (contentId === "") return <div className="roleWrapper">Select Role</div>;

    return (
      <div className="roleWrapper">
        <h2>{data.role.id}</h2>
        <div className="requirement">
          <span>{data.role.requirement}</span> required
        </div>
        <h3>Members</h3>
        <ul>
          {data.role.members.map((member) => {
            return <li key={member.last_name}>{member.last_name}</li>;
          })}
        </ul>
        <h3>Equipments</h3>
        <ul>
          {data.role.equipments.map((equipment) => {
            return <li key={equipment.id}>{equipment.id}</li>;
          })}
        </ul>
        <h3>Softwares</h3>
        {data.role.softwares.map((software) => {
          return <li key={software.id}>{software.id}</li>;
        })}
        <ul></ul>
      </div>
    );
  }

  return (
    <div id="roles" className="component">
      <aside>{AsideItems()}</aside>
      <section className="contents">{MainContents()}</section>
    </div>
  );
}

export default Roles;
