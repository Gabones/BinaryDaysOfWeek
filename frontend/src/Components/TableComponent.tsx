import { useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Box,
    IconButton,
    Grid2,
    CircularProgress
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { customAxios } from "../api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Delete, Edit } from "@mui/icons-material";
import { EditModal } from "./EditModal";
import { SchedulerDto, TableComponentProps } from "../dto";

const TableComponent = ({ tableName }: TableComponentProps) => {
    const [itemId, setItemId] = useState<number | undefined | null>(null);

    const { data, isLoading, refetch } = useQuery<SchedulerDto[]>({
        queryKey: [tableName],
        queryFn: async () => {
            const response = await customAxios.get(tableName);
            return response.data;
        }
    });

    const { mutateAsync } = useMutation({
        mutationFn: async (itemId: number) => {
            const response = await customAxios.delete(`${tableName}/${itemId}`);
            return response;
        }
    });

    const handleClickOpen = (id: number | undefined | null) => () => {
        setItemId(id);
    };

    const handleDelete = (id: number) => async () => {
        await mutateAsync(id);
    };

    return (
        <Paper>
            <Box p={1}>
                <Button
                    startIcon={<AddIcon />}
                    variant="text"
                    color="primary"
                    onClick={handleClickOpen(0)}
                    sx={{ textTransform: "none" }}
                >
                    {tableName}
                </Button>
            </Box>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {isLoading && !data ? (
                            <TableRow>
                                <TableCell colSpan={3}>
                                    <Grid2
                                        container
                                        justifyContent="center"
                                        alignItems="center"
                                        p={2}
                                    >
                                        <CircularProgress />
                                    </Grid2>
                                </TableCell>
                            </TableRow>
                        ) : (
                            data?.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell>{item.id}</TableCell>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>
                                        <Grid2 container spacing={2}>
                                            <IconButton
                                                color="primary"
                                                onClick={handleClickOpen(
                                                    item.id
                                                )}
                                            >
                                                <Edit />
                                            </IconButton>
                                            <IconButton
                                                color="error"
                                                onClick={handleDelete(item.id)}
                                            >
                                                <Delete />
                                            </IconButton>
                                        </Grid2>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <EditModal
                tableName={tableName}
                itemId={itemId}
                setItemId={setItemId}
                refetch={refetch}
            />
        </Paper>
    );
};

export default TableComponent;
