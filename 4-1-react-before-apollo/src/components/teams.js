import { useState } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import "./components.css";

// 팀 목록 받아오기 gql
const GET_TEAMS = gql`
  query GetTeams {
    teams {
      id
      manager
      members {
        id
        first_name
        last_name
        role
      }
    }
  }
`;

// 항목 받아오기 gql
const GET_TEAM = gql`
  query GetTeam($id: ID!) {
    team(id: $id) {
      id
      manager
      office
      extension_number
      mascot
      cleaning_duty
      project
    }
  }
`;

// 삭제 gql
const DELETE_TEAM = gql`
  mutation DeleteTeam($id: ID!) {
    deleteTeam(id: $id) {
      id
    }
  }
`;

// 수정 gql
const EDIT_TEAM = gql`
  mutation EditTeam($id: ID!, $input: PostTeamInput!) {
    editTeam(id: $id, input: $input) {
      id
      manager
      office
      extension_number
      mascot
      cleaning_duty
      project
    }
  }
`;

// 추가 gql
const POST_TEAM = gql`
  mutation PostTeam($input: PostTeamInput!) {
    postTeam(input: $input) {
      id
      manager
      office
      extension_number
      mascot
      cleaning_duty
      project
    }
  }
`;

// 수정된 데이터 다시 로드
let refetchTeams;

function Teams() {
  // state 준비
  const [contentId, setContentId] = useState(0);
  const [inputs, setInputs] = useState({
    manager: "",
    office: "",
    extension_number: "",
    mascot: "",
    cleaning_duty: "",
    project: "",
  });

  // 항목 삭제하기
  function execDeleteTeam() {
    if (window.confirm("이 항목을 삭제하시겠습니까?")) {
      deleteTeam({ variables: { id: contentId } });
    }
  }

  const [deleteTeam] = useMutation(DELETE_TEAM, {
    onCompleted: deleteTeamCompleted,
  });

  function deleteTeamCompleted(data) {
    console.log(data.deleteTeam);
    alert(`${data.deleteTeam.id} 항목이 삭제되었습니다.`);
    refetchTeams();
    setContentId(0);
  }

  //항목 수정하기
  function execEditTeam() {
    editTeam({
      variables: {
        id: contentId,
        input: inputs,
      },
    });
  }
  const [editTeam] = useMutation(EDIT_TEAM, { onCompleted: editTeamCompleted });
  function editTeamCompleted(data) {
    console.log(data.editTeam);
    alert(`${data.editTeam.id} 항목이 수정되었습니다.`);
    refetchTeams();
  }

  // 항목 추가하기
  function execPostTeam() {
    postTeam({
      variables: { input: inputs },
    });
  }

  const [postTeam] = useMutation(POST_TEAM, { onCompleted: postTeamCompleted });

  function postTeamCompleted(data) {
    console.log(data.postTeam);
    alert(`${data.postTeam.id} 항목이 생성되었습니다.`);
    refetchTeams();
    setContentId(0);
  }

  // 팀 목록 받아오기
  function AsideItems() {
    const roleIcons = {
      developer: "💻",
      designer: "🎨",
      planner: "📝",
    };

    const { loading, error, data, refetch } = useQuery(GET_TEAMS);
    refetchTeams = refetch;

    if (loading) return <p className="loading">Loading...</p>;
    if (error) return <p className="error">Error :(</p>;

    return (
      <ul>
        {data.teams.map(({ id, manager, members }) => {
          return (
            <li key={id}>
              <span
                className="teamItemTitle"
                onClick={() => {
                  setContentId(id);
                }}
              >
                Team {id} : {manager}'s
              </span>
              <ul className="teamMembers">
                {members.map(({ id, first_name, last_name, role }) => {
                  return (
                    <li key={id}>
                      {roleIcons[role]} {first_name} {last_name}
                    </li>
                  );
                })}
              </ul>
            </li>
          );
        })}
      </ul>
    );
  }

  // 항목 받아오기
  function MainContents() {
    const { loading, error } = useQuery(GET_TEAM, {
      variables: { id: contentId },
      onCompleted: (data) => {
        if (contentId === 0) {
          setInputs({
            manager: "",
            office: "",
            extension_number: "",
            mascot: "",
            cleaning_duty: "",
            project: "",
          });
        } else {
          setInputs({
            manager: data.team.manager,
            office: data.team.office,
            extension_number: data.team.extension_number,
            mascot: data.team.mascot,
            cleaning_duty: data.team.cleaning_duty,
            project: data.team.project,
          });
        }
      },
    });

    if (loading) return <p className="loading">Loading...</p>;
    if (error) return <p className="error">Error :(</p>;

    function handleChange(e) {
      const { name, value } = e.target;
      setInputs({
        ...inputs,
        [name]: value,
      });
    }

    return (
      <div className="inputContainer">
        <table>
          <tbody>
            {contentId !== 0 && (
              <tr>
                <td>Id</td>
                <td>{contentId}</td>
              </tr>
            )}
            <tr>
              <td>Manager</td>
              <td>
                <input
                  type="text"
                  name="manager"
                  value={inputs.manager}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>Office</td>
              <td>
                <input
                  type="text"
                  name="office"
                  value={inputs.office}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>Extension Number</td>
              <td>
                <input
                  type="text"
                  name="extension_number"
                  value={inputs.extension_number}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>Mascot</td>
              <td>
                <input
                  type="text"
                  name="mascot"
                  value={inputs.mascot}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>Cleaning Duty</td>
              <td>
                <input
                  type="text"
                  name="cleaning_duty"
                  value={inputs.cleaning_duty}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>Project</td>
              <td>
                <input
                  type="text"
                  name="project"
                  value={inputs.project}
                  onChange={handleChange}
                />
              </td>
            </tr>
          </tbody>
        </table>
        {contentId === 0 ? (
          <div className="buttons">
            <button onClick={execPostTeam}>Submit</button>
          </div>
        ) : (
          <div className="buttons">
            <button onClick={execEditTeam}>Modify</button>
            <button onClick={execDeleteTeam}>Delete</button>
            <button
              onClick={() => {
                setContentId(0);
              }}
            >
              New
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div id="teams" className="component">
      <aside>{AsideItems()}</aside>
      <section className="contents">{MainContents()}</section>
    </div>
  );
}

export default Teams;
