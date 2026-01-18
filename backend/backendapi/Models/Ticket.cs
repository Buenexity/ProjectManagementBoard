namespace ProjectBoard.Models;

public class Ticket
{
    public int id { get; set; }
    public string? title { get; set; }
    public string? description { get; set; }
    public string? status { get; set; }
    public string? category { get; set; }
}
