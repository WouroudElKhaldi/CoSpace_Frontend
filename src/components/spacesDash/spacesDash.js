"use client";
import { Box } from "@mui/material";
import Table from "../table/table";
import useSpaceStore from "@/zustand/spaceStore";
import { useEffect, useState } from "react";
import { getAllSpaces } from "@/fetchData/spaces";
import DoneModal from "../doneModal/doneModal";

const SpacesDash = () => {
  const { spacesData, setSpacesData } = useSpaceStore();
  const [openNote, setOpenNote] = useState(false);
  const handleCloseNote = () => {
    setOpenNote(false);
  };

  useEffect(() => {
    const fetchSpaces = async () => {
      const res = await getAllSpaces();
      setSpacesData(res);
    };

    fetchSpaces();
  }, []);
  return (
    <Box>
      <button onClick={() => setOpenNote(true)}>Open Note</button>
      <Table data={spacesData && spacesData} ForWhat={"spaces"} isEdit={true} />
      <DoneModal
        type={"success"}
        message={"Space Successfuly Added"}
        open={openNote}
        handleClose={handleCloseNote}
      />
    </Box>
  );
};

export default SpacesDash;
