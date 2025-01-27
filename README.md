# Learner Data Analysis

This program calculates learner performance metrics based on their submissions to assignments in a course. It computes a weighted average score for each learner and logs detailed data for each assignment.

## Key Features
- **Weighted Average Calculation**: Considers `points_possible` for each assignment to compute accurate learner averages.
- **Exclusion of Future Assignments**: Ignores assignments with due dates in the future.
- **Late Submission Penalty**: Deducts 10% of total points for submissions made after the due date.
- **Console Output**: Logs learner ID, weighted average, and individual assignment scores.

## Input Structure
- **Course Info**: Contains course ID and name.
- **Assignment Group**: Includes assignments with ID, due date, and points possible.
- **Learner Submissions**: Records learner scores and submission timestamps.

## Output
The program outputs an array of learner objects in the format:
```json
{
  "id": number,
  "avg": number,
  "<assignment_id>": number
}
