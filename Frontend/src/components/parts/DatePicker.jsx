import React, { useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils"; // Ensure you have this utility for conditional classNames
import { Button } from "@/components/ui/button"; // Import your custom Button component
import { Calendar } from "@/components/ui/calendar"; // Import your custom Calendar component
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"; // Import your custom Popover components

export function DatePickerDemo() {
  const [date, setDate] = useState<Date | null>(null); // Initialize date as null

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal bg-[#2b2b2b] text-white border border-gray-700",
            !date && "text-gray-500" // Placeholder color if no date is selected
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 bg-[#1f1f1f] border border-gray-700">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
          className="text-white bg-[#1f1f1f]"
        />
      </PopoverContent>
    </Popover>
  );
}
