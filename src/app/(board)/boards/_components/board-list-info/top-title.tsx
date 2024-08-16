/* eslint-disable no-console */
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
      <h2 className="text-24-700">게시글</h2>
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
            최신순
          </DropDown.Item>
          <DropDown.Item
            onClick={() => {
              setOrderBy("like");
              handleOff();
            }}
          >
            좋아요순
          </DropDown.Item>
        </DropDown.Menu>
      </DropDown>
    </div>
  );
};

export default TopTitle;
