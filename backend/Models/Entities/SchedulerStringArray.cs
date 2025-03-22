namespace BinaryDaysOfWeekApi.Models.Entities;

public class SchedulerStringArray
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string[]? DaysOfWeek { get; set; }

    public void UpdateData(SchedulerStringArray model)
    {
        Name = model.Name;
        DaysOfWeek = model.DaysOfWeek;
    }
}
