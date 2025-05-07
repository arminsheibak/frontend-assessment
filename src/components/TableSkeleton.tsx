import { Skeleton, Table } from "@radix-ui/themes";

const TableSkeleton = () => {
  const SkeletonArray = [1, 2, 3, 4, 5];
  return SkeletonArray.map((value) => {
    return (
      <Table.Row key={value}>
        <Table.Cell>
          <Skeleton>Lorem ipsum dolor sit</Skeleton>
        </Table.Cell>
        <Table.Cell>
          <Skeleton>Active</Skeleton>
        </Table.Cell>
        <Table.Cell className="hidden md:table-cell">
          <Skeleton>pending</Skeleton>
        </Table.Cell>
      </Table.Row>
    );
  });
};

export default TableSkeleton;
