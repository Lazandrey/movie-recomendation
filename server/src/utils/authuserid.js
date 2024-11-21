export const authUserId = (id) => {
  const userToken =
    process.env.USER_AUTH_KEY1 +
    id.slice(0, 5) +
    process.env.USER_AUTH_KEY2 +
    id.slice(6) +
    process.env.USER_AUTH_KEY3;

  return userToken;
};

export const reAuthUserId = (id) => {
  const user = id.slice(4, 10) + id.slice(16, id.length - 5);

  return user;
};
