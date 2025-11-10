import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type ItemProps = {
  label: string;
  value: string;
};

type SelectorProps = {
  placeholder: string;
  label: string;
  items: ItemProps[];
  value?: string;
  onValueChange?: (value: string) => void;
};

export function Selector({
  placeholder,
  label,
  items,
  value,
  onValueChange,
}: SelectorProps) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className='w-[180px]'>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{label}</SelectLabel>
          {items &&
            items.map((item) => (
              <SelectItem key={item.label} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
