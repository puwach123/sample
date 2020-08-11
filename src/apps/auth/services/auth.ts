import mockapi from "../backend/apis/auth";

export type User = {
  id: number;
  name: string;
  password: string;
};

const TOKEN = "token";
const USER = "user";
const ROLE = "role";

async function login(
  username: string,
  password: string
): Promise<{ token: string; user: User; role: string }> {
  try {
    const payload = await mockapi.login(username, password);
    localStorage.setItem(TOKEN, payload.token);
    localStorage.setItem(USER, JSON.stringify(payload.user));
    localStorage.setItem(ROLE, payload.role);
    return payload;
  } catch (error) {
    throw error;
  }
}

async function logout(): Promise<boolean> {
  return new Promise((resolve, rejects) => {
    setTimeout(async () => {
      localStorage.removeItem(TOKEN);
      localStorage.removeItem(USER);
      localStorage.removeItem(ROLE);
      resolve(true);
    }, 500);
  });
}

async function register(username: string, password: string): Promise<boolean> {
  try {
    const found = await mockapi.register(username, password);
    return found;
  } catch (error) {
    throw error;
  }
}

export default Object.freeze({
  login: login,
  logout: logout,
  register: register,
});
