interface AttendanceData {
    date: string;
    leader: string;
    preacher: string;
    serviceType: string;
    brothers: number;
    sisters: number;
    visitors: number;
    children: number;
    visitingBrothers: number;
    offering: number;
}

type TotalAttendance = {
    total: number;
};