# Contributing to Jupiverse Kit

🌟 Thank you for your interest in contributing to Jupiverse Kit! Your contributions will help make building dApps on Solana easier for everyone.

This document outlines guidelines for contributing to Jupiverse Kit. These are meant to be helpful suggestions rather than strict rules - use your best judgment and feel free to propose changes to these guidelines.

## Table of Contents

- [Ways to Contribute](#ways-to-contribute)
  - [Bug Reports](#bug-reports)
  - [Feature Requests](#feature-requests)
  - [Pull Requests](#pull-requests)
- [Development Guidelines](#development-guidelines)

## Ways to Contribute

### Bug Reports

Before submitting a bug report:

1. **Search existing issues** in the [Issues tab](https://github.com/0xbaseddann/jupiverse-kit/issues) to avoid duplicates

2. If the issue hasn't been reported, [create a new issue](https://github.com/0xbaseddann/jupiverse-kit/issues/new) with:
   - A clear, descriptive title
   - Detailed steps to reproduce the bug
   - Expected vs actual behavior
   - Code samples or error messages
   - Your environment details (OS, browser, etc.)

### Feature Requests

Have an idea to improve Jupiverse Kit?

1. First, **review existing issues** to see if someone else has suggested something similar

2. If it's a new idea, [open an issue](https://github.com/0xbaseddann/jupiverse-kit/issues/new) that includes:
   - A clear description of the feature
   - The problem it solves
   - Potential implementation approaches
   - Any relevant examples or mockups

### Pull Requests

Ready to contribute code? Here's how:

1. **Fork & Clone**: Fork the repository and create a feature branch from `main`

2. **Development**:

   - Make your changes following our development guidelines
   - Test thoroughly
   - Keep changes focused and atomic

3. **Submit**:

   - Write clear, descriptive commit messages
   - Push to your fork and submit a pull request
   - Include screenshots for UI changes
   - Link related issues

4. **Review Process**:
   - Maintainers will review your PR as soon as possible
   - Address any requested changes promptly
   - Be patient and responsive during the review process

## Development Guidelines

To maintain code quality and consistency:

- Write clean, typed code using TypeScript
- Follow React best practices and hooks guidelines
- Use meaningful variable and function names
- Add comments for complex logic
- Maintain compatibility with peer dependencies:
  - React ≥ 16.8.0
  - React DOM ≥ 16.8.0
  - @solana/web3.js ≥ 1.0.0
- Follow existing code style and formatting conventions
- Include tests for new functionality where applicable
