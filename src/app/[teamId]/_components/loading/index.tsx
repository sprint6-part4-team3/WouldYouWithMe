import Lottie from "lottie-react";

import { LoadingSpinner } from "@/public/assets/icons";
import TeamLoading from "@/public/assets/lotties/team-loading.json";

const TeamPageLoading = () => (
  <div className="mt-50 flex flex-col items-center justify-center">
    <Lottie
      className="size-1/3 h-auto min-w-250 max-w-500"
      animationData={TeamLoading}
    />
    <div className="m-auto flex items-center justify-center gap-10">
      <div>Loading</div>
      <LoadingSpinner width={30} height={30} />
    </div>
  </div>
);

export default TeamPageLoading;
