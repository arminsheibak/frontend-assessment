import {
  Box,
  Heading,
} from "@radix-ui/themes";
import useDomains from "./hooks/useDomains";
import DomainsTable from "./components/DomainsTable";


const App = () => {
  const { data: domains } = useDomains();
  return (
    <Box p={"5"}>
      <Heading weight={"light"}>Domains</Heading>
      <DomainsTable domains={domains!} />
    </Box>
  );
};

export default App;
