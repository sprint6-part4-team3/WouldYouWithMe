"use server";

import { redirect } from "next/navigation";

/**
 *넥스트 redirect 사용할 수 있는 함수입니다.
 서버와 클라이언트 모두 사용가능합니다.
 * @example
 * redirectTo("/login")
 * @author ☯️채종민
 */

const redirectTo = async (url: string) => {
  redirect(url);
};

export default redirectTo;
