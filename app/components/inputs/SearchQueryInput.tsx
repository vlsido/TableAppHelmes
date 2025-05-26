interface SearchQueryInputProps {
  value: string;
  onChange: (text: string) => void;
}

function SearchQueryInput(props: SearchQueryInputProps) {

  return (
    <input
      className="flex w-[100%] flex-row px-[24px] py-[10px] gap-[10px] border border-[#EDEDED] rounded-sm text-[#ABABAB] text-[14px]"
      name="searchField"
      placeholder="Search by order number"
      value={props.value}
      onChange={(e) => props.onChange(e.target.value)}
    />
  );
}

export default SearchQueryInput;
