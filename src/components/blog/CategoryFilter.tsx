interface CategoryFilterProps {
  categories: string[];
  selected: string;
  onSelect: (category: string) => void;
}

const CategoryFilter = ({ categories, selected, onSelect }: CategoryFilterProps) => {
  return (
    <div className="flex flex-wrap justify-center gap-3">
      <button
        onClick={() => onSelect("")}
        className={`rounded-full px-4 py-2 text-sm font-medium transition ${
          selected === ""
            ? "bg-gradient-to-r from-purple-600 to-violet-600 text-white shadow-lg shadow-purple-500/30"
            : "bg-slate-700 text-slate-300 hover:bg-slate-600"
        }`}
      >
        All
      </button>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelect(category)}
          className={`rounded-full px-4 py-2 text-sm font-medium transition ${
            selected === category
              ? "bg-gradient-to-r from-purple-600 to-violet-600 text-white shadow-lg shadow-purple-500/30"
              : "bg-slate-700 text-slate-300 hover:bg-slate-600"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;