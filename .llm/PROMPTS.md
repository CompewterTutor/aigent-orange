## TODO Creation
```
You are an expert software architect and staff engineer with many years of experience building large, scaleable applications with amazing code quality, top notch security, and no-nonsense maintainability using the latest technologies and creating a great user experience. Using the guidelines laid out in the GUIDELINES.md file and the information about the project in the BRIEF.md file, plan a granular, prioritized list of tasks to complete the project. If the tech stack for this solution is not indicated, think for a while about the project before creating the todo list and prompt the user with a couple of the best choices for each part of the system and then get their choice before continuing.Create a detailed granular todo list in the .llm/TODO.md with checkboxes for each task, split up by features as the headers and organized by prioritized phase. Think about doing this in a way that works with semantic versioning. Detail any tooling to create you may find useful such as a Makefile for consolidating commands like building/testing/linting or helper scripts and Docker setups for consistent results. When creating the tasks, be mindful of how big subtasks are and optimize for ai paired development's limited context window. Add additional items outside the scope of the brief and the dev guidelines if you see fit, but mark them as suggestions or move them to future phases so that we don't get scope creep. Log your design thoughts and philophy in the memory file.
```

## Starting from Brief
review the dev guidelines, then review the brief.md file in .llm. I want you to fill out the rest of brief after reviewing all the code in the project. I'd like you to then create a best practices document in the .llm folder for woocommerce child theme development. I'd then like you to create a todo list to work on a refactor of the plugin so that it meets proper enterprise level development standards for code quality, security, and developer experience. I'd like to create a new refactor branch to work in. I'd like to create some tools that will help dev, like a build tool, a make file with common commands for testing, linting, building(minify, etc), and a bump_version script that will change all version strings in the project to their proper values according to the project and the most recent storefront theme.Before you create this stuff I'd like you to fill out the todo.md file in .llm so that we have a project plan with that info and any suggestions you have that I will review and make decisions on whether or not to keep them in the todo and then take notes on the whole project in the memory file. Add your changes to a changelog.md file. Edit the readme with a proper readme and then commit the changes with a proper commit msg. We will begin the first task in the next chat.

## Coding Process
```
Continue development. Follow guidelines in .llm/GUIDELINES.md and remember everything in .llm/MEMORY.md. Check for the next task in .llm/TODO.md. If this is task is the first in a new feature, create a branch for the feature. If this is the last task in a feature, prompt the user to create a pull request or attempt to merge back to main, but leave this to the user. Write any tests you need. If you need to run playwright tests, use the mcp or its not available, use reporter=line. If you are unsure about this tech stack, refresh your memory from the docs with context7 mcp or documentation in the .llm/.templates folder. When you finish this task, use subagents to update .llm/TODO.md and .llm/MEMORY.md. If you found new dev guidelines during this process, update that file as well, then update the changelog and if necessary, the README.md. Bump the version and then write a proper commit msg.
```

## API Documentation Generation
```
You are a master Technical Writer on top of being a staff level engineer. Generate API Documentation for the project for llm reference. 
```

## TODO and Memory pruning
Todo and memory have gotten too large, so let's archive old data while keeping it accessible. Make sure to include exact text headers in the new files so that the header string can be used to search the archived file if we need details.

For the todo, take the headers of completed phases and place them in the new file and note that any details can be looked up using that header in the todo archive
For the memory, copy the most important project information in the memory file to a new one and keep any important details and summarize anything else with some instructions on how to search the memory archive if needed.

## For when it forgets to update mem todo changelog and readme
use subagents to update .llm/TODO.md, .llm/MEMORY.md, changelog, and the readme.md and then write a proper commit msg