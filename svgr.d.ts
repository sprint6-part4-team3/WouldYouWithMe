/* eslint-disable @typescript-eslint/no-explicit-any */

declare module "*.svg" {
  import { FC, SVGProps } from "react";

  const content: FC<SVGProps<SVGElement>>;
  export default content;
}

declare module "*.svg?url" {
  const content: any; // This line will not trigger the eslint warning
  export default content;
}
