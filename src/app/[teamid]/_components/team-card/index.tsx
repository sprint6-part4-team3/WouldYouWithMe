export default function TeamCard() {
  return (
    <>
      <div className="m-auto my-24 flex h-64 w-343 items-center justify-between rounded-12 border border-border-primary/10 bg-slate-50/10 px-24 lg:w-696 xl:w-1200">
        <div className="text-20-700">경영관리팀</div>
        <div className="flex gap-20">
          <div>이미지</div>
          <img src="@/public/assets/icons/icon-plus.svg" alt="icon" />
        </div>
      </div>
      {/* Build Error: Failed to compile */}
      {/* Module parse failed: Unexpected token (1:0) */}
      {/* You may need an appropriate loader to handle this file type, 
      currently no loaders are configured to process this file. */}
      {/* Webpack/Next.js는 SVG 파일을 직접 처리할 수가 없다.. 
      모듈로서 처리하려고 했지만 SVG 파일을 이해할 수 없기 때문에 오류 발생? */}

      {/* `yarn add @svgr/webpack` 으로 설치/되어있음 */}
      {/* Next.js 설정 파일 업데이트/되어있음 */}
      {/* SVG 파일을 React 컴포넌트로 사용 */}
      {/* 위와 같은 결과가 나옵니당 Build Error */}

      {/* SVG 파일을 public 폴더에 두고 URL로 사용 */}
      {/* 보이는 대로 아이콘 이미지가 나오지 않음. */}

      {/* SVG 파일을 Base64로 인코딩하여 직접 삽입 */}
      {/* 음... 작은 파일이라면 유용하다.. */}

      {/* loader error 같은데... 모르겠다... */}
      {/* `yarn add @svgr/webpack url-loader` url-loader를 사용하여 SVG 파일 처리 방법도 있음
      SVG를 Data URL로 변환하거나 파일로 출력하는데 유용 패키지 설치라서 음... */}

      {/* storybook에서는 아이콘이 잘 나오는데 웹 페이지에서 불러오면 안나옴요! */}
    </>
  );
}
