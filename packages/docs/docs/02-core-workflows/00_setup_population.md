---
slug: setup-population
sidebar_position: 0
title: Setup population
---

# Setup your population

Akello manages your population with our patient registry tool. A population is a group of patients with common conditions, enabling you to implement a uniform treatment model as needed.


## Create a new registry
Setting up a new registry with Akello is easy. You can create as many registries as you like and add any number of patients to each. Plus, you can control access to ensure patient data stays secure.

1. On the homepage, click the "Create New Registry" button located at the top right corner of the screen.
2. Proceed through the setup process.
3. Choose the screeners you need for this group.

## User Access

With Akello, you can make sure that only those treating patients in the population can access the relevant registry. To add a user, simply enter their email. If they're not already on Akello, they'll get an invite to join. After signing up, they'll be able to see the registry they were invited to.

## Configure Screeners

Once you set up a registry, its screeners are locked in. This ensures you maintain a consistent approach for a population. If you require different screeners, simply create a new registry. Screeners provide a stable way for the clinical team to evaluate each patient in every session.

There are two kinds of screeners you can assign to the registry. Built-in screeners allow you to choose from an existing collection. If something you need isn't available, you have the option to create a custom screener for your registry.

### Built in screeners

| Screeners 	 | Description                  |
|------------|------------------------------|
| PHQ-9   	  | Patient Health Questionnaire |
| GAD-7   	  | Generalised Anxiety Disorder |
 | GHQ-12  	  | General Health Questionnaire |
| ISI        | Insomnia Severity Index      |




### Custom screeners

To add a custom screener, upload a JSON file for each one. Follow the provided PHQ-9 example as a guide to create your own screener.


<details>
    <summary>View Custom Screener Example</summary>
<p>

#### Here is an example of how you would create a custom screener based on the PHQ-9

```json lines
{
  "uid": "phq9",
  "name": "PHQ-9",
  "questions": [
    {
      "id": "0",
      "question": "Little interest or pleasure in doing things?",
      "responses": [
        {
          "id": "0",
          "response": "Not at all",
          "score": 0
        },
        {
          "id": "1",
          "response": "Several days",
          "score": 1
        },
        {
          "id": "2",
          "response": "More than half the days",
          "score": 2
        },
        {
          "id": "3",
          "response": "Nearly every day",
          "score": 3
        }
      ]
    },
    {
      "id": "1",
      "question": "Feeling down, depressed, or hopeless?",
      "responses": [
        {
          "id": "0",
          "response": "Not at all",
          "score": 0
        },
        {
          "id": "1",
          "response": "Several days",
          "score": 1
        },
        {
          "id": "2",
          "response": "More than half the days",
          "score": 2
        },
        {
          "id": "3",
          "response": "Nearly every day",
          "score": 3
        }
      ]
    },
    {
      "id": "2",
      "question": "Trouble falling or staying asleep, or sleeping too much?",
      "responses": [
        {
          "id": "0",
          "response": "Not at all",
          "score": 0
        },
        {
          "id": "1",
          "response": "Several days",
          "score": 1
        },
        {
          "id": "2",
          "response": "More than half the days",
          "score": 2
        },
        {
          "id": "3",
          "response": "Nearly every day",
          "score": 3
        }
      ]
    },
    {
      "id": "3",
      "question": "Feeling tired or having little energy?",
      "responses": [
        {
          "id": "0",
          "response": "Not at all",
          "score": 0
        },
        {
          "id": "1",
          "response": "Several days",
          "score": 1
        },
        {
          "id": "2",
          "response": "More than half the days",
          "score": 2
        },
        {
          "id": "3",
          "response": "Nearly every day",
          "score": 3
        }
      ]
    },
    {
      "id": "4",
      "question": "Poor appetite or overeating?",
      "responses": [
        {
          "id": "0",
          "response": "Not at all",
          "score": 0
        },
        {
          "id": "1",
          "response": "Several days",
          "score": 1
        },
        {
          "id": "2",
          "response": "More than half the days",
          "score": 2
        },
        {
          "id": "3",
          "response": "Nearly every day",
          "score": 3
        }
      ]
    },
    {
      "id": "5",
      "question": "Feeling bad about yourself - or that you are a failure or have let yourself or your family down?",
      "responses": [
       {
          "id": "0",
          "response": "Not at all",
          "score": 0
        },
        {
          "id": "1",
          "response": "Several days",
          "score": 1
        },
        {
          "id": "2",
          "response": "More than half the days",
          "score": 2
        },
        {
          "id": "3",
          "response": "Nearly every day",
          "score": 3
        }
      ]
    },
    {
      "id": "6",
      "question": "Trouble concentrating on things, such as reading the newspaper or watching television?",
      "responses": [
        {
          "id": "0",
          "response": "Not at all",
          "score": 0
        },
        {
          "id": "1",
          "response": "Several days",
          "score": 1
        },
        {
          "id": "2",
          "response": "More than half the days",
          "score": 2
        },
        {
          "id": "3",
          "response": "Nearly every day",
          "score": 3
        }
      ]
    },
    {
      "id": "7",
      "question": "Moving or speaking so slowly that other people could have noticed? Or the opposite - being so fidgety or restless that you have been moving around a lot more than usual?",
      "responses": [
        {
          "id": "0",
          "response": "Not at all",
          "score": 0
        },
        {
          "id": "1",
          "response": "Several days",
          "score": 1
        },
        {
          "id": "2",
          "response": "More than half the days",
          "score": 2
        },
        {
          "id": "3",
          "response": "Nearly every day",
          "score": 3
        }
      ]
    },
    {
      "id": "8",
      "question": "Thoughts that you would be better off dead, or of hurting yourself in some way?",
      "responses": [
        {
          "id": "0",
          "response": "Not at all",
          "score": 0
        },
        {
          "id": "1",
          "response": "Several days",
          "score": 1
        },
        {
          "id": "2",
          "response": "More than half the days",
          "score": 2
        },
        {
          "id": "3",
          "response": "Nearly every day",
          "score": 3
        }
      ]
    }
  ]
}

```

</p>
</details>

