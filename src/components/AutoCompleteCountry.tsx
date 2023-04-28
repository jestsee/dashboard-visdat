//./components/Autocomplete.tsx

import { Country } from "@/types/data";
import classNames from "classnames";
import { useEffect, useRef, useState } from "react";

type Props = {
  items: Country[];
  value: Country;
  onChange(val: Country): void;
};

//we are using dropdown, input and menu component from daisyui
const AutocompleteCountry = (props: Props) => {
  const { items, value, onChange } = props;
  const ref = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState(value.entity);
  const [countries, setCountries] = useState<Country[]>(items);

  useEffect(() => {
    const tempCountries = items.filter((item) =>
      item.entity.toLowerCase().includes(query.toLowerCase())
    );
    setCountries(tempCountries);
  }, [query, items]);

  return (
    <div
      // use classnames here to easily toggle dropdown open
      className={classNames({
        "dropdown w-full": true,
        "dropdown-open": open,
      })}
      ref={ref}
    >
      <input
        type="text"
        className="input input-bordered w-full"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        // onPointerLeave={} // set yang paling atas sebagai query
        placeholder="Type something.."
        tabIndex={0}
      />
      {/* add this part */}
      <div className="dropdown-content bg-base-200 top-14 max-h-96 overflow-auto flex-col rounded-md">
        <ul
          className="menu menu-compact "
          // use ref to calculate the width of parent
          style={{ width: ref.current?.clientWidth }}
        >
          {countries.map((item, index) => {
            return (
              <li
                key={index}
                tabIndex={index + 1}
                onClick={() => {
                  onChange(item);
                  setOpen(false);
                }}
                className="border-b border-b-base-content/10 w-full"
              >
                <button>{item.entity}</button>
              </li>
            );
          })}
        </ul>
        {/* add this part */}
      </div>
    </div>
  );
};

export default AutocompleteCountry;
