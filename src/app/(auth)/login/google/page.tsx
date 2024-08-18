"use client";

import PageLoading from "@/components/loading";
import GoogleAuth from "@/lib/api/oauth/google-auth";

const Google = () => (
  <div>
    <PageLoading />
    <GoogleAuth />
  </div>
);

export default Google;
