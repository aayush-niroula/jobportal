import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface AddLineInputProps {
  label: string;
  placeholder?: string;
  value: string[];
  onChange: (v: string[]) => void;
}

export default function AddLineInput({
  label,
  placeholder,
  value,
  onChange,
}: AddLineInputProps) {
  const [lines, setLines] = useState<string[]>(value || []);

  // Update local state if parent changes value (important for AI content)
  useEffect(() => {
    setLines(value || []);
  }, [value]);

  const addLine = (line: string) => {
    const trimmed = line.trim();
    if (trimmed && !lines.includes(trimmed)) {
      const newLines = [...lines, trimmed];
      setLines(newLines);
      onChange(newLines);
    }
  };

  const removeLine = (line: string) => {
    const newLines = lines.filter((l) => l !== line);
    setLines(newLines);
    onChange(newLines);
  };

  return (
    <div>
      <Label>{label}</Label>
      <div className="flex flex-wrap gap-2 mb-2">
        {lines.map((line) => (
          <span key={line} className="bg-gray-200 px-2 py-1 rounded">
            {line}
            <button
              type="button"
              className="ml-2 text-red-500"
              onClick={() => removeLine(line)}
            >
              ×
            </button>
          </span>
        ))}
      </div>
      <Input
        placeholder={placeholder || `Add ${label} and press Enter`}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            addLine(e.currentTarget.value);
            e.currentTarget.value = "";
          }
        }}
      />
    </div>
  );
}
