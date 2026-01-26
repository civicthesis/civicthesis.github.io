# Contributing to CivicThesis

Thank you for your interest in contributing to CivicThesis! This guide will help you get started with development, Git workflows, and best practices.

## 📋 Table of Contents

- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Git Command Reference](#git-command-reference)
- [Component Development](#component-development)
- [Content Guidelines](#content-guidelines)
- [Code Style](#code-style)
- [Pull Request Process](#pull-request-process)

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Git installed and configured
- A code editor (VS Code recommended)

### Initial Setup

```bash
# Fork the repository on GitHub, then clone your fork
git clone https://github.com/YOUR_USERNAME/CivicThesis.git
cd CivicThesis

# Add upstream remote
git remote add upstream https://github.com/civicthesis/CivicThesis.git

# Install dependencies
npm install

# Start development server
npm run dev
```

---

## 🔄 Development Workflow

### 1. Create a New Branch

Always create a new branch for your work:

```bash
# Update your main branch
git checkout main
git pull upstream main

# Create and switch to a new branch
git checkout -b feature/your-feature-name
# or
git checkout -b fix/bug-description
```

### 2. Make Your Changes

- Write code following our [Code Style](#code-style)
- Test your changes locally
- Commit frequently with clear messages

### 3. Push and Create PR

```bash
# Push your branch to your fork
git push origin feature/your-feature-name

# Create a Pull Request on GitHub
```

---

## 📚 Git Command Reference

### Essential Git Commands (Cheat Sheet)

#### Configuration

```bash
# Set your name and email (first time setup)
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Check your configuration
git config --list

# Set default branch name
git config --global init.defaultBranch main
```

#### Repository Basics

```bash
# Clone a repository
git clone <repository-url>

# Check repository status
git status

# View commit history
git log
git log --oneline           # Compact view
git log --graph --oneline   # Visual branch graph
git log -n 5                # Last 5 commits

# Show changes
git diff                    # Unstaged changes
git diff --staged           # Staged changes
git diff main..feature      # Compare branches
```

#### Branching

```bash
# List branches
git branch                  # Local branches
git branch -a               # All branches (local + remote)
git branch -r               # Remote branches

# Create a new branch
git branch feature-name

# Switch to a branch
git checkout feature-name

# Create and switch in one command
git checkout -b feature-name

# Rename current branch
git branch -m new-name

# Delete a branch
git branch -d feature-name      # Safe delete (merged only)
git branch -D feature-name      # Force delete
```

#### Staging and Committing

```bash
# Stage files
git add file.txt                # Stage specific file
git add .                       # Stage all changes
git add *.js                    # Stage all JS files
git add src/                    # Stage entire directory

# Unstage files
git reset file.txt              # Unstage specific file
git reset                       # Unstage all

# Commit changes
git commit -m "Your message"
git commit -am "Message"        # Stage and commit tracked files
git commit --amend              # Modify last commit
git commit --amend --no-edit    # Add to last commit without changing message

# View staged changes before committing
git diff --staged
```

#### Pulling and Pushing

```bash
# Fetch changes from remote
git fetch origin
git fetch upstream

# Pull changes (fetch + merge)
git pull origin main
git pull upstream main

# Push changes
git push origin branch-name
git push -u origin branch-name  # Set upstream and push
git push --force                # Force push (use carefully!)
git push --force-with-lease     # Safer force push
```

#### Merging and Rebasing

```bash
# Merge a branch into current branch
git merge feature-branch

# Rebase current branch onto main
git rebase main

# Interactive rebase (squash commits)
git rebase -i HEAD~3            # Last 3 commits

# Abort merge/rebase
git merge --abort
git rebase --abort

# Continue after resolving conflicts
git rebase --continue
```

#### Stashing (Temporary Storage)

```bash
# Stash current changes
git stash
git stash save "Work in progress"

# List stashes
git stash list

# Apply most recent stash
git stash apply
git stash pop                   # Apply and remove from stash

# Apply specific stash
git stash apply stash@{2}

# Delete stash
git stash drop stash@{0}
git stash clear                 # Delete all stashes
```

#### Undoing Changes

```bash
# Discard changes in working directory
git checkout -- file.txt        # Single file
git checkout -- .               # All files

# Unstage files (keep changes)
git reset HEAD file.txt

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Undo last commit (discard changes)
git reset --hard HEAD~1

# Revert a commit (creates new commit)
git revert <commit-hash>

# Reset to specific commit
git reset --hard <commit-hash>  # DANGEROUS: loses all changes
```

#### Remote Management

```bash
# List remotes
git remote -v

# Add remote
git remote add origin <url>
git remote add upstream <url>

# Change remote URL
git remote set-url origin <new-url>

# Remove remote
git remote remove origin

# Rename remote
git remote rename old-name new-name

# Fetch from all remotes
git fetch --all
```

#### Viewing and Searching

```bash
# Show commit details
git show <commit-hash>

# Search commits
git log --grep="keyword"
git log --author="name"
git log --since="2 weeks ago"

# Find who changed a line
git blame file.txt

# Search code
git grep "search-term"
```

#### Tags

```bash
# List tags
git tag

# Create tag
git tag v1.0.0
git tag -a v1.0.0 -m "Version 1.0.0"

# Push tags
git push origin v1.0.0
git push origin --tags           # Push all tags

# Delete tag
git tag -d v1.0.0                # Local
git push origin --delete v1.0.0  # Remote
```

#### Cleaning

```bash
# Remove untracked files (dry run)
git clean -n

# Remove untracked files
git clean -f

# Remove untracked files and directories
git clean -fd

# Remove ignored files too
git clean -fdx
```

---

## 🎯 Common Git Workflows

### Workflow 1: Feature Development

```bash
# 1. Start from updated main
git checkout main
git pull upstream main

# 2. Create feature branch
git checkout -b feature/new-component

# 3. Make changes and commit
git add src/components/NewComponent.astro
git commit -m "Add NewComponent for data visualization"

# 4. Push to your fork
git push -u origin feature/new-component

# 5. Create Pull Request on GitHub
```

### Workflow 2: Fixing a Bug

```bash
# 1. Create fix branch
git checkout -b fix/broken-chart

# 2. Fix the bug and test
git add src/components/charts/BarChart.astro
git commit -m "Fix bar chart rendering issue

- Fixed null data handling
- Added error boundary
- Updated tests"

# 3. Push and create PR
git push -u origin fix/broken-chart
```

### Workflow 3: Updating Your Fork

```bash
# 1. Fetch upstream changes
git fetch upstream

# 2. Switch to main
git checkout main

# 3. Merge upstream changes
git merge upstream/main

# 4. Push to your fork
git push origin main
```

### Workflow 4: Syncing Feature Branch

```bash
# While on your feature branch
git fetch upstream
git rebase upstream/main

# If conflicts occur:
# 1. Resolve conflicts in files
# 2. Stage resolved files
git add .
# 3. Continue rebase
git rebase --continue

# Force push to update your PR
git push --force-with-lease origin feature-branch
```

### Workflow 5: Squashing Commits

```bash
# Squash last 3 commits
git rebase -i HEAD~3

# In the editor, change 'pick' to 'squash' for commits to combine
# Save and close, then edit the commit message

# Force push
git push --force-with-lease
```

---

## 🎨 Component Development

### Creating a New Component

1. **Choose the Right Category:**
   - `charts/` - Data visualization
   - `data/` - Tables and structured data
   - `media/` - Images, videos, maps
   - `typography/` - Text effects
   - `educational/` - Learning tools
   - `ui/` - Cards, boxes, layouts
   - `utility/` - Miscellaneous

2. **Create the Component:**

```astro
---
// src/components/category/YourComponent.astro
interface Props {
  title: string;
  description?: string;
}

const { title, description } = Astro.props;
---

<div class="your-component">
  <h2>{title}</h2>
  {description && <p>{description}</p>}
</div>

<style>
  .your-component {
    /* Your styles */
  }
</style>
```

3. **Test Your Component:**

```bash
# Start dev server
npm run dev

# Create a test page in src/pages/test.astro
# Import and use your component
# Verify it works in browser
```

4. **Document Your Component:**

Add usage examples in comments or create a demo page.

---

## 📝 Content Guidelines

### Writing Blog Posts

Create MDX files in `src/content/blog/`:

```mdx
---
title: "Your Post Title"
description: "Brief description"
pubDate: 2026-01-26
author: "Your Name"
tags: ["astro", "tutorial"]
image: "/path/to/image.jpg"
---

import CustomTable from "../../components/data/CustomTable.astro";

Your content here...

<CustomTable 
  headers={["Column 1", "Column 2"]}
  rows={[["Data 1", "Data 2"]]}
/>
```

### Writing Stories

Create MDX files in `src/content/stories/`:

```mdx
---
title: "Story Title"
description: "Story description"
pubDate: 2026-01-26
category: "Analysis"
tags: ["politics", "satire"]
image: "https://images.unsplash.com/..."
---

Your satirical content...
```

---

## 💅 Code Style

### General Guidelines

- Use 2 spaces for indentation
- Use meaningful variable and function names
- Add comments for complex logic
- Keep functions small and focused
- Follow existing code patterns

### Astro Components

```astro
---
// Props interface at the top
interface Props {
  title: string;
  variant?: 'primary' | 'secondary';
}

// Destructure props
const { title, variant = 'primary' } = Astro.props;

// Logic here
---

<!-- Template -->
<div class={`component ${variant}`}>
  <h2>{title}</h2>
  <slot />
</div>

<style>
  /* Scoped styles */
  .component {
    /* ... */
  }
</style>
```

### CSS

- Use CSS custom properties for theming
- Follow BEM naming for complex components
- Keep specificity low
- Use mobile-first media queries

```css
.component {
  color: var(--color-text);
  padding: var(--spacing-md);
}

@media (min-width: 768px) {
  .component {
    padding: var(--spacing-lg);
  }
}
```

### Commit Messages

Follow conventional commits:

```
type(scope): subject

body (optional)

footer (optional)
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Formatting, missing semicolons
- `refactor`: Code restructuring
- `test`: Adding tests
- `chore`: Maintenance tasks

**Examples:**

```bash
git commit -m "feat(charts): add pie chart component"
git commit -m "fix(layout): resolve mobile menu overflow"
git commit -m "docs: update component usage examples"
git commit -m "refactor(components): reorganize folder structure"
```

---

## 🔍 Pull Request Process

### Before Submitting

1. **Test your changes:**
   ```bash
   npm run build
   npm run preview
   ```

2. **Check for errors:**
   - No console errors
   - No build warnings
   - All pages render correctly

3. **Update documentation:**
   - Update README if needed
   - Add component documentation
   - Update CHANGELOG if applicable

### Creating the PR

1. **Write a clear title:**
   - `feat: Add interactive map component`
   - `fix: Resolve chart rendering on mobile`

2. **Provide description:**
   - What changes were made
   - Why they were made
   - How to test them
   - Screenshots if UI changes

3. **Link related issues:**
   - Closes #123
   - Fixes #456

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Refactoring

## Testing
- [ ] Tested locally
- [ ] Build passes
- [ ] No console errors

## Screenshots (if applicable)
[Add screenshots]

## Related Issues
Closes #123
```

---

## 🐛 Reporting Bugs

### Before Reporting

1. Search existing issues
2. Test on latest version
3. Gather reproduction steps

### Bug Report Template

```markdown
**Describe the bug**
Clear description of the bug

**To Reproduce**
Steps to reproduce:
1. Go to '...'
2. Click on '...'
3. See error

**Expected behavior**
What should happen

**Screenshots**
If applicable

**Environment:**
- OS: [e.g., Windows 11]
- Browser: [e.g., Chrome 120]
- Node version: [e.g., 18.17.0]
```

---

## 💡 Feature Requests

We welcome feature requests! Please:

1. Check existing feature requests
2. Describe the feature clearly
3. Explain the use case
4. Provide examples if possible

---

## ❓ Questions?

- Open a discussion on GitHub
- Check existing documentation
- Review closed issues for similar questions

---

## 📜 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

**Thank you for contributing to CivicThesis! 🎉**
