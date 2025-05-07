import { Select } from "@radix-ui/themes";
import useDomainQueryStore from "../store";

const FilterSelector = () => {
  const setIsActive = useDomainQueryStore((s) => s.setIsActive);

  return (
    <Select.Root
      size="3"
      defaultValue="all"
      onValueChange={(value) => {
        if (value == "all") {
          setIsActive(undefined);
        }
        if (value == "true") {
          setIsActive(true);
        }
        if (value == "false") {
          setIsActive(false);
        }
      }}
    >
      <Select.Trigger />
      <Select.Content>
        <Select.Item value="all">All</Select.Item>
        <Select.Item value="true">Active</Select.Item>
        <Select.Item value="false">Not Active</Select.Item>
      </Select.Content>
    </Select.Root>
  );
};

export default FilterSelector;
