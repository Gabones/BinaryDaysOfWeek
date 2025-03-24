import { useState } from "react";
import {
    Button,
    Container,
    CssBaseline,
    Divider,
    Grid2 as Grid,
    IconButton,
    Stack,
    ThemeProvider,
    Typography
} from "@mui/material";
import TableComponent from "./Components/TableComponent";
import BinaryTable from "./Components/BinaryTableComponent";
import { darkTheme, lightTheme } from "./themes";
import { DarkMode, LightMode } from "@mui/icons-material";

const App = () => {
    const [isDarkMode, setIsDarkMode] = useState(
        localStorage.getItem("dark-mode") === "true"
    );

    const toggleTheme = () => {
        const newMode = !isDarkMode;
        localStorage.setItem("dark-mode", newMode.toString());
        setIsDarkMode(!isDarkMode);
    };

    return (
        <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
            <CssBaseline />
            <Container>
                <Stack spacing={4}>
                    <Grid
                        container
                        justifyContent={"space-between"}
                        alignItems={"center"}
                        spacing={4}
                    >
                        <Grid container>
                            <Typography variant="h4" gutterBottom>
                                CRUD Interface
                            </Typography>
                        </Grid>
                        <Grid>
                            <IconButton
                                color={isDarkMode ? "warning" : "primary"}
                                onClick={toggleTheme}
                            >
                                {isDarkMode ? <LightMode /> : <DarkMode />}
                            </IconButton>
                        </Grid>
                    </Grid>
                    <Grid container spacing={4}>
                        <Grid size={{ xs: 12, md: 4 }}>
                            <TableComponent tableName="SchedulerBinaryEncoded" />
                        </Grid>
                        <Grid size={{ xs: 12, md: 4 }}>
                            <TableComponent tableName="SchedulerEnum" />
                        </Grid>
                        <Grid size={{ xs: 12, md: 4 }}>
                            <TableComponent tableName="SchedulerStringArray" />
                        </Grid>
                    </Grid>
                    <Divider />
                    <Grid
                        container
                        justifyContent={"space-between"}
                        alignItems={"bottom"}
                        spacing={4}
                    >
                        <Grid>
                            <Typography variant="h4" gutterBottom>
                                Binary Representation
                            </Typography>
                        </Grid>
                        <Grid>
                            <Button variant="contained" color="primary">
                                Add
                            </Button>
                        </Grid>
                    </Grid>
                    <Grid container spacing={4}>
                        <BinaryTable />
                    </Grid>
                </Stack>
            </Container>
        </ThemeProvider>
    );
};

export default App;
