// Cannot find module './icon-gear.svg' or its corresponding type declarations.
// icons/index.ts에서 위와 같은 오류가 떠서 추가했습니다.
declare module "*.svg" {
  const content: string;
  export default content;
}
