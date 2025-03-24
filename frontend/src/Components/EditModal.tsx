import {
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid2,
    Stack,
    TextField,
    ToggleButton,
    ToggleButtonGroup
} from "@mui/material";
import { useEffect, useState } from "react";
import { customAxios } from "../api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
    DaysOfWeek,
    DaysOfWeekArray,
    SchedulerDto,
    EditModalProps
} from "../dto";
import { AxiosResponse } from "axios";

export const EditModal = ({
    tableName,
    itemId,
    setItemId,
    refetch
}: EditModalProps) => {
    const [open, setOpen] = useState(false);

    const [stringArray, setStringArray] = useState<string[]>([]);

    const [binaryValue, setBinaryValue] = useState<string>("");

    const queryClient = useQueryClient();

    const { data, isLoading } = useQuery({
        queryKey: [tableName, { id: itemId }],
        queryFn: async () => {
            if (itemId === null || itemId === 0) {
                return {};
            }
            const response = await customAxios.get(`${tableName}/${itemId}`);
            return response.data;
        }
    });

    const { mutateAsync } = useMutation({
        mutationFn: async (data: SchedulerDto) => {
            let response: AxiosResponse<unknown, unknown> | null = null;
            if (itemId !== null && itemId !== 0) {
                response = await customAxios.put(
                    `${tableName}/${itemId}`,
                    data
                );
            } else {
                response = await customAxios.post(`${tableName}`, data);
            }
            return response;
        }
    });

    useEffect(() => {
        setOpen(itemId !== null);
    }, [itemId]);

    useEffect(() => {
        if (typeof data?.daysOfWeek === "number") {
            const binaryStr = data?.daysOfWeek.toString(2).padStart(8, "0");
            setBinaryValue(binaryStr);
            binaryToArray(binaryStr);
        }

        if (typeof data?.daysOfWeek === "object") {
            setStringArray(data?.daysOfWeek);
        }
    }, [data]);

    const handleClose = () => {
        setItemId(null);
        setBinaryValue("");
        setStringArray([]);
        setOpen(false);
    };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        queryClient.setQueryData(
            [tableName, { id: itemId }],
            (oldData: SchedulerDto) => ({
                ...oldData,
                name: e.target.value
            })
        );
    };

    const handleToogleButton = (
        _event: React.MouseEvent<HTMLElement>,
        newDays: string[]
    ) => {
        let decimalValue = 0;
        newDays.forEach((val) => {
            switch (val) {
                case DaysOfWeek.Sunday:
                    decimalValue += 1;
                    break;
                case DaysOfWeek.Monday:
                    decimalValue += 2;
                    break;
                case DaysOfWeek.Tuesday:
                    decimalValue += 4;
                    break;
                case DaysOfWeek.Wednesday:
                    decimalValue += 8;
                    break;
                case DaysOfWeek.Thursday:
                    decimalValue += 16;
                    break;
                case DaysOfWeek.Friday:
                    decimalValue += 32;
                    break;
                case DaysOfWeek.Saturday:
                    decimalValue += 64;
                    break;
            }
        });
        setBinaryValue(decimalValue.toString(2).padStart(8, "0"));
        setStringArray(newDays);
    };

    const binaryToArray = (binary: string) => {
        binary
            .split("")
            .reverse()
            .forEach((val, index) => {
                if (val === "1") {
                    setStringArray((oldArray) => [
                        ...oldArray,
                        DaysOfWeekArray[index]
                    ]);
                } else {
                    setStringArray((oldArray) =>
                        oldArray.filter(
                            (item) => item !== DaysOfWeekArray[index]
                        )
                    );
                }
            });
    };

    const handleChangeBinary = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (/^[01]{0,8}$/.test(value)) {
            setBinaryValue(value);
            binaryToArray(value);
        } else {
            setBinaryValue(value.slice(0, -1));
        }
    };

    const handleChangeDecimal = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value;
        if (!value) {
            value = "0";
        }
        const binaryStr = parseInt(value).toString(2).padStart(8, "0");
        setBinaryValue(binaryStr);
        binaryToArray(binaryStr);
    };

    const rendeSpecificFields = () => {
        switch (tableName) {
            case "SchedulerBinaryEncoded":
                return (
                    <Grid2 container spacing={2}>
                        <Grid2
                            container
                            justifyContent="center"
                            size={{ xs: 12 }}
                        >
                            <ToggleButtonGroup
                                value={stringArray}
                                onChange={handleToogleButton}
                            >
                                <ToggleButton value={DaysOfWeek.Sunday}>
                                    Sun
                                </ToggleButton>
                                <ToggleButton value={DaysOfWeek.Monday}>
                                    Mon
                                </ToggleButton>
                                <ToggleButton value={DaysOfWeek.Tuesday}>
                                    Tue
                                </ToggleButton>
                                <ToggleButton value={DaysOfWeek.Wednesday}>
                                    Wed
                                </ToggleButton>
                                <ToggleButton value={DaysOfWeek.Thursday}>
                                    Thu
                                </ToggleButton>
                                <ToggleButton value={DaysOfWeek.Friday}>
                                    Fri
                                </ToggleButton>
                                <ToggleButton value={DaysOfWeek.Saturday}>
                                    Sat
                                </ToggleButton>
                            </ToggleButtonGroup>
                        </Grid2>
                        <Grid2 size={{ xs: 6 }}>
                            <TextField
                                label="Decimal"
                                fullWidth
                                type="number"
                                slotProps={{
                                    htmlInput: {
                                        min: 0,
                                        max: 128
                                    }
                                }}
                                value={parseInt(binaryValue, 2)}
                                onChange={handleChangeDecimal}
                            />
                        </Grid2>
                        <Grid2 size={{ xs: 6 }}>
                            <TextField
                                label="Binary"
                                fullWidth
                                slotProps={{
                                    htmlInput: {
                                        maxLength: 8,
                                        pattern: "^[01]{0,8}$"
                                    }
                                }}
                                value={binaryValue}
                                onChange={handleChangeBinary}
                            />
                        </Grid2>
                    </Grid2>
                );
            case "SchedulerEnum":
                return <>Enum</>;
            case "SchedulerStringArray":
                return <>String Array</>;
            default:
                return <></>;
        }
    };

    const handleSave = async () => {
        switch (tableName) {
            case "SchedulerBinaryEncoded":
                await mutateAsync({
                    id: itemId ?? 0,
                    name: data?.name,
                    daysOfWeek: parseInt(binaryValue, 2)
                });
                break;
            case "SchedulerEnum":
                break;
            case "SchedulerStringArray":
                await mutateAsync({
                    id: itemId ?? 0,
                    name: data?.name,
                    daysOfWeek: stringArray
                });
                break;
            default:
                break;
        }
        handleClose();
        refetch?.();
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>{itemId !== 0 ? "Edit Item" : "Add Item"}</DialogTitle>
            <DialogContent>
                <Stack p={2} spacing={2}>
                    {isLoading ? (
                        <CircularProgress />
                    ) : (
                        <>
                            <TextField
                                autoFocus
                                margin="dense"
                                name="name"
                                label="Name"
                                type="text"
                                fullWidth
                                value={data?.name ?? ""}
                                onChange={handleNameChange}
                            />
                            {rendeSpecificFields()}
                        </>
                    )}
                </Stack>
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
    );
};
