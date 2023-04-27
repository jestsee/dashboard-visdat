import { BaseProps } from "@/types/props";

interface Props extends BaseProps {
  years: string[];
  value: string;
  onChange: (val: string) => void;
}

const Slider = ({ years, value, className, onChange }: Props) => {
  return (
    <div className={`flex gap-2 ${className}`}>
      <input
        type="range"
        min={years[0]}
        max={years[years.length - 1]}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="range range-sm"
        step="1"
      />
      <label>{value}</label>
    </div>
  );
};

export default Slider;
