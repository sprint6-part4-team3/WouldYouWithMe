import Link from "next/link";

import SignInForm from "../_components/signin-form";

export default function Login() {
  return (
    <div className="flex w-full flex-col items-center justify-center px-3 md:px-28 xl:mx-auto xl:w-[520px] xl:px-0">
      <p className="mb-10 font-medium">로그인</p>
      <SignInForm />
      <p className="mt-6">
        아직 계정이 없으신가요?
        <Link href="/signup" className="text-primary underline">
          가입하기
        </Link>
      </p>
    </div>
  );
}
