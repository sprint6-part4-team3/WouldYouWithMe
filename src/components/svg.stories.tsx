import * as Icons from "@/public/assets/icons";

const meta = {
  title: "Assets/Icons",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "현재 앱에서 사용되는 모든 SVG 아이콘을 보여줍니다.",
      },
    },
  },
};

export default meta;

export const Docs = () => (
  <div className="flex flex-wrap items-center gap-6">
    {Object.entries(Icons).map(([name, IconComponent]) => (
      <IconComponent className="cursor-pointer" key={name} />
    ))}
  </div>
);
