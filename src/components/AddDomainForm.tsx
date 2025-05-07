import { useQueryClient } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import {
    Box,
    Button,
    Flex,
    Select,
    Switch,
    Text,
    TextField,
  } from "@radix-ui/themes";
import apiClient from "../services/apiClient";

interface FormData {
    domain: string;
    isActive: boolean;
    status: string;
  }

interface Props {
  isMenuOpen: boolean;
  setMenuOpen: (value: boolean) => void;
}

const AddDomainForm = ({isMenuOpen, setMenuOpen}: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<FormData>();
  const queryClient = useQueryClient();
  return (
    <form
      onSubmit={handleSubmit((data) => {
        apiClient
          .post("/", {
            domain: data.domain,
            isActive: data.isActive,
            status: data.status,
          })
          .then((res) => {
            if (res.status == 201) {
              queryClient.invalidateQueries({
                queryKey: ["domains"],
              });
            }
            reset();
            setMenuOpen(false);
          });
      })}
    >
      <Flex direction={"column"} gap={"4"}>
        <Box mt={"4"}>
          <TextField.Root
            placeholder="Enter Domain URL..."
            mb={"1"}
            {...register("domain", {
              required: "Domain URL is required!",
              pattern: {
                value: /^(?!:\/\/)([a-zA-Z0-9-_]+\.)+[a-zA-Z]{2,}$/,
                message: "Enter a valid domain (e.g. example.com)",
              },
            })}
          />
          {errors.domain?.type == "required" && (
            <Text className="text-red-600">{errors.domain.message}</Text>
          )}
          {errors.domain?.type == "pattern" && (
            <Text className="text-red-600">{errors.domain.message}</Text>
          )}
        </Box>
        <Box>
          <label htmlFor="status">Verification Status: </label>
          <Controller
            control={control}
            name="status"
            defaultValue={"pending"}
            render={({ field }) => {
              return (
                <Select.Root
                  size="2"
                  defaultValue="pending"
                  onValueChange={field.onChange}
                >
                  <Select.Trigger ml={"1"} />
                  <Select.Content>
                    <Select.Item value="pending">Pending</Select.Item>
                    <Select.Item value="verified">Verified</Select.Item>
                    <Select.Item value="rejected">Rejected</Select.Item>
                  </Select.Content>
                </Select.Root>
              );
            }}
          />
        </Box>
        <Box className="flex items-center">
          <Text>Is Active: </Text>
          <Controller
            name="isActive"
            control={control}
            defaultValue={true}
            render={({ field }) => {
              return (
                <Switch
                  defaultChecked
                  id="isActive"
                  mt={"2px"}
                  color="green"
                  onCheckedChange={field.onChange}
                  checked={field.value}
                />
              );
            }}
          />
        </Box>
      </Flex>
      <Flex justify={"end"} gap={"3"} mt={"5"}>
        <Button
          variant="outline"
          onClick={() => {
            setMenuOpen(!isMenuOpen);
            reset();
          }}
        >
          Cancel
        </Button>
        <Button type="submit">Add Domain</Button>
      </Flex>
    </form>
  );
};

export default AddDomainForm;
