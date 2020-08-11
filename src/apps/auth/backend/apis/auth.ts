import jwt from "jsonwebtoken";

import userDao from "../models/user";
import roleDao from "../models/role";
import { User } from "../models/type";

const JWT_SECRET = "jwtsecret";

async function login(
  username: string,
  password: string
): Promise<{ token: string; user: User; role: string }> {
  return new Promise((resolve, rejects) =>
    setTimeout(async () => {
      try {
        const user: User = await userDao.getUserByName(username);
        if (user.password !== password) {
          throw new Error("api: invalid password");
        }
        const role: string = await roleDao.getRoleByUserName(username);
        const token: string = jwt.sign(
          { id: user.id, username: user.name, role: role },
          JWT_SECRET,
          { expiresIn: 3600 }
        );
        resolve({ token, user, role });
      } catch (error) {
        rejects(error);
      }
    }, 500)
  );
}

function register(username: string, password: string): Promise<boolean> {
  return new Promise((resolve, rejects) => {
    setTimeout(async () => {
      try {
        await userDao.insertUser(username, password);
        await roleDao.assignRoleToUser(username, "user");
        resolve(true);
      } catch (error) {
        rejects(error);
      }
    }, 500);
  });
}

export default Object.freeze({
  login: login,
  register: register,
});
