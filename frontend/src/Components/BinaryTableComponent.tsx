import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Grid2 } from '@mui/material';

const generateBinaryNumbers = (bits: number) => {
    const numberOfRows = Math.pow(2, bits);
    const binaryNumbers = [];
    const zero = 0;
    binaryNumbers.push({ decimal: zero, binary: zero.toString(2).padStart(bits, '0') });
    for (let i = 1; i < numberOfRows; i = i * 2) {
        binaryNumbers.push({ decimal: i, binary: i.toString(2).padStart(bits, '0') });
    }
    return binaryNumbers;
};

const BinaryTable: React.FC = () => {
    const binaryNumbers = generateBinaryNumbers(8);

    return (
        <Grid2 size={12}>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Decimal</TableCell>
                            <TableCell>Binary</TableCell>
                            <TableCell>Binary Reverse</TableCell>
                            <TableCell>S</TableCell>
                            <TableCell>M</TableCell>
                            <TableCell>T</TableCell>
                            <TableCell>W</TableCell>
                            <TableCell>T</TableCell>
                            <TableCell>F</TableCell>
                            <TableCell>S</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {binaryNumbers.map((result, index) => (
                            <TableRow key={index}>
                                <TableCell>{result.decimal}</TableCell>
                                <TableCell>{result.binary}</TableCell>
                                <TableCell>{result.binary.split("").reverse().join("")}</TableCell>
                                <TableCell>{result.binary.split("").reverse()[0]}</TableCell>
                                <TableCell>{result.binary.split("").reverse()[1]}</TableCell>
                                <TableCell>{result.binary.split("").reverse()[2]}</TableCell>
                                <TableCell>{result.binary.split("").reverse()[3]}</TableCell>
                                <TableCell>{result.binary.split("").reverse()[4]}</TableCell>
                                <TableCell>{result.binary.split("").reverse()[5]}</TableCell>
                                <TableCell>{result.binary.split("").reverse()[6]}</TableCell>
                                <TableCell>{result.binary.split("").reverse()[7]}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Grid2>
    );
};

export default BinaryTable;