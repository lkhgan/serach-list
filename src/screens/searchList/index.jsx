import axios from "axios";
import { useEffect, useState } from "react";
import { List } from "./list";
import { SearchPanel } from "./searchPanel";
import qs from "qs";
import { cleanOject } from "../utils";

const apiUrl = import.meta.env.VITE_APP_API_URL;

export const ProjectListScreen = () => {
  const [param, setParam] = useState({ name: "", personId: "" });
  const [list, setList] = useState([]);
  const [users, setUsers] = useState([]);
  //get list
  useEffect(() => {
    axios
      //   .get(`${apiUrl}/projects?name=${param.name}&personId=${param.personId}`)
      .get(`${apiUrl}/projects?${qs.stringify(cleanOject(param))}`)
      .then(async (response) => {
        console.log(response);
        if (response.statusText === "OK") {
          setList(await response.data);
        }
      });
  }, [param]);
  //get managers
  useEffect(() => {
    axios.get(`${apiUrl}/users`).then(async (response) => {
      console.log(response);
      if (response.statusText === "OK") {
        setUsers(await response.data);
      }
    });
  }, []);
  return (
    <div>
      <SearchPanel param={param} setParam={setParam} users={users} />
      <List users={users} list={list} />
    </div>
  );
};
