const isTokenExpire = (token: string) => {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
      .join(""),
  );

  const parseToken = JSON.parse(jsonPayload);

  const currentDate = new Date();
  const tokenExpirationDate = new Date(parseToken.exp * 1000);

  return currentDate > tokenExpirationDate;
};

export default isTokenExpire;
