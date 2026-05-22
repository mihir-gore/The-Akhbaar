
import { set } from "date-fns";
import Dropdown from "./Dropdown";

const sort = [
  "source",
  "pubDateAsc",
  "fetched_at",
];

const Sortdropdown = ({ onSelect, setSortBy }) => {
  return (
    <Dropdown
      label="Sort"
      items={sort}
      onSelect={setSortBy}
    />
  );
};

export default Sortdropdown;