# AIgent Orange
> AI project template for AI Agentic Development

## Credit
Full credit for starting this project and developing this workflow goes to John at Generaite Labs: https://generaitelabs.com/one-agentic-coding-workflow-to-rule-them-all/

I decided to try out this workflow and thought it would be nice to have a github project template to start with and used his prompts and file structure to start with. I've distilled his article in this README but for a full explanation, please visit his blog. Kudos John! He has great articles that I encourage everyone to check out at https://generaitelabs.com/blog/.

## Usage

1. Write up a project brief - a high level overview of the application.
    - Vision of project
    - Features
        - description of feature
        - when (what phase) it will be implemented in the project
    - Overall architecture
    - Entities
    - Business Rules
    - Success Metrics
    - Any other technical details
2. Technical Implementation Plan
    - Detail models
    - Libraries used
    - Interfaces
    - Services
3. Dependency Analysis
    - Ask model to find dependency problems
4. TODO list
    - Ask AI to generate initial todo list from implementation plan
    - Markdown file with checkmarks
5. Start Coding Loop
    - Reference all included files that the LLM needs to keep project context:
        1. @project_folder
        2. @memory
        3. @TODO
        4. @GUIDELINES
        5. @REVIEW
    - Prompt AI: 
    ```
        Continue working on the project in @project_folder. Follow the development guidelines in @development guidelines, and remember everything in @memory.
    ```
## Lazy Vibing
You can also leave the fate of your project in the LLM's hands if you're really vibing. If you just barely fill out the description of your project in the brief.md and some general features, you can then run the prompt in `.llm/prompts/vibe.brief.prompt.md` and it will try to generate most of the docs for you and you can get started from there or edit what it spit out. I find it useful for small projects but anything larger and you're going to want more control over how you define your project so it's up to you. 

## Tips

* Use a good model
* Make a good plan
* Keep chats small

