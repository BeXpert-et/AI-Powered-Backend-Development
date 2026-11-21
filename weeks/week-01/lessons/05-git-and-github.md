# Lesson 1.5 — Git and GitHub

**Format:** Self-study video and a short practical reference.

## Recommended video

[Git & GitHub Crash Course for Beginners — freeCodeCamp.org](https://www.youtube.com/watch?v=mAFoROnOfHs)

Focus on repositories, staging, commits, remotes, branches and pull requests. Watch selectively if already comfortable with these concepts.

## Commands to practice

```bash
git status
git init
git add .
git commit -m "Complete JavaScript practice"
git log --oneline
git switch -c feature/readme
```

To publish a repository, create it on GitHub and use the exact remote instructions GitHub provides.

## What to demonstrate

- A commit records a snapshot and has a descriptive message.
- A branch lets work progress without rewriting `main`.
- A pull request makes review and discussion possible.
- `.gitignore` prevents tracked build output and secrets; already committed secrets need immediate rotation and cleanup.

## Practice

Create a repository for your Week 1 work. Make at least one meaningful commit, verify `git status`, and provide a README explaining how to run your code.
