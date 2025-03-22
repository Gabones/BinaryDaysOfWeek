using BinaryDaysOfWeekApi.Models.Enums;

namespace BinaryDaysOfWeekApi.Models.Entities;

public class SchedulerEnum
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public Allow? Sunday { get; set; }
    public Allow? Monday { get; set; }
    public Allow? Tuesday { get; set; }
    public Allow? Wednesday { get; set; }
    public Allow? Thursday { get; set; }
    public Allow? Friday { get; set; }
    public Allow? Saturday { get; set; }

    public void UpdateData(SchedulerEnum model)
    {
        Name = model.Name;
        Sunday = model.Sunday;
        Monday = model.Monday;
        Tuesday = model.Tuesday;
        Wednesday = model.Wednesday;
        Thursday = model.Thursday;
        Friday = model.Friday;
        Saturday = model.Saturday;
    }
}
