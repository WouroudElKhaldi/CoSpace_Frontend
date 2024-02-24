"use client";
import { Box } from "@mui/material";
import Table from "../../table/table";
import useUserStore from "@/zustand/userStore";
import { useContext, useEffect, useState } from "react";
import DoneModal from "../../doneModal/doneModal";
import DeleteUSerModal from "../userModal/deleteUserModal";
import styles from "../spacesDash/spaceDash.module.css";
import { AuthContext } from "@/context/authContext";
import UserModal from "../userModal/userModal";
import { getAllUsers } from "@/fetchData/users";

const UserDash = () => {
  const { user } = useContext(AuthContext);
  const { userData, setUserData } = useUserStore();
  const [openNote, setOpenNote] = useState({
    open: false,
    status: "",
    message: "",
  });
  const [selectedRowData, setSelectedRowData] = useState({});
  const [success, setSuccess] = useState({});
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const handleCloseNote = () => {
    setOpenNote({
      open: false,
      status: "",
      message: "",
    });
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await getAllUsers();
      setUserData(response);
    };

    fetchUsers();
  }, [success]);
  return (
    <Box>
      <div className={styles.h1_container}>
        <h1 className={styles.h1}>Manage Users</h1>
        <button className={styles.button} onClick={() => setOpenAdd(true)}>
          Add User
        </button>
      </div>
      <Table
        data={userData && userData}
        ForWhat={"users"}
        isEdit={true}
        handleOpenDelete={() => setOpenDelete(true)}
        handleEditOpen={() => setOpenEdit(true)}
        setSelectedRowData={setSelectedRowData}
      />
      <DoneModal
        type={openNote.status}
        message={openNote.message}
        open={openNote.open}
        handleClose={handleCloseNote}
      />
      <UserModal
        type="add"
        open={openAdd}
        selectedRowData={selectedRowData}
        handleClose={() => setOpenAdd(false)}
        setOpenNote={setOpenNote}
        setSuccess={setSuccess}
      />
      <UserModal
        type="edit"
        open={openEdit}
        selectedRowData={selectedRowData}
        handleClose={() => setOpenEdit(false)}
        setOpenNote={setOpenNote}
        setSuccess={setSuccess}
      />
      <DeleteUSerModal
        openDelete={openDelete}
        handleClose={() => setOpenDelete(false)}
        selectedRowData={selectedRowData}
        setOpenNote={setOpenNote}
        setSuccessDelete={setSuccess}
      />
    </Box>
  );
};

export default UserDash;
