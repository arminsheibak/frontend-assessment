import {
  Box,
  Button,
  Heading,
} from "@radix-ui/themes";
import DomainsTable from "./components/DomainsTable";
import { useState } from "react";
import AddDomainForm from "./components/AddDomainForm";


const App = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  return (
    <>
      <Box p={"5"}>
        <Heading weight={"light"}>Domains</Heading>
        <Button
          size={"3"}
          mt={"5"}
          onClick={() => {
            setMenuOpen(!isMenuOpen);
          }}
        >
          +Add Domain
        </Button>
        <DomainsTable />
      </Box>

      {/* Drawer */}
      <Box
        className={`${
          isMenuOpen
            ? "opacity-40 bg-black h-screen w-screen fixed top-0 left-0 z-30"
            : "hidden"
        }`}
        onClick={() => setMenuOpen(!isMenuOpen)}
      ></Box>
      <Box
        className={`${
          isMenuOpen ? "fixed" : "hidden opacity-0"
        } z-40 right-0 bottom-0 w-3/4 max-w-xl h-full bg-white drop-shadow-2xl p-6`}
      >
        <Heading weight={"medium"}>Add Domain</Heading>
        <AddDomainForm isMenuOpen={isMenuOpen} setMenuOpen={setMenuOpen} />
      </Box>
    </>
  );
};

export default App;
