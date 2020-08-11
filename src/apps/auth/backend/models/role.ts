import roles from "../data/roles.json";
// import perms from "../data/perms.json";

// let roleid = roles.length;
// let permid = perms.length;

function getRoleByUserName(username: string): Promise<string> {
  return new Promise((resolve, rejects) => {
    setTimeout(() => {
      const role = roles.find((role) =>
        role.users.some((user) => user === username)
      );
      if (role) {
        resolve(role.role);
      }
      if (!role) {
        rejects("dao: role not found");
      }
    }, 500);
  });
}

function assignRoleToUser(username: string, role: string): Promise<string> {
  return new Promise((resolve, rejects) => {
    setTimeout(() => {
      const found = roles.find((r) => r.role === role);
      if (!found) {
        rejects("dao: role not found");
      }
      if (found) {
        found.users.push(username);
        resolve(role);
      }
    }, 500);
  });
}

export default Object.freeze({
  getRoleByUserName: getRoleByUserName,
  assignRoleToUser: assignRoleToUser,
});
