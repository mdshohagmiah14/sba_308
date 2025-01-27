function getLearnerData(course, ag, submissions) {
    // Validate input data
    try {
      if (ag.course_id !== course.id) {
        throw new Error("Assignment Group does not belong to the specified Course.");
      }
  
      if (!Array.isArray(submissions)) {
        throw new Error("Submissions should be an array.");
      }
  
      const currentDate = new Date();
  
      const results = [];
      const learners = {}; // Temporary object to accumulate learner data
  
      for (const submission of submissions) {
        const { learner_id, assignment_id, submission: subData } = submission;
        const assignment = ag.assignments.find((a) => a.id === assignment_id);
  
        if (!assignment) {
          console.warn(`Assignment with ID ${assignment_id} not found in Assignment Group.`);
          continue;
        }
  
        // Skip assignments not yet due
        if (new Date(assignment.due_at) > currentDate) {
          continue;
        }
  
        // Validate points_possible
        if (typeof assignment.points_possible !== "number" || assignment.points_possible <= 0) {
          console.warn(`Invalid points_possible for assignment ID ${assignment_id}. Skipping.`);
          continue;
        }
  
        // Calculate score percentage, apply late penalty if needed
        let score = subData.score;
        if (new Date(subData.submitted_at) > new Date(assignment.due_at)) {
          score = Math.max(score - 0.1 * assignment.points_possible, 0); // Deduct 10% late penalty
        }
  
        const percentage = (score / assignment.points_possible) * 100;
  
        // Break if an anomaly in percentage is detected (example condition for using break)
        if (percentage > 100) {
          console.warn(`Score percentage exceeds 100% for learner ID ${learner_id}, assignment ID ${assignment_id}. Breaking.`);
          break;
        }
  
        // Initialize learner object if not already
        if (!learners[learner_id]) {
          learners[learner_id] = { id: learner_id, totalScore: 0, totalPossible: 0, assignments: {} };
        }
  
        // Update learner's data
        learners[learner_id].totalScore += score;
        learners[learner_id].totalPossible += assignment.points_possible;
        learners[learner_id].assignments[assignment_id] = parseFloat(percentage.toFixed(2));
      }
  
      // Format results for output
      for (const [learner_id, data] of Object.entries(learners)) {
        results.push({
          id: parseInt(learner_id),
          avg: parseFloat(((data.totalScore / data.totalPossible) * 100).toFixed(2)),
          ...data.assignments,
        });
      }
  
      return results;
    } catch (error) {
      console.error("Error processing data:", error.message);
      return [];
    }
  }
  
  // Test the function
  const CourseInfo = {
    id: 451,
    name: "Introduction to JavaScript",
  };
  
  const AssignmentGroup = {
    id: 12345,
    name: "Fundamentals of JavaScript",
    course_id: 451,
    group_weight: 25,
    assignments: [
      {
        id: 1,
        name: "Declare a Variable",
        due_at: "2023-01-25",
        points_possible: 50,
      },
      {
        id: 2,
        name: "Write a Function",
        due_at: "2023-02-27",
        points_possible: 150,
      },
      {
        id: 3,
        name: "Code the World",
        due_at: "3156-11-15",
        points_possible: 500,
      },
    ],
  };
  
  const LearnerSubmissions = [
    {
      learner_id: 125,
      assignment_id: 1,
      submission: {
        submitted_at: "2023-01-25",
        score: 47,
      },
    },
    {
      learner_id: 125,
      assignment_id: 2,
      submission: {
        submitted_at: "2023-02-12",
        score: 150,
      },
    },
    {
      learner_id: 125,
      assignment_id: 3,
      submission: {
        submitted_at: "2023-01-25",
        score: 400,
      },
    },
    {
      learner_id: 132,
      assignment_id: 1,
      submission: {
        submitted_at: "2023-01-24",
        score: 39,
      },
    },
    {
      learner_id: 132,
      assignment_id: 2,
      submission: {
        submitted_at: "2023-03-07",
        score: 140,
      },
    },
  ];
  
  console.log(getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions));
  