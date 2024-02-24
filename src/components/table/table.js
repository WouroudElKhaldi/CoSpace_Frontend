"use client";

import { useState, useEffect } from "react";
import { Avatar, Box, IconButton } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Grid from "@mui/material/Unstable_Grid2";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const Table = ({
  data,
  isEdit,
  ForWhat,
  handleEditOpen,
  setSelectedRowData,
  handleOpenDelete,
}) => {
  const [columns, setColumns] = useState([]);
  const [error, setError] = useState(false);
  const buton = isEdit === true ? true : false;

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => {
      const newWidth = window.innerWidth;
      setScreenWidth(newWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleEdit = (e, row) => {
    e.preventDefault();
    handleEditOpen(row);
    setSelectedRowData(row);
  };

  const handleDelete = (e, row) => {
    e.preventDefault();
    handleOpenDelete(row);
    setSelectedRowData(row);
  };

  let visibleFields;
  useEffect(() => {
    try {
      if (ForWhat === "spaces") {
        visibleFields = ["name", "address", "description", "status"];
      } else if (ForWhat === "users") {
        visibleFields = [
          "fullName",
          "role",
          "email",
          "phoneNumber",
          "verificationCode",
          "deleteCode",
          "status",
          "image",
        ];
      } else if (ForWhat === "categories") {
        visibleFields = ["name", "name_AR"];
      } else if (ForWhat === "orders") {
        visibleFields = [
          "number",
          "userId",
          "products",
          "totalPrice",
          "address",
          "city",
          "country",
          "status",
        ];
      } else if (ForWhat === "clients") {
        visibleFields = ["name", "image", "location"];
      } else if (ForWhat === "blogs") {
        visibleFields = [
          "title_en",
          "title_ar",
          "description_en",
          "description_ar",
          "video",
          "images",
        ];
      } else {
        visibleFields = Object.keys(data[0]);
      }

      const updatedColumns = visibleFields.map((field) => ({
        field,
        headerName: field,
        flex: screenWidth < 1000 ? 0 : 1,
        renderCell: (params) => {
          if (field === "image" && params.row.image) {
            return (
              <img
                src={`${process.env.REACT_APP_IMAGE_PATH}/${
                  params.row.image ? params.row.image : ""
                }`} // Assuming the "icon" field contains the image URL
                alt="Icon"
                style={{ width: "140px", height: "100px" }}
              />
            );
          }
          if (field === "image" && !params.row.image) {
            return <Avatar alt={params.row.firstName} />;
          }
          if (field === "color" && params.row.color) {
            const color = params.row.color.hex;
            return (
              <div
                style={{
                  backgroundColor: color,
                  width: "1.5rem",
                  height: "1.5rem",
                  borderRadius: "50%",
                }}
              ></div>
            );
          }
          if (field === "price" && params.row.price) {
            const price = params.row.price;
            return <div>${price}</div>;
          }

          if (
            field === "userId" &&
            params.row.userId.firstName &&
            params.row.userId.lastName
          ) {
            return (
              <p
                style={{
                  color: "black",
                }}
              >
                {params.row.userId.firstName + " " + params.row.userId.lastName}
              </p>
            );
          }

          if (field === "category" && params.row.category) {
            return (
              <p
                style={{
                  color: "black",
                }}
              >
                {params.row.category.name}
              </p>
            );
          }
          return params.value;
        },
      }));

      if (buton === true) {
        updatedColumns.push({
          field: "actions",
          headerName: "Actions",
          renderCell: (params) => (
            <Grid
              container
              md={12}
              sx={{
                display: "flex",
                justifyContent: "center",
                minWidth: "5rem",
              }}
            >
              <IconButton onClick={(e) => handleEdit(e, params.row)}>
                <EditIcon
                  sx={{
                    ":hover": {
                      color: "red !important",
                    },
                  }}
                />
              </IconButton>
              <IconButton onClick={(e) => handleDelete(e, params.row)}>
                <DeleteIcon
                  sx={{
                    ":hover": {
                      color: "red !important",
                    },
                  }}
                />
              </IconButton>
            </Grid>
          ),
        });
      }

      setColumns(updatedColumns);
      setError(false);
    } catch (error) {
      setError(true);
      console.error(error);
    }
  }, [ForWhat, buton, data, screenWidth]);

  return (
    <>
      <Box
        sx={{
          height: 818,
          mt: "2rem",
          mb: "2rem",
        }}
      >
        <DataGrid
          showCellVerticalBorder
          showColumnVerticalBorder
          isCellEditable={(GridCellParams) => false}
          columns={columns}
          rows={data}
          getRowId={(row) => row._id}
          pageSizeOptions={[5, 10, 20, 100]}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          slots={{ toolbar: GridToolbar }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
            },
          }}
          sx={{
            width: "100%",
            transition: "all 0.05s ease",
            p: "1rem",
            rowGap: "1rem",
            borderRadius: "20px",
            "& .MuiToolbar-root , .MuiInputBase-input , .MuiDataGrid-columnHeaderTitleContainer , .MuiDataGrid-cell":
              {
                color: "black",
              },
            "& .MuiButtonBase-root ": {
              color: "#4d6188",
            },
            ".MuiSvgIcon-root ": {
              color: "#8b0000",
            },
            "& .MuiDataGrid-root , .MuiDataGrid-colCell, .MuiDataGrid-root , .MuiDataGrid-cell":
              {
                maxHeight: "100px !important",
              },
            ".MuiDataGrid-cell": {
              paddingLeft: "0.5rem",
            },
            ".MuiDataGrid-toolbarContainer": {
              fontWeight: "700",
              borderRadius: "15px",
              bgcolor: "#ededf5",
              p: "0 1rem",
            },
            ".MuiDataGrid-main , .MuiDataGrid-footerContainer": {
              bgcolor: "#ededf5",
              borderRadius: "15px",
            },
            "& .MuiDataGrid-root > *": {
              height: "100%",
            },
            "& .MuiInputBase-root , & .MuiInputBase-input": {
              color: "#000",
            },
            "& .css-v4u5dn-MuiInputBase-root-MuiInput-root:after": {
              borderBottomColor: "#4d6188",
            },
            " & .Mui-selected ": {
              bgcolor: "#4d6188 !important",
            },
            "& .MuiDataGrid-row": {
              height: "90px !important",
              maxHeight: "90px !important",
            },
            "& .Mui-hovered": {
              bgcolor: " #4d61886e !important",
            },
            "& .Mui-selected": {
              bgcolor: "#4d61886e !important",
            },
            "& .MuiDataGrid-columnHeaders , & .MuiDataGrid-toolbarContainer , & .MuiDataGrid-footerContainer":
              {
                height: "100px !important",
                maxHeight: "100px !important",
                fontSize: "1.2rem",
                mb: screenWidth < 500 ? "1rem" : "0",
              },
            "& .MuiDataGrid-columnHeaderTitleContainer": {
              color: "#4d6188 !important",
              padding: "0 1rem",
            },
            " .MuiDataGrid-columnHeader--sortable": {
              width: "12rem !important",
              maxWidth: "12rem !important",
              minWidth: "6px !important",
              maxHeight: "90px !important",
            },
            ".MuiDataGrid-cell": {
              width: "12rem",
              maxWidth: "12rem !important",
              minWidth: "6px !important",
              maxHeight: "90px !important",
              height: "90px",
              padding: "0 1.2rem",
              overflowX: "scroll !important",
              overflowY: "hidden",
            },
            "& .MuiSelect-select , & .MuiTablePagination-select , & .MuiSelect-standard MuiInputBase-input css-194a1fa-MuiSelect-select-MuiInputBase-input":
              {
                color: "#4d6188 !important",
              },
            ".MuiDataGrid-cell--withRenderer .MuiDataGrid-cell ": {
              minWidth: "6rem",
              width: "6rem",
            },
            "& .MuiDataGrid-scrollbar": {
              // Style the scrollbar track
              width: "8px",
            },
            "& .MuiDataGrid-scrollbarThumb": {
              // Style the scrollbar thumb
              backgroundColor: "#ccc",
              borderRadius: "4px",
            },
          }}
        />
      </Box>
    </>
  );
};

export default Table;
