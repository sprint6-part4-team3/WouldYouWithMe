import clsx from "clsx";
import { motion } from "framer-motion";

import { DropDown } from "@/components/common";
import { ORDER_TYPE_DICT, OrderType } from "@/constants/board-order-option";
import { useToggle } from "@/hooks";

interface TopTitleProps {
  orderBy: OrderType;
  setOrderBy: (value: OrderType) => void;
}

const TopTitle = ({ orderBy, setOrderBy }: TopTitleProps) => {
  const { value, handleOff, handleToggle } = useToggle();

  return (
    <div className="flex items-center justify-between">
      <div className="flex gap-8 sm:flex-col md:items-center md:gap-16">
        <h2 className="text-24-700">게시글</h2>
        <p className="text-14-500 text-text-disabled">
          원하는 팀에 참여하여 일정관리해봐요
        </p>
      </div>

      <DropDown handleClose={handleOff}>
        <DropDown.Trigger onClick={handleToggle}>
          <button
            className="flex h-44 w-120 items-center justify-between rounded-10 bg-background-secondary px-16"
            type="button"
          >
            <span className="text-14-700">{ORDER_TYPE_DICT[orderBy]}</span>
            <motion.span
              initial={{ rotate: 0 }}
              animate={{ rotate: value ? -180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              ▾
            </motion.span>
          </button>
        </DropDown.Trigger>
        <DropDown.Menu className="mt-35" isOpen={value}>
          <DropDown.Item
            onClick={() => {
              setOrderBy("recent");
              handleOff();
            }}
          >
            <span
              className={clsx({
                "text-brand-primary": ORDER_TYPE_DICT[orderBy] === "최신순",
              })}
            >
              최신순
            </span>
          </DropDown.Item>
          <DropDown.Item
            onClick={() => {
              setOrderBy("like");
              handleOff();
            }}
          >
            <span
              className={clsx({
                "text-brand-primary": ORDER_TYPE_DICT[orderBy] === "좋아요순",
              })}
            >
              좋아요순
            </span>
          </DropDown.Item>
        </DropDown.Menu>
      </DropDown>
    </div>
  );
};

export default TopTitle;
