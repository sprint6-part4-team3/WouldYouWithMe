import clsx from "clsx";

interface IButtonsProps {
  activeIndex: number;
  setActiveIndex: (index: number) => void;
}

const IButtons = ({ activeIndex, setActiveIndex }: IButtonsProps) => (
  <div className="flex flex-col space-y-7">
    {[0, 1, 2, 3, 4].map((index) => (
      <button
        key={index}
        type="button"
        className={clsx(
          "size-15 rounded-full transition-colors duration-300", // Basic styles for circular shape
          activeIndex === index
            ? "bg-brand-primary" // Active button color
            : "bg-gray-300", // Inactive button color
        )}
        onClick={() => setActiveIndex(index)}
      />
    ))}
  </div>
);

export default IButtons;
