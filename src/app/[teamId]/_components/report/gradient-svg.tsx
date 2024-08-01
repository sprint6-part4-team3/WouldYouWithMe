const GradientSVG: React.FC = () => {
  const idCSS: string = "gradient";
  const gradientTransform: string = `rotate(90)`;

  return (
    <svg className="size-0">
      <defs>
        <linearGradient id={idCSS} gradientTransform={gradientTransform}>
          <stop offset="16.29%" stopColor="#22b8cf" />
          <stop offset="85.56%" stopColor="#A3E635" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default GradientSVG;
