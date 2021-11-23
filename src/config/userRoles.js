const config = module.exports;

const userRoles = (config.userRoles = {
  guest: "Guest",
  member: "Member",
  officer: "Officer",
  manager: "Manager",
});

config.access = {
  guest: [
    userRoles.guest,
    userRoles.member,
    userRoles.officer,
    userRoles.manager,
  ],
  member: [userRoles.member, userRoles.officer, userRoles.manager],
  officer: [userRoles.officer, userRoles.manager],
  manager: [userRoles.manager],
};
