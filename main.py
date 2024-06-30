# Define the grading scale
grading_scale = {
    'A': 4.0,
    'A-': 3.7,
    'B+': 3.3,
    'B': 3.0,
    'B-': 2.7,
    'C+': 2.3,
    'C': 2.0,
    'C-': 1.7,
    'D+': 1.3,
    'D': 1.0,
    'F': 0.0
}

# Function to convert score to points
def convert_score_to_points(score):
    if isinstance(score, str):
        if score in grading_scale:
            return grading_scale[score]
        try:
            return float(score)
        except ValueError:
            raise ValueError(f"Invalid score format: {score}")
    elif isinstance(score, (int, float)):
        return score
    else:
        raise ValueError("Invalid score format")

# Parameters for the target GPA and next term's total credit hours
target_gpa = 3.72
next_term_credits = 18

# Define a list of subjects with sample data
subjects = [
    {"name": "Sample Subject", "creditHours": 3, "score": 4.0},
    {"name": "Sample Subject", "creditHours": 3, "score": 4.0},
    {"name": "Sample Subject", "creditHours": 3, "score": 3.7},
    {"name": "Sample Subject", "creditHours": 3, "score": 3.0},
    {"name": "Sample Subject", "creditHours": 2, "score": 4.0},
    {"name": "Sample Subject", "creditHours": 2, "score": 4.0},
    {"name": "Sample Subject", "creditHours": 1, "score": 4.0},
    {"name": "Sample Subject", "creditHours": 1, "score": 4.0},
    {"name": "Sample Subject", "creditHours": 0, "score": 3.3},
    {"name": "Sample Subject", "creditHours": 3, "score": 4.0},
    {"name": "Sample Subject", "creditHours": 3, "score": 4.0},
    {"name": "Sample Subject", "creditHours": 3, "score": 2.7},
    {"name": "Sample Subject", "creditHours": 2, "score": 3.7},
    {"name": "Sample Subject", "creditHours": 1, "score": 4.0},
    {"name": "Sample Subject", "creditHours": 2, "score": 3.3},
    {"name": "Sample Subject", "creditHours": 2, "score": 4},
    {"name": "Sample Subject", "creditHours": 2, "score": 3},
    {"name": "Sample Subject", "creditHours": 3, "score": 3.7},
    {"name": "Sample Subject", "creditHours": 3, "score": 4},
    {"name": "Sample Subject", "creditHours": 2, "score": 3.7},
    {"name": "Sample Subject", "creditHours": 3, "score": 2.7},
    {"name": "Sample Subject", "creditHours": 2, "score": 3.7},
    {"name": "Sample Subject", "creditHours": 2, "score": 4},
    {"name": "Sample Subject", "creditHours": 3, "score": 3.7},
    {"name": "Sample Subject", "creditHours": 3, "score": 3.7},
    {"name": "Sample Subject", "creditHours": 3, "score": 3.3},
    {"name": "Sample Subject", "creditHours": 3, "score": 4.0},
    {"name": "Sample Subject", "creditHours": 2, "score": 2.3},
    {"name": "Sample Subject", "creditHours": 1, "score": 4.0},
    {"name": "Sample Subject", "creditHours": 3, "score": 4.0},
    {"name": "Sample Subject", "creditHours": 3, "score": 3.3},
    {"name": "Sample Subject", "creditHours": 3, "score": 4.0},
    {"name": "Sample Subject", "creditHours": 3, "score": 4.0},
    {"name": "Sample Subject", "creditHours": 3, "score": 4.0},
    {"name": "Sample Subject", "creditHours": 3, "score": 3.3},
    {"name": "Sample Subject", "creditHours": 3, "score": 4.0},
    {"name": "Sample Subject", "creditHours": 3, "score": 3.7}
]

# Function to calculate current GPA
def calculate_gpa(subjects):
    total_points = 0
    total_credit_hours = 0

    for subject in subjects:
        credit_hours = subject["creditHours"]
        score = subject["score"]
        points = convert_score_to_points(score)
        
        total_points += credit_hours * points
        total_credit_hours += credit_hours

    gpa = total_points / total_credit_hours if total_credit_hours else 0
    return total_points, total_credit_hours, gpa

# Function to calculate required GPA for next term
def required_gpa_for_next_term(current_points, current_credits, next_term_credits, target_gpa):
    required_points = target_gpa * (current_credits + next_term_credits) - current_points
    required_gpa = required_points / next_term_credits
    return required_gpa

# Calculate current GPA
total_points, total_credit_hours, current_gpa = calculate_gpa(subjects)


# Calculate required GPA for next term to reach the target cumulative GPA
required_gpa = required_gpa_for_next_term(total_points, total_credit_hours, next_term_credits, target_gpa)

# Print the results
print(f"Total Points: {total_points}")
print(f"Total Credit Hours: {total_credit_hours}")
print(f"Current GPA: {current_gpa:.2f}")
print(f"To achieve a cumulative GPA of {target_gpa}, you need a GPA of {required_gpa:.2f} in the next term of {next_term_credits} credit hours.")
