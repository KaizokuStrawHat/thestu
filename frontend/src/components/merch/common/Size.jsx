import React, { useState, useEffect } from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export function Size({ sizes, sizeValue, setSizeValue, }) {
  const [open, setOpen] = useState(false);

  // On every selectedVariety changes 
  useEffect(() => {
    // Change the initial value
    setSizeValue(sizes[0])
  }, [sizes])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[60px]"
        >
          {sizeValue || "Size"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[70px] p-0 bg-white">
        <Command>
          <CommandEmpty>No sizes found.</CommandEmpty>
          <CommandGroup>
            {sizes.map((size) => (
              <CommandItem
                key={size}
                value={size}
                onSelect={() => {
                  setSizeValue(size === sizeValue ? "" : size);
                  setOpen(false);
                }}
              >
                {/* Use conditional rendering for the check mark based on the selected size */}
                <Check
                  className={`mr-2 h-4 w-4 ${sizeValue === size ? "opacity-100" : "opacity-0"}`}
                />
                {size}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
