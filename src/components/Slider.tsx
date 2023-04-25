interface Props {
  years: string[];
  value: string;
  onChange: (val: string) => void;
}

const Slider = ({ years, value, onChange }: Props) => {
  return (
    <>
      <input
        type="range"
        min={years[0]}
        max={years[years.length - 1]}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="range"
        step="1"
      />
      <div className="w-full flex justify-between text-xs px-2">
        {years.map((item) => (
          <span>
            | <p>{item}</p>
          </span>
        ))}
      </div>
    </>
  );
};

export default Slider;
