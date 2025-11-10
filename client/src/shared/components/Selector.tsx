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
};

export function Selector({ placeholder, label, items }: SelectorProps) {
  return (
    <Select>
      <SelectTrigger className='w-[180px]'>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{label}</SelectLabel>
          {items &&
            items.map((item) => (
              <SelectItem value={item.value}>{item.label}</SelectItem>
            ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
