import Dropdown from "./Dropdown";

const categories = [
  "Breaking",
  "Business",
  "Crime",
  "Domestic",
  "Education",
  "Entertainment",
  "Environment",
  "Food",
  "Health",
  "Lifestyle",
  "Politics",
  "Science",
  "Sports",
  "Technology",
  "Top",
  "Tourism",
  "World",
  "Other",
];

const Categorydropdown = ({ onSelect }) => {
  return (
    <Dropdown label="More" items={categories} onSelect={onSelect}
    />
  );
};

export default Categorydropdown;