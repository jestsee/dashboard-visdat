interface Props {
  years: string[];
  value: string;
  onChange: (val: string) => void;
}

const Slider = ({ years, value, onChange }: Props) => {
  return (
    <div className="flex gap-2">
      <input
        type="range"
        min={years[0]}
        max={years[years.length - 1]}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="range"
        step="1"
      />
      <label>{value}</label>
      {/* <div className="w-full flex justify-between text-xs px-2">
        {years.map((item) => (
          <span key={item}>
            | <p>{item}</p>
          </span>
        ))}
      </div> */}
    </div>
  );
};

export default Slider;
