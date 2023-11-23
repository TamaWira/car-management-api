type TUser = {
  id: number;
  username: string;
  password: string;
  role: string;
};

const users: TUser[] = [
  { id: 1, username: "superadmin", password: "superadmin", role: "superadmin" },
  { id: 2, username: "admin", password: "admin", role: "admin" },
  { id: 3, username: "bayu", password: "bayu", role: "member" },
];

export default users;
