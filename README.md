# GPA Xcelerator

A Python script to calculate the current GPA and determine the required GPA for the next term to achieve a target cumulative GPA.

## Features

- Calculate current GPA based on a list of subjects with credit hours and scores.
- Determine the required GPA for the next term to reach a target cumulative GPA.

## Installation

1. Clone the repository:

    ```sh
    git clone https://github.com/your-username/GPA-Xcelerator.git
    cd GPA-Xcelerator
    ```

## Usage

1. Edit the `subjects` list in `gpa_calculator.py` with your subjects, credit hours, and scores.

    ```python
    subjects = [
        {"name": "Math", "creditHours": 3, "score": "A"},
        {"name": "History", "creditHours": 4, "score": "B+"},
        {"name": "Science", "creditHours": 2, "score": 3.7},
    ]
    ```

2. Set your target GPA and the credit hours for the next term:

    ```python
    target_gpa = 3.72
    next_term_credits = 18
    ```

3. Run the script:

    ```sh
    python gpa_calculator.py
    ```

4. The script will output your current GPA and the required GPA for the next term:

    ```sh
    Total Points: 22.1
    Total Credit Hours: 6
    Current GPA: 3.68
    To achieve a cumulative GPA of 3.72, you need a GPA of 3.75 in the next term of 18 credit hours.
    ```


## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

