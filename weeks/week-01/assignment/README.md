# Week 1 assignment — Process course enrollment records

Create a small JavaScript command-line program that reads JSON data containing enrollment records and produces a clear summary.

## Input

Each enrollment has `id`, `studentName`, `course`, `status` (`active` or `completed`) and `progress` (number from 0 to 100).

## Requirements

1. Read the data from a JSON file (a supplied starter file or a small dataset you create).
2. Validate the records: unique positive integer IDs, non-empty names/courses, valid status, numeric progress within 0–100.
3. Filter enrollments by status.
4. Map the results to public fields (`id`, `studentName`, `course`, `progress`).
5. Calculate the total record count, number of active/completed enrollments and average progress.
6. Handle missing files, malformed JSON and invalid records with an understandable error message.
7. Include a README showing how to run the program and at least two expected outputs. Provide one example of invalid input.
8. Push to your own GitHub repository and explain any AI assistance you used.

## Sample record

```json
{"id":1,"studentName":"Hana","course":"Backend","status":"active","progress":45}
```

## Submission

Share the repository link through the BeXpert LMS. Be ready to demonstrate your program and explain one validation decision and one array transformation.

**Evaluation:** correctness (30%), engineering reasoning (25%), error cases/testing (20%), readability (15%), documentation and AI transparency (10%).
