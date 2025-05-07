import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { TextField } from "@radix-ui/themes";
import { useRef } from "react";
import useDomainQueryStore from "../store";

const SearchInput = () => {
  const setSearchText = useDomainQueryStore((s) => s.setSearchText);
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <TextField.Root
      size={"3"}
      placeholder="Search Domain…"
      ref={inputRef}
      onChange={() => {
        setSearchText(inputRef.current?.value || "");
      }}
    >
      <TextField.Slot>
        <MagnifyingGlassIcon height="16" width="16" />
      </TextField.Slot>
    </TextField.Root>
  );
};

export default SearchInput;
