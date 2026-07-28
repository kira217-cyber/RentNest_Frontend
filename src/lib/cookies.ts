import Cookies from "js-cookie";

export const TOKEN_COOKIE_NAME = "rentnest_token";

export function getTokenCookie() {
  return Cookies.get(TOKEN_COOKIE_NAME) ?? null;
}

export function setTokenCookie(token: string) {
  Cookies.set(TOKEN_COOKIE_NAME, token, {
    expires: 7,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
}

export function removeTokenCookie() {
  Cookies.remove(TOKEN_COOKIE_NAME);
}
