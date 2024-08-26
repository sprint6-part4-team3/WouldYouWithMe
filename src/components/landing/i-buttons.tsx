import clsx from "clsx";

interface IPageObj {
  pageNum: number;
}

interface IButtonsProps {
  pageObjArray: IPageObj[];
  currentPageNum: number;
  handlePointClick: (pageNum: number) => void;
}

const IButtons = ({
  pageObjArray,
  currentPageNum,
  handlePointClick,
}: IButtonsProps) => (
  <>
    {pageObjArray.map((item) => (
      <div
        key={item.pageNum}
        className={clsx(
          "size-10 cursor-pointer rounded-full transition-all",
          currentPageNum === item.pageNum ? "bg-brand-primary" : "bg-gray-400",
        )}
        onClick={() => {
          handlePointClick(item.pageNum);
        }}
      />
    ))}
  </>
);

export default IButtons;
