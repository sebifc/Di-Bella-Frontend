import React from "react";
import styles from "./Select.module.scss";
import { BiSearch } from "react-icons/bi";

const Select = ({ value, onChange, options }) => {
  return (
    <div className={styles.select}>
      <BiSearch size={18} className={styles.icon} />
      <select value={value} onChange={onChange}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
