# Directory Structure
There are two directories. Each directory contains major revisions.
The index.html file in the root directory is a simple redirection html file for the stable version. The current stable version is 1.

## v1: Simple OpenAI 
It contains index.html files and a demo UI for OpenAI request. It is already complete, so no further change is needed.

## v2: Graph UI Demo
It has a tabbed UI. There are three tabs.

### Tab 1: Interactive Multi-agent LLM designer with Vis.js 
Introduction: This app helps users to design multi-agent LLM model. It includes Vis.js library to visualize the relationships between agents. If the user runs the model, the execution happens on the screen.

#### Screen Design
There are panes: upper pane for graph diagram, and lower pane for everything else.

1. Upper pane: a Vis.js diagram.
  - At first, the diagram has only two squares. Agent A and B.
  - Agent A has one output O1, and agent B has one input I1, and one output O1.
  - Agent A's function is like this:
```
Processing description:
- Generate a random, hypothetical weather condition, and describe it in less than 10 words, but longer than 3 words. 

Output description:
O1 : The description of the generated weather condition.
```
  - Agent B's function is like this:
```
Input description:
I1: Weather condition description

Processing description:
- Write a short poem based on I1. The poem should not exceed three lines, and 5 words per line.

Output description:
O1: The poem.
```
  - Agents are denoted as squares, and the names are displayed on the center of the rectangle.
  - Agent A has one outlet, O1, and Agent B has one inlet, I1, and one outlet, O1. O1 of A is connected to I1 of B. They should be colored differently. (input=green, output=red)
  - If the user clicks a square, the detailed information about the agent such as name, function, number of input, number of output are displayed in lower pane's "Info" tab.
  - If the user increases or decreases the number of input or output, they are applied to the diagram. The minimum number of input is 0, the minimum number of output is 1.
  - A blue button with a text "Run" is placed on the right top corner. The button execute the model (see below). While the model is running, the button becomes red, and the text should be "Stop".

2. Lower pane: everything else. A tabbed UI for multiple screens.
  - Info tab: shows any information that are relevant. For now, it shows the information about the selected square in Upper pane.
  - Execution: list of execution. A table-like UI. Each row contains the columns: start time, end time, status (completed/aborted), and "Details" button. If "Details" button is clicked, the "Details" tab will be open. If the user clicks a row, "Delete" button appears and you can delete each row. This list is stored in browser storage. So, next time the user accesses this website, this execution list is preserved.
  - Details: A full document of execution of all the agents. It is like conversation transcript. Each agent is executed, and the details of execution is appended to the document. Each agent starts with the timestamp of start time, name of the agent, inputs of the agent, outputs of the agent, and the timestamp of end time. So, after all executions are finished, this document will look like a scenario of a play. This document is also stored in browser storage. There is a "Download" button to download the text document.
  - Settings: anything related with settings.

#### Execution
If "Run" button is clicked, the most upstream agent will be executed. It will add one row to "Execution" tab table, and request to OpenAI GPT API.

Each agent will be executed one by one. The ones without any inputs will be executed first. Their output will be passed to other agents, if their outputs are connected to other agents. The outputs from the earlier agent will be parsed, and passed to next agents as input. What I meant with "input" is, you add the following message to "function" of the agent set in "Info" tab:

```
Actual Input Values:
I1: [output of the earlier agent]
I2: [another output of the earlier agent]
```

And append a detailed prompt at the end like this:
```
Prompt:
This output will be parsed by javascript. Using the input values (if any), do the "processing", then put the results in "outputs". Use a JSON dictionary for outputs.
```

Thus, the final prompt will be structured like this:

```
Input Description:
[input description]

Processing Description:
[how to process input, or how to generate outputs]

Output Description:
[list of output and what information should go into each output]

Actual Input Values:
[list of input values]

Prompt:
This output will be parsed by javascript. Using the input values (if any), do the "processing", then put the results in "outputs". Use a JSON dictionary for outputs.
```

And the response from OpenAI API would be something like this (not necessarily exactly like this):

```
{
    "O1": "anything",
    "O2": "whatever"
}
```

#### OpenAI API description
The following is the OpenAI API curl example:

```
curl https://api.openai.com/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -d '{
    "model": "gpt-3.5-turbo",
    "messages": [{"role": "user", "content": "Hello!"}]
  }'
```

Use stored OPENAI_API_KEY. If OPENAI_API_KEY is not stored in the browser storage, pop up a bootstrap modal so that the user can put their OpenAI API Key. Provide a "Delete Auth" button settings tab in lower pane.

#### Favicon
An SVG file for a smiley icon.

# Prompt

If you understood the application, print out the list of files (e.g., .html, .css, .js, favicon.svg) in the directory structure. If there's a long function, please put a placeholder and give me the list of functions that I beed separately request the implementation.

Make each file and code snippet short enough so that I can request as a next prompt and you return the contents of the file. But since we have limitation on the number of requests, so don't split too much.