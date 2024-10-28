if (!self.define) {
  let s,
    e = {};
  const a = (a, i) => (
    (a = new URL(a + ".js", i).href),
    e[a] ||
      new Promise((e) => {
        if ("document" in self) {
          const s = document.createElement("script");
          (s.src = a), (s.onload = e), document.head.appendChild(s);
        } else (s = a), importScripts(a), e();
      }).then(() => {
        let s = e[a];
        if (!s) throw new Error(`Module ${a} didn’t register its module`);
        return s;
      })
  );
  self.define = (i, n) => {
    const c =
      s ||
      ("document" in self ? document.currentScript.src : "") ||
      location.href;
    if (e[c]) return;
    let t = {};
    const d = (s) => a(s, c),
      r = { module: { uri: c }, exports: t, require: d };
    e[c] = Promise.all(i.map((s) => r[s] || d(s))).then((s) => (n(...s), t));
  };
}
define(["./workbox-92923e46"], function (s) {
  "use strict";
  importScripts(),
    self.skipWaiting(),
    s.clientsClaim(),
    s.precacheAndRoute(
      [
        {
          url: "/_next/app-build-manifest.json",
          revision: "d2535dab6508460bbc83e2b35164a0be",
        },
        {
          url: "/_next/static/ZYYnDpTH2gdH9SVBvPNYY/_buildManifest.js",
          revision: "44c4af6f9aa1b82710bc76db2b91e494",
        },
        {
          url: "/_next/static/ZYYnDpTH2gdH9SVBvPNYY/_ssgManifest.js",
          revision: "b6652df95db52feb4daf4eca35380933",
        },
        {
          url: "/_next/static/chunks/2017-dc538bbb3b74c0f4.js",
          revision: "ZYYnDpTH2gdH9SVBvPNYY",
        },
        {
          url: "/_next/static/chunks/2057-7425eae0f5aa40ca.js",
          revision: "ZYYnDpTH2gdH9SVBvPNYY",
        },
        {
          url: "/_next/static/chunks/2104-8779a06a691f4de6.js",
          revision: "ZYYnDpTH2gdH9SVBvPNYY",
        },
        {
          url: "/_next/static/chunks/231-cec88216db293875.js",
          revision: "ZYYnDpTH2gdH9SVBvPNYY",
        },
        {
          url: "/_next/static/chunks/2654-f4ee63c88350a647.js",
          revision: "ZYYnDpTH2gdH9SVBvPNYY",
        },
        {
          url: "/_next/static/chunks/2996-cbb3ad40d95cd638.js",
          revision: "ZYYnDpTH2gdH9SVBvPNYY",
        },
        {
          url: "/_next/static/chunks/3393-6f4c6335dd234657.js",
          revision: "ZYYnDpTH2gdH9SVBvPNYY",
        },
        {
          url: "/_next/static/chunks/4203-82629944d59eb362.js",
          revision: "ZYYnDpTH2gdH9SVBvPNYY",
        },
        {
          url: "/_next/static/chunks/4277-4a2a756209088112.js",
          revision: "ZYYnDpTH2gdH9SVBvPNYY",
        },
        {
          url: "/_next/static/chunks/4916-eb93cb5063121d48.js",
          revision: "ZYYnDpTH2gdH9SVBvPNYY",
        },
        {
          url: "/_next/static/chunks/602dbae6-e10eec12baab5e7c.js",
          revision: "ZYYnDpTH2gdH9SVBvPNYY",
        },
        {
          url: "/_next/static/chunks/6351-dde6a33ac56fea91.js",
          revision: "ZYYnDpTH2gdH9SVBvPNYY",
        },
        {
          url: "/_next/static/chunks/6648-c995c2a165188bd8.js",
          revision: "ZYYnDpTH2gdH9SVBvPNYY",
        },
        {
          url: "/_next/static/chunks/7010-302cbef927ea4efb.js",
          revision: "ZYYnDpTH2gdH9SVBvPNYY",
        },
        {
          url: "/_next/static/chunks/7023-b657d52b85bbb8ce.js",
          revision: "ZYYnDpTH2gdH9SVBvPNYY",
        },
        {
          url: "/_next/static/chunks/8740-30bbb34c4b667094.js",
          revision: "ZYYnDpTH2gdH9SVBvPNYY",
        },
        {
          url: "/_next/static/chunks/876-1ca9b44d923cc240.js",
          revision: "ZYYnDpTH2gdH9SVBvPNYY",
        },
        {
          url: "/_next/static/chunks/8958-de454b06e1ffeb7f.js",
          revision: "ZYYnDpTH2gdH9SVBvPNYY",
        },
        {
          url: "/_next/static/chunks/902-604de7e800b548f8.js",
          revision: "ZYYnDpTH2gdH9SVBvPNYY",
        },
        {
          url: "/_next/static/chunks/9035-7770a179ebfe0d6a.js",
          revision: "ZYYnDpTH2gdH9SVBvPNYY",
        },
        {
          url: "/_next/static/chunks/9303-3c78704e2350ea5e.js",
          revision: "ZYYnDpTH2gdH9SVBvPNYY",
        },
        {
          url: "/_next/static/chunks/app/(auth)/login/google/page-fb92807cbf29bf14.js",
          revision: "ZYYnDpTH2gdH9SVBvPNYY",
        },
        {
          url: "/_next/static/chunks/app/(auth)/login/kakao/page-1836d5cfe4e90c96.js",
          revision: "ZYYnDpTH2gdH9SVBvPNYY",
        },
        {
          url: "/_next/static/chunks/app/(auth)/login/layout-23f9efc07795f75a.js",
          revision: "ZYYnDpTH2gdH9SVBvPNYY",
        },
        {
          url: "/_next/static/chunks/app/(auth)/login/page-93191b48bd1f9e00.js",
          revision: "ZYYnDpTH2gdH9SVBvPNYY",
        },
        {
          url: "/_next/static/chunks/app/(auth)/reset-password/layout-2b392f586644b9a1.js",
          revision: "ZYYnDpTH2gdH9SVBvPNYY",
        },
        {
          url: "/_next/static/chunks/app/(auth)/reset-password/page-5e6ba144cb82b652.js",
          revision: "ZYYnDpTH2gdH9SVBvPNYY",
        },
        {
          url: "/_next/static/chunks/app/(auth)/sign-up/layout-7ab8fa637bffdb6f.js",
          revision: "ZYYnDpTH2gdH9SVBvPNYY",
        },
        {
          url: "/_next/static/chunks/app/(auth)/sign-up/page-482be339c57b64b9.js",
          revision: "ZYYnDpTH2gdH9SVBvPNYY",
        },
        {
          url: "/_next/static/chunks/app/(auth)/user-setting/layout-9d7c093700a7ece9.js",
          revision: "ZYYnDpTH2gdH9SVBvPNYY",
        },
        {
          url: "/_next/static/chunks/app/(auth)/user-setting/page-cf4e6f8441f9a923.js",
          revision: "ZYYnDpTH2gdH9SVBvPNYY",
        },
        {
          url: "/_next/static/chunks/app/(board)/board/%5BboardId%5D/page-b3ff015c132cb18d.js",
          revision: "ZYYnDpTH2gdH9SVBvPNYY",
        },
        {
          url: "/_next/static/chunks/app/(board)/boards/page-257fd747e410a108.js",
          revision: "ZYYnDpTH2gdH9SVBvPNYY",
        },
        {
          url: "/_next/static/chunks/app/(board)/layout-b90db6b85c00bb59.js",
          revision: "ZYYnDpTH2gdH9SVBvPNYY",
        },
        {
          url: "/_next/static/chunks/app/(board-management)/board/%5BboardId%5D/edit/page-125ee7a46f90d088.js",
          revision: "ZYYnDpTH2gdH9SVBvPNYY",
        },
        {
          url: "/_next/static/chunks/app/(board-management)/create-board/page-d30c55364e48e122.js",
          revision: "ZYYnDpTH2gdH9SVBvPNYY",
        },
        {
          url: "/_next/static/chunks/app/(board-management)/layout-4ef32f4cb2569eaa.js",
          revision: "ZYYnDpTH2gdH9SVBvPNYY",
        },
        {
          url: "/_next/static/chunks/app/(list)/team/%5BteamId%5D/task-lists/%5BlistId%5D/@side/(.)add-task/layout-aaa52b6358aa01fa.js",
          revision: "ZYYnDpTH2gdH9SVBvPNYY",
        },
        {
          url: "/_next/static/chunks/app/(list)/team/%5BteamId%5D/task-lists/%5BlistId%5D/@side/(.)add-task/page-dec765b142877841.js",
          revision: "ZYYnDpTH2gdH9SVBvPNYY",
        },
        {
          url: "/_next/static/chunks/app/(list)/team/%5BteamId%5D/task-lists/%5BlistId%5D/@side/(.)task-detail/%5Bid%5D/page-6eac76da73aba583.js",
          revision: "ZYYnDpTH2gdH9SVBvPNYY",
        },
        {
          url: "/_next/static/chunks/app/(list)/team/%5BteamId%5D/task-lists/%5BlistId%5D/@side/default-30a4346ab7e9b203.js",
          revision: "ZYYnDpTH2gdH9SVBvPNYY",
        },
        {
          url: "/_next/static/chunks/app/(list)/team/%5BteamId%5D/task-lists/%5BlistId%5D/add-task/page-55183a275d283e34.js",
          revision: "ZYYnDpTH2gdH9SVBvPNYY",
        },
        {
          url: "/_next/static/chunks/app/(list)/team/%5BteamId%5D/task-lists/%5BlistId%5D/layout-f61760765408582f.js",
          revision: "ZYYnDpTH2gdH9SVBvPNYY",
        },
        {
          url: "/_next/static/chunks/app/(list)/team/%5BteamId%5D/task-lists/%5BlistId%5D/page-ec5699d95495ba0d.js",
          revision: "ZYYnDpTH2gdH9SVBvPNYY",
        },
        {
          url: "/_next/static/chunks/app/(list)/team/%5BteamId%5D/task-lists/%5BlistId%5D/task-detail/%5Bid%5D/page-eabeec6996aea6cb.js",
          revision: "ZYYnDpTH2gdH9SVBvPNYY",
        },
        {
          url: "/_next/static/chunks/app/(team-management)/create-team/page-49533d7de95da984.js",
          revision: "ZYYnDpTH2gdH9SVBvPNYY",
        },
        {
          url: "/_next/static/chunks/app/(team-management)/join-team/page-bfb46ad5406dfe86.js",
          revision: "ZYYnDpTH2gdH9SVBvPNYY",
        },
        {
          url: "/_next/static/chunks/app/(team-management)/layout-be1901507177104f.js",
          revision: "ZYYnDpTH2gdH9SVBvPNYY",
        },
        {
          url: "/_next/static/chunks/app/(team-management)/team/%5BteamId%5D/edit/page-61573c437f1ce1cf.js",
          revision: "ZYYnDpTH2gdH9SVBvPNYY",
        },
        {
          url: "/_next/static/chunks/app/_not-found/page-78d771ea441d7371.js",
          revision: "ZYYnDpTH2gdH9SVBvPNYY",
        },
        {
          url: "/_next/static/chunks/app/error-60f5b879ba954661.js",
          revision: "ZYYnDpTH2gdH9SVBvPNYY",
        },
        {
          url: "/_next/static/chunks/app/layout-062c489b94ab6c6e.js",
          revision: "ZYYnDpTH2gdH9SVBvPNYY",
        },
        {
          url: "/_next/static/chunks/app/my-teams/layout-ee2def1cff37fd82.js",
          revision: "ZYYnDpTH2gdH9SVBvPNYY",
        },
        {
          url: "/_next/static/chunks/app/my-teams/loading-101094b54ac1c0d7.js",
          revision: "ZYYnDpTH2gdH9SVBvPNYY",
        },
        {
          url: "/_next/static/chunks/app/my-teams/page-eb97ba9736409c76.js",
          revision: "ZYYnDpTH2gdH9SVBvPNYY",
        },
        {
          url: "/_next/static/chunks/app/not-found-054417b73001ad63.js",
          revision: "ZYYnDpTH2gdH9SVBvPNYY",
        },
        {
          url: "/_next/static/chunks/app/page-3673639a0bb20b4b.js",
          revision: "ZYYnDpTH2gdH9SVBvPNYY",
        },
        {
          url: "/_next/static/chunks/app/team-empty/page-d13f04ea8632acc6.js",
          revision: "ZYYnDpTH2gdH9SVBvPNYY",
        },
        {
          url: "/_next/static/chunks/app/team/%5BteamId%5D/layout-0359ecc28f698c78.js",
          revision: "ZYYnDpTH2gdH9SVBvPNYY",
        },
        {
          url: "/_next/static/chunks/app/team/%5BteamId%5D/loading-a35bf7d9a26b4cfc.js",
          revision: "ZYYnDpTH2gdH9SVBvPNYY",
        },
        {
          url: "/_next/static/chunks/app/team/%5BteamId%5D/page-71b13bddd1e394d3.js",
          revision: "ZYYnDpTH2gdH9SVBvPNYY",
        },
        {
          url: "/_next/static/chunks/app/user/history/layout-74130d9ad7065c42.js",
          revision: "ZYYnDpTH2gdH9SVBvPNYY",
        },
        {
          url: "/_next/static/chunks/app/user/history/page-0fc7f1177a77498e.js",
          revision: "ZYYnDpTH2gdH9SVBvPNYY",
        },
        {
          url: "/_next/static/chunks/b536a0f1-f0fdc4d4c2984add.js",
          revision: "ZYYnDpTH2gdH9SVBvPNYY",
        },
        {
          url: "/_next/static/chunks/bc9e92e6-cab7162354eb61c5.js",
          revision: "ZYYnDpTH2gdH9SVBvPNYY",
        },
        {
          url: "/_next/static/chunks/dc112a36-dd72e56818520f67.js",
          revision: "ZYYnDpTH2gdH9SVBvPNYY",
        },
        {
          url: "/_next/static/chunks/fd9d1056-427b1a560dfe421c.js",
          revision: "ZYYnDpTH2gdH9SVBvPNYY",
        },
        {
          url: "/_next/static/chunks/framework-56dfd39ab9a08705.js",
          revision: "ZYYnDpTH2gdH9SVBvPNYY",
        },
        {
          url: "/_next/static/chunks/main-app-6d1d6e5f218349ce.js",
          revision: "ZYYnDpTH2gdH9SVBvPNYY",
        },
        {
          url: "/_next/static/chunks/main-d8e39d1a3cdbfa2e.js",
          revision: "ZYYnDpTH2gdH9SVBvPNYY",
        },
        {
          url: "/_next/static/chunks/pages/_app-f870474a17b7f2fd.js",
          revision: "ZYYnDpTH2gdH9SVBvPNYY",
        },
        {
          url: "/_next/static/chunks/pages/_error-c66a4e8afc46f17b.js",
          revision: "ZYYnDpTH2gdH9SVBvPNYY",
        },
        {
          url: "/_next/static/chunks/polyfills-78c92fac7aa8fdd8.js",
          revision: "79330112775102f91e1010318bae2bd3",
        },
        {
          url: "/_next/static/chunks/webpack-ea73e4b104f0680a.js",
          revision: "ZYYnDpTH2gdH9SVBvPNYY",
        },
        {
          url: "/_next/static/css/5251f00114e6514a.css",
          revision: "5251f00114e6514a",
        },
        {
          url: "/_next/static/css/a9bfd37d37452212.css",
          revision: "a9bfd37d37452212",
        },
        {
          url: "/_next/static/css/e3f6dd86b47c8396.css",
          revision: "e3f6dd86b47c8396",
        },
        {
          url: "/_next/static/media/26a46d62cd723877-s.woff2",
          revision: "befd9c0fdfa3d8a645d5f95717ed6420",
        },
        {
          url: "/_next/static/media/55c55f0601d81cf3-s.woff2",
          revision: "43828e14271c77b87e3ed582dbff9f74",
        },
        {
          url: "/_next/static/media/581909926a08bbc8-s.woff2",
          revision: "f0b86e7c24f455280b8df606b89af891",
        },
        {
          url: "/_next/static/media/6d93bde91c0c2823-s.woff2",
          revision: "621a07228c8ccbfd647918f1021b4868",
        },
        {
          url: "/_next/static/media/97e0cb1ae144a2a9-s.woff2",
          revision: "e360c61c5bd8d90639fd4503c829c2dc",
        },
        {
          url: "/_next/static/media/a34f9d1faa5f3315-s.p.woff2",
          revision: "d4fe31e6a2aebc06b8d6e558c9141119",
        },
        {
          url: "/_next/static/media/df0a9ae256c0569c-s.woff2",
          revision: "d54db44de5ccb18886ece2fda72bdfe0",
        },
        {
          url: "/_next/static/media/img-background.0b1ead02.png",
          revision: "29ed164f1c2f26552fddfda3990bb3c8",
        },
        {
          url: "/_next/static/media/img-done.39ec0fa7.png",
          revision: "8c37749fade9c6262caa2ac2ca30b1a7",
        },
        {
          url: "/_next/static/media/img-google.418dcf71.png",
          revision: "f62859920361b6c423927f62da88c42d",
        },
        {
          url: "/_next/static/media/img-kakaotalk.4c411eab.png",
          revision: "90faf6abddc8cc8f46cf314edf072eaf",
        },
        {
          url: "/_next/static/media/img-landing-icon-1.61e9ffed.png",
          revision: "b9ad98c707d8eecde34e1cf8b73a2949",
        },
        {
          url: "/_next/static/media/img-landing-icon-2.4e8f2709.png",
          revision: "5560c914d1d951116096e75766c9e5f1",
        },
        {
          url: "/_next/static/media/img-landing-icon-3.8e06f4eb.png",
          revision: "c42c75be64228b7de630737d589f526c",
        },
        {
          url: "/_next/static/media/img-landing-mockup-1.23f86cb2.png",
          revision: "c2fc1806aa11b1cc72e4191346b2f312",
        },
        {
          url: "/_next/static/media/img-landing-mockup-2.bd428f02.png",
          revision: "3c45038b541ba9713c26a813f26920b4",
        },
        {
          url: "/_next/static/media/img-landing-mockup-3.0116fbd6.png",
          revision: "35df61f03dea3c15460ff6a6850f5e8b",
        },
        {
          url: "/_next/static/media/img-planet.10aa4475.png",
          revision: "65f9b770a179d4c9c0d2aefe7bab54c5",
        },
        {
          url: "/_next/static/media/img-spaceship.aed4a098.png",
          revision: "939e78b3a6d273f26ce5ad99cdfb71e3",
        },
        {
          url: "/_next/static/media/img-thumbnail-team.3ec8002e.png",
          revision: "7044636cf5a077266e80bff788851e69",
        },
        {
          url: "/_next/static/media/img-todo.5ed8491d.png",
          revision: "74b531ef7e1f2c88893af1890c3818af",
        },
        {
          url: "/assets/favicon.ico",
          revision: "7c85bab27efb809fd0129580236cdfeb",
        },
        {
          url: "/assets/icons/declartions.d.ts",
          revision: "a1fd3395c427d56a373ec117034ef041",
        },
        {
          url: "/assets/icons/icon-alert.svg",
          revision: "a58ec4bb34c58a35ee1b03b6006fbc38",
        },
        {
          url: "/assets/icons/icon-arrow-left.svg",
          revision: "9424e96a90c9d0df29e47a3b46ceebe2",
        },
        {
          url: "/assets/icons/icon-arrow-right.svg",
          revision: "40a8f9cbdab3ce6bae583f9a2ef8aaf7",
        },
        {
          url: "/assets/icons/icon-calendar-arrow-left.svg",
          revision: "d7634ab6348591d1cb6e843a458b400c",
        },
        {
          url: "/assets/icons/icon-calendar-arrow-right.svg",
          revision: "d127da1bb91237a704f5f72fd6aae687",
        },
        {
          url: "/assets/icons/icon-calendar.svg",
          revision: "e5c621832007531ead82cd529d02d567",
        },
        {
          url: "/assets/icons/icon-check-current.svg",
          revision: "2ff3e2896b851a866aed37ab95515cc9",
        },
        {
          url: "/assets/icons/icon-check-primary.svg",
          revision: "7906f25faefef5aa3161f9bdd8cc45f7",
        },
        {
          url: "/assets/icons/icon-check-white.svg",
          revision: "f6b537eb97b701cfb3fba3696b87c5b1",
        },
        {
          url: "/assets/icons/icon-checkbox-primary.svg",
          revision: "77711c9f7b58720b9bdeeb3a1582f826",
        },
        {
          url: "/assets/icons/icon-checkbox.svg",
          revision: "cef8acefd1ee9afd0e52dbfcad9f3cc3",
        },
        {
          url: "/assets/icons/icon-codeit.svg",
          revision: "dbe473956c0ba716d6f138f0fb1005b9",
        },
        {
          url: "/assets/icons/icon-comment.svg",
          revision: "9411e3ff6c9d0640a92c631b3c47431b",
        },
        {
          url: "/assets/icons/icon-done-cyan.svg",
          revision: "90ed4c133a71503fe4fcbf3e8a54a1b6",
        },
        {
          url: "/assets/icons/icon-done-panel.svg",
          revision: "1aa5b5f6d3fcbbfed7dbfd58d06d3b80",
        },
        {
          url: "/assets/icons/icon-done.svg",
          revision: "58a8a500e4cb1d09b3925d4fc63ec20e",
        },
        {
          url: "/assets/icons/icon-dropdown.svg",
          revision: "d252e511abbd4757867581f9676529e2",
        },
        {
          url: "/assets/icons/icon-edit.svg",
          revision: "038b132f421499b8d80ffd200d9cf501",
        },
        {
          url: "/assets/icons/icon-gear.svg",
          revision: "b78ca45a28f1ec7098d8e87a50d40ca9",
        },
        {
          url: "/assets/icons/icon-gnb-menu.svg",
          revision: "59da8285cca9f6542e7d994771286e65",
        },
        {
          url: "/assets/icons/icon-heart.svg",
          revision: "1c4078c59577fc99c135e1966dec1130",
        },
        {
          url: "/assets/icons/icon-image-button-error.svg",
          revision: "4a9dc7a6dfb29ffb989b92327fb2277b",
        },
        {
          url: "/assets/icons/icon-image-button.svg",
          revision: "9752d89d5b9a8ab273c9bfeb429d0760",
        },
        {
          url: "/assets/icons/icon-img-select.svg",
          revision: "56443a4cdbfece42d359768c54414c85",
        },
        {
          url: "/assets/icons/icon-kebab.svg",
          revision: "3c5b1d1e2ea62f053d8084b0168afb1c",
        },
        {
          url: "/assets/icons/icon-list.svg",
          revision: "6eb4cc57a2986569df577413e845c0a5",
        },
        {
          url: "/assets/icons/icon-mail.svg",
          revision: "382e54421ac5b1af324209454cdd5c94",
        },
        {
          url: "/assets/icons/icon-page-next-next.svg",
          revision: "a9292f1ab56104e2df88eff38eeb3fda",
        },
        {
          url: "/assets/icons/icon-page-next.svg",
          revision: "94e5ab45e9564763112707d0ab321246",
        },
        {
          url: "/assets/icons/icon-page-prev-prev.svg",
          revision: "9a8ec36f69cfe04a446e4a338fc9254a",
        },
        {
          url: "/assets/icons/icon-page-prev.svg",
          revision: "7dec05ff15437fe9b56530949f61ef5f",
        },
        {
          url: "/assets/icons/icon-plus-big.svg",
          revision: "a2d254d462574c2a285a095883d1bfde",
        },
        {
          url: "/assets/icons/icon-plus-current.svg",
          revision: "52deae9b7fc5a2e7debea493e252b51c",
        },
        {
          url: "/assets/icons/icon-plus-cyan.svg",
          revision: "ed79641849c41ba3321d4eb504065c81",
        },
        {
          url: "/assets/icons/icon-plus.svg",
          revision: "1389a73a0880dfdb0626b900c97d11e1",
        },
        {
          url: "/assets/icons/icon-profile-current.svg",
          revision: "d00c61ec9e58f3906e42ca3d6cfa6f3c",
        },
        {
          url: "/assets/icons/icon-profile-desktop.svg",
          revision: "eb7f2bf43f5ee9cca23244e99059a20a",
        },
        {
          url: "/assets/icons/icon-profile.svg",
          revision: "7756a2815b85dc2245f647222d205677",
        },
        {
          url: "/assets/icons/icon-repeat.svg",
          revision: "5434b83067b5cd715fceb456b2af9a2c",
        },
        {
          url: "/assets/icons/icon-search.svg",
          revision: "6f1ea99b7a0add67183b5cd59ffcfa1e",
        },
        {
          url: "/assets/icons/icon-secession.svg",
          revision: "74d5a7f5ffe60259146639dfa3d50cb0",
        },
        {
          url: "/assets/icons/icon-time.svg",
          revision: "abdd59780184c94bc876a05788017355",
        },
        {
          url: "/assets/icons/icon-todo.svg",
          revision: "b984373395285c8959a7198b954952f8",
        },
        {
          url: "/assets/icons/icon-toggle.svg",
          revision: "5d386e2d7ac232be651a7aef849f8ee2",
        },
        {
          url: "/assets/icons/icon-user-x.svg",
          revision: "288cf6096c7de200a01ae001bbc3b20f",
        },
        {
          url: "/assets/icons/icon-user.svg",
          revision: "5352cdad70b1b32bb28aee06c569486b",
        },
        {
          url: "/assets/icons/icon-visibility-off.svg",
          revision: "1b9745c2ab397900e8623cecc487dd53",
        },
        {
          url: "/assets/icons/icon-visibility-on.svg",
          revision: "a72c92f28e16c18c2a7c17c31b1d0200",
        },
        {
          url: "/assets/icons/icon-x-big.svg",
          revision: "161fd6dda0c5bfd21a27da25d4befbe9",
        },
        {
          url: "/assets/icons/icon-x.svg",
          revision: "061e11db1b7bc85fc8075c41e3ab37c3",
        },
        {
          url: "/assets/icons/index.ts",
          revision: "68e681f1c2d9a5457c9fab93381e8e6a",
        },
        {
          url: "/assets/icons/loading-spinner.svg",
          revision: "25cc8bcda740ae75ce75fca70e241286",
        },
        {
          url: "/assets/image192.png",
          revision: "151e6bec01657621a354ab50ba0f3e51",
        },
        {
          url: "/assets/image512.png",
          revision: "bba5ecc4681a6c11745b57f82d5c5da1",
        },
        {
          url: "/assets/images/images.png",
          revision: "c037654f63292efbc1a5b2fbed0efbf5",
        },
        {
          url: "/assets/images/img-background.png",
          revision: "29ed164f1c2f26552fddfda3990bb3c8",
        },
        {
          url: "/assets/images/img-done.png",
          revision: "8c37749fade9c6262caa2ac2ca30b1a7",
        },
        {
          url: "/assets/images/img-google.png",
          revision: "f62859920361b6c423927f62da88c42d",
        },
        {
          url: "/assets/images/img-kakaotalk.png",
          revision: "90faf6abddc8cc8f46cf314edf072eaf",
        },
        {
          url: "/assets/images/img-landing-icon-1.png",
          revision: "b9ad98c707d8eecde34e1cf8b73a2949",
        },
        {
          url: "/assets/images/img-landing-icon-2.png",
          revision: "5560c914d1d951116096e75766c9e5f1",
        },
        {
          url: "/assets/images/img-landing-icon-3.png",
          revision: "c42c75be64228b7de630737d589f526c",
        },
        {
          url: "/assets/images/img-landing-mockup-1.png",
          revision: "c2fc1806aa11b1cc72e4191346b2f312",
        },
        {
          url: "/assets/images/img-landing-mockup-2.png",
          revision: "3c45038b541ba9713c26a813f26920b4",
        },
        {
          url: "/assets/images/img-landing-mockup-3.png",
          revision: "35df61f03dea3c15460ff6a6850f5e8b",
        },
        {
          url: "/assets/images/img-open-graph.png",
          revision: "27734132700745ceecd5cf76a1e8d7c5",
        },
        {
          url: "/assets/images/img-planet.png",
          revision: "65f9b770a179d4c9c0d2aefe7bab54c5",
        },
        {
          url: "/assets/images/img-rocket.png",
          revision: "99001e824be9a4b98bab73444a93e0a7",
        },
        {
          url: "/assets/images/img-spaceship.png",
          revision: "939e78b3a6d273f26ce5ad99cdfb71e3",
        },
        {
          url: "/assets/images/img-star.png",
          revision: "ae79328aaadcfcc8f4ec15bffcdaf27d",
        },
        {
          url: "/assets/images/img-thumbnail-team.png",
          revision: "7044636cf5a077266e80bff788851e69",
        },
        {
          url: "/assets/images/img-todo.png",
          revision: "74b531ef7e1f2c88893af1890c3818af",
        },
        {
          url: "/assets/images/index.ts",
          revision: "ee73e5a2d8914eaa28b54369f40bdb97",
        },
        {
          url: "/assets/images/logo-wywm.png",
          revision: "18c443e376ed7cbe945c18871392187f",
        },
        {
          url: "/assets/images/word-banner.png",
          revision: "28505e520ffe83e0ac50b863aeb33784",
        },
        {
          url: "/assets/images/wywm-banner.png",
          revision: "441f7d8de72b200aba164874baad0edb",
        },
        {
          url: "/assets/lotties/404.json",
          revision: "9c875b6c9e30262c2bba9a27805d0ea3",
        },
        {
          url: "/assets/lotties/500.json",
          revision: "6575a17d222e0d10378e96aa5fd9b218",
        },
        {
          url: "/assets/lotties/alien.json",
          revision: "c2b1dbdb4fa38eded2d3ff67ba1a980e",
        },
        {
          url: "/assets/lotties/board-list-empty.json",
          revision: "c05877bca4741193b09d6baaa8a0b315",
        },
        {
          url: "/assets/lotties/broke-heart.json",
          revision: "bea6ea666fd12950fb56e8e308e6ca55",
        },
        {
          url: "/assets/lotties/empty.json",
          revision: "e38a7556db6b5723a3d6f17a10a37f37",
        },
        {
          url: "/assets/lotties/error.json",
          revision: "b89c572bcaa06446437c833226551956",
        },
        {
          url: "/assets/lotties/heart.json",
          revision: "fa75407a92c7a1930623372a349c0b54",
        },
        {
          url: "/assets/lotties/lighting.json",
          revision: "dc3d150df57ef803a4dc905c40e5cd7a",
        },
        {
          url: "/assets/lotties/nocomment.json",
          revision: "1c2f2232439921755ee5d07348c3c969",
        },
        {
          url: "/assets/lotties/planet3.json",
          revision: "3f3ac2fd508279c0884a0bd61a764750",
        },
        {
          url: "/assets/lotties/planets.json",
          revision: "8be0edb46a27172ca83faacd77af2a2d",
        },
        {
          url: "/assets/lotties/stars.json",
          revision: "693791a6622ef9e19774b4d227076e87",
        },
        {
          url: "/assets/lotties/success.json",
          revision: "be04a11041534daea347146522376cb2",
        },
        {
          url: "/assets/lotties/team-empty.json",
          revision: "7db87a6bd5e62ab877251134cc0faacd",
        },
        {
          url: "/assets/lotties/team-loading.json",
          revision: "36c570b2134569626ee6ae77473d5bd1",
        },
      ],
      { ignoreURLParametersMatching: [] },
    ),
    s.cleanupOutdatedCaches(),
    s.registerRoute(
      "/",
      new s.NetworkFirst({
        cacheName: "start-url",
        plugins: [
          {
            cacheWillUpdate: async ({
              request: s,
              response: e,
              event: a,
              state: i,
            }) =>
              e && "opaqueredirect" === e.type
                ? new Response(e.body, {
                    status: 200,
                    statusText: "OK",
                    headers: e.headers,
                  })
                : e,
          },
        ],
      }),
      "GET",
    ),
    s.registerRoute(
      /^https?.*/,
      new s.NetworkFirst({
        cacheName: "offlineCache",
        plugins: [
          new s.ExpirationPlugin({ maxEntries: 200, maxAgeSeconds: 86400 }),
        ],
      }),
      "GET",
    );
});
