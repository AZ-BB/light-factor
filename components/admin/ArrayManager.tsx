"use client";

interface ArrayManagerProps<T> {
  items: T[];
  onChange: (items: T[]) => void;
  renderItem: (item: T, index: number) => React.ReactNode;
  createEmpty: () => T;
  addLabel?: string;
  itemLabel?: string;
}

export default function ArrayManager<T>({
  items,
  onChange,
  renderItem,
  createEmpty,
  addLabel = "Add Item",
  itemLabel = "Item",
}: ArrayManagerProps<T>) {
  const add = () => {
    onChange([...items, createEmpty()]);
  };

  const remove = (index: number) => {
    const next = items.filter((_, i) => i !== index);
    onChange(next);
  };

  const move = (index: number, direction: "up" | "down") => {
    const next = [...items];
    const target = direction === "up" ? index - 1 : index + 1;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-gray-700">{itemLabel}s</span>
        <button
          type="button"
          onClick={add}
          className="px-3 py-1.5 text-sm bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          {addLabel}
        </button>
      </div>
      <div className="space-y-3">
        {items.map((item, index) => (
          <div
            key={index}
            className="p-4 border border-gray-200 rounded-md bg-gray-50 space-y-3"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-500">{itemLabel} {index + 1}</span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => move(index, "up")}
                  disabled={index === 0}
                  className="p-1 text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Move up"
                >
                  ↑
                </button>
                <button
                  type="button"
                  onClick={() => move(index, "down")}
                  disabled={index === items.length - 1}
                  className="p-1 text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Move down"
                >
                  ↓
                </button>
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="p-1 text-red-600 hover:text-red-700"
                  title="Remove"
                >
                  Remove
                </button>
              </div>
            </div>
            {renderItem(item, index)}
          </div>
        ))}
      </div>
    </div>
  );
}
