import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Box } from '@mui/material';
import { getData, createData, updateData, deleteData } from '../api';

const TableComponent = ({ tableName }) => {
    const [data, setData] = useState<any>([]);
    const [open, setOpen] = useState(false);
    const [currentItem, setCurrentItem] = useState({ id: '', name: '' });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const result = await getData(tableName);
        setData(result);
    };

    const handleClickOpen = (item = { id: '', name: '' }) => {
        setCurrentItem(item);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setCurrentItem({ id: '', name: '' });
    };

    const handleSave = async () => {
        if (currentItem.id) {
            await updateData(tableName, currentItem);
        } else {
            await createData(tableName, currentItem);
        }
        fetchData();
        handleClose();
    };

    const handleDelete = async (id: any) => {
        await deleteData(tableName, id);
        fetchData();
    };

    const handleChange = (e: any) => {
        setCurrentItem({ ...currentItem, [e.target.name]: e.target.value });
    };

    return (
        <Paper>
            <Box p={1}>
                <Button variant="text" color="primary" onClick={() => handleClickOpen()}>
                    Add Item
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
                        {data.map((item: any) => (
                            <TableRow key={item.id}>
                                <TableCell>{item.id}</TableCell>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>
                                    <Button variant="contained" color="primary" onClick={() => handleClickOpen(item)}>
                                        Edit
                                    </Button>
                                    <Button variant="contained" color="secondary" onClick={() => handleDelete(item.id)}>
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{currentItem.id ? 'Edit Item' : 'Add Item'}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="name"
                        label="Name"
                        type="text"
                        fullWidth
                        value={currentItem.name}
                        onChange={handleChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSave} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </Paper>
    );
};

export default TableComponent;