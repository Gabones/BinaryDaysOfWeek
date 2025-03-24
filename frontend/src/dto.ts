export interface SchedulerBinaryEncodedDto {
    id: number;
    name: string;
    daysOfWeek: number;
}

export interface SchedulerEnumDto {
    id: number;
    name: string;
    sunday: Allow;
    monday: Allow;
    tuesday: Allow;
    wednesday: Allow;
    thursday: Allow;
    friday: Allow;
    saturday: Allow;
}

export enum Allow {
    Allow,
    Deny,
    NotSet
}

export interface SchedulerStringArrayDto {
    id: number;
    name: string;
    daysOfWeek: string[];
}

export type TableNames =
    | "SchedulerBinaryEncoded"
    | "SchedulerEnum"
    | "SchedulerStringArray";

export enum DaysOfWeek {
    Sunday = "Sunday",
    Monday = "Monday",
    Tuesday = "Tuesday",
    Wednesday = "Wednesday",
    Thursday = "Thursday",
    Friday = "Friday",
    Saturday = "Saturday"
}

export const DaysOfWeekArray = [
    DaysOfWeek.Sunday,
    DaysOfWeek.Monday,
    DaysOfWeek.Tuesday,
    DaysOfWeek.Wednesday,
    DaysOfWeek.Thursday,
    DaysOfWeek.Friday,
    DaysOfWeek.Saturday
];

export type SchedulerDto =
    | SchedulerBinaryEncodedDto
    | SchedulerEnumDto
    | SchedulerStringArrayDto;

export interface TableComponentProps {
    tableName: TableNames;
}

export interface EditModalProps {
    tableName: TableNames;
    itemId: number | null | undefined;
    setItemId: React.Dispatch<React.SetStateAction<number | null | undefined>>;
    refetch?: () => void;
}
