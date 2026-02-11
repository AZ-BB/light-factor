"use client";

interface FormFieldProps {
  label: string;
  name: string;
  type?: "text" | "textarea" | "select";
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  options?: { value: string; label: string }[];
  rows?: number;
  className?: string;
}

export default function FormField({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder = "",
  options = [],
  rows = 3,
  className = "",
}: FormFieldProps) {
  const baseInput =
    "w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900";

  return (
    <div className={`space-y-1 ${className}`}>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      {type === "textarea" ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={rows}
          className={`${baseInput} resize-y`}
        />
      ) : type === "select" ? (
        <select
          id={name}
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={baseInput}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type="text"
          id={name}
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={baseInput}
        />
      )}
    </div>
  );
}
