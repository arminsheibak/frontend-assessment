import {
  Button,
  Dialog,
  Flex,
  Link,
  Table,
  Text,
} from "@radix-ui/themes";
import {
  ExternalLinkIcon,
  InfoCircledIcon,
  CheckCircledIcon,
  DotsVerticalIcon,
} from "@radix-ui/react-icons";
import apiClient from "../services/apiClient";
import { useQueryClient } from "@tanstack/react-query";
import useDomains from "../hooks/useDomains";
import TableSkeleton from "./TableSkeleton";

const DomainsTable = () => {
  const { data: domains, isLoading } = useDomains();
  const queryClient = useQueryClient()
  return (
    <Table.Root variant="surface" mt={"6"} >
      <Table.Header>
        <Table.Row>
          <Table.Cell>
            <Text className="pl-3">Domain URL</Text>
          </Table.Cell>
          <Table.Cell className="hidden md:table-cell">
            <Text className="text-gray-600">Active Status</Text>
          </Table.Cell>
          <Table.Cell>
            <Text className="hidden md:block">Verification Status</Text>
            <Text className="md:hidden">Status</Text>
          </Table.Cell>
          <Table.Cell></Table.Cell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {isLoading &&
        <TableSkeleton />
        }
        {domains?.map((domain) => {
          return (
            <Table.Row key={domain.id}>
              <Table.Cell>
                <Link
                  weight={"medium"}
                  color="gray"
                  highContrast
                  underline="hover"
                  href={`https://${domain.domain}`}
                  target="_blank"
                >
                  {domain.isActive ? (
                    <CheckCircledIcon
                      className="inline-block mx-3"
                      color="green"
                    />
                  ) : (
                    <InfoCircledIcon
                      className="inline-block mx-3"
                      color="red"
                    />
                  )}
                  {domain.domain}
                  <ExternalLinkIcon className="inline-block ml-3 opacity-50" />
                </Link>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {domain.isActive ? (
                  <Text className="text-green-700">Active</Text>
                ) : (
                  <Text className="text-red-600">Not Active</Text>
                )}
              </Table.Cell>
              <Table.Cell>
                <Text
                  className={
                    domain.status === "verified"
                      ? "text-green-700"
                      : domain.status === "pending"
                      ? "text-amber-600"
                      : "text-red-600"
                  }
                >
                  {domain.status}
                </Text>
              </Table.Cell>
              <Table.Cell>
                <Dialog.Root>
                  <Dialog.Trigger>
                    <DotsVerticalIcon />
                  </Dialog.Trigger>
                  <Dialog.Content maxWidth="450px">
                    <Dialog.Title>Delete Domain</Dialog.Title>
                    <Dialog.Description size="2" mb="4">
                      Are you sure you want to delete domain: {domain.domain}?
                    </Dialog.Description>
                    <Flex gap="3" mt="4" justify="end">
                      <Dialog.Close>
                        <Button variant="soft" color="gray">
                          Cancel
                        </Button>
                      </Dialog.Close>
                      <Dialog.Close>
                        <Button
                         color="red"
                         onClick={() => {
                          apiClient.delete(`/${domain.id}`)
                          .then(() => queryClient.invalidateQueries({
                            queryKey: ["domains"]
                          }))
                         }}
                         >Delete</Button>
                      </Dialog.Close>
                    </Flex>
                  </Dialog.Content>
                </Dialog.Root>
              </Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table.Root>
  );
};

export default DomainsTable;
