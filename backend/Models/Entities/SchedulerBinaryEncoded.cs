using System.ComponentModel.DataAnnotations.Schema;

namespace BinaryDaysOfWeekApi.Models.Entities;

public class SchedulerBinaryEncoded
{
    public int Id { get; set; }
    
    public string Name { get; set; } = string.Empty;

    /// <summary>
    /// Representation of days of the week in binary
    /// To combine the days of the week, simply add the values
    /// 1  = Sunday
    /// 2  = Monday
    /// 4  = Tuesday
    /// 8  = Wednesday
    /// 16 = Thursday
    /// 32 = Friday
    /// 64 = Saturday
    /// -- Monday (2) + Wednesday (8) = 10
    public byte? DaysOfWeek { get; set; }

    public void UpdateData(SchedulerBinaryEncoded model)
    {
        Name = model.Name;
        DaysOfWeek = model.DaysOfWeek;
    }
}
