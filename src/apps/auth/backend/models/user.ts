import users from "../data/users.json";
import { User } from "./type";

let userid = users.length;

function getUserByName(username: string): Promise<User> {
  return new Promise((resolve, rejects) => {
    setTimeout(() => {
      const user = users.find((user) => user.name === username);
      if (user) {
        resolve(user);
      }
      if (!user) {
        rejects("dao: user not found");
      }
    }, 500);
  });
}

function insertUser(username: string, password: string): Promise<User> {
  return new Promise((resolve, rejects) => {
    setTimeout(() => {
      const user = users.find((user) => user.name === username);
      if (user) {
        rejects("dao: user already exist");
      }
      const newuser = { id: userid++, name: username, password: password };
      users.push(newuser);
      resolve(newuser);
    }, 500);
  });
}

export default Object.freeze({
  getUserByName: getUserByName,
  insertUser: insertUser,
});
