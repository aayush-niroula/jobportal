"use client";

import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface BulletTextareaProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function BulletTextarea({
  label,
  value,
  onChange,
  placeholder = "Write one line and press Enter",
}: BulletTextareaProps) {

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    let text = e.target.value;
    const lines = text.split("\n").map(line => line.trim());

    const formattedLines = lines.map(line => {
      if (!line.startsWith("•") && line !== "") return "• " + line;
      return line;
    });
    onChange(formattedLines.join("\n"));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      const cursorPos = e.currentTarget.selectionStart;
      const textBefore = value.slice(0, cursorPos);
      const textAfter = value.slice(cursorPos);

      // Insert new bullet at the cursor
      const newValue = textBefore + "\n• " + textAfter;
      e.preventDefault();
      onChange(newValue);

      // Move cursor to after the bullet
      setTimeout(() => {
        e.currentTarget.selectionStart = e.currentTarget.selectionEnd = cursorPos + 3;
      }, 0);
    }
  };

  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      <Textarea
        rows={5}
        className="pl-6 leading-relaxed"
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <p className="text-xs text-muted-foreground">
        Press Enter to add a new bullet point
      </p>
    </div>
  );
}
