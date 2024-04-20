import React from 'react'
import { MeasurementsPage, MeasurementsPageProps } from '.'
import { objectValuesToControls } from '../../../storybook-utils'
import { AkelloProvider } from '@akello/react-hook'
import { Meta } from '@storybook/react'
import { StoryFn } from '@storybook/react'
import { AkelloClient } from '@akello/core'
import { MantineProvider } from '@mantine/core'
import { akello_client } from '../../../../../../storybook_akello_client'


// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof MeasurementsPage> = {
  title: 'Pages/MeasurementsPage',
  component: MeasurementsPage,

  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
  },
}
export default meta


const Template: StoryFn<typeof MeasurementsPage> = () => {
  return (
      <MantineProvider >
        <AkelloProvider akello={akello_client}>
          <MeasurementsPage registry_id='33'/>
        </AkelloProvider>
      </MantineProvider>
  )
}

export const Primary = Template.bind({})
// More on args: https://storybook.js.org/docs/react/writing-stories/args


const measurements = [
  {
      "name": "HEADS-ED",
      "uid": "heads-ed",
      "type": "survey",
      "active": false,
      "measurements": [
          {
              "id": "1",
              "question": "Home - Example: How are things at home? How are things with your family?",
              "responses": [
                  {
                      "id": "0",
                      "response": "Supportive",
                      "score": 0
                  },
                  {
                      "id": "1",
                      "response": "Conflicts",
                      "score": 1
                  },
                  {
                      "id": "2",
                      "response": "Chaotic/dysfunctional",
                      "score": 2
                  }
              ],
              "score": 0
          },
          {
              "id": "2",
              "question": "Education, employment - Example: How are things at school or work?",
              "responses": [
                  {
                      "id": "0",
                      "response": "On track",
                      "score": 0
                  },
                  {
                      "id": "1",
                      "response": "Grades slipping, attendance problems, or job dissatisfaction",
                      "score": 1
                  },
                  {
                      "id": "2",
                      "response": "Failing/not attending school, fired from job",
                      "score": 2
                  }
              ],
              "score": 0
          },
          {
              "id": "3",
              "question": "Activities & peers - Example: How are things with your friends? How are things with your hobbies or sports?",
              "responses": [
                  {
                      "id": "0",
                      "response": "No change",
                      "score": 0
                  },
                  {
                      "id": "1",
                      "response": "Reduction in activities/increased peer conflict",
                      "score": 1
                  },
                  {
                      "id": "2",
                      "response": "Increasing to fully withdrawn/significant peer conflict",
                      "score": 2
                  }
              ],
              "score": 0
          },
          {
              "id": "4",
              "question": "Drugs & alcohol - Example: How are things with drugs and alcohol?",
              "responses": [
                  {
                      "id": "0",
                      "response": "None or infrequent",
                      "score": 0
                  },
                  {
                      "id": "1",
                      "response": "Occasional",
                      "score": 1
                  },
                  {
                      "id": "2",
                      "response": "Frequency/daily",
                      "score": 2
                  }
              ],
              "score": 0
          },
          {
              "id": "5",
              "question": "Suicidality - Example: Have you had thoughts of hurting yourself?",
              "responses": [
                  {
                      "id": "0",
                      "response": "No thoughts",
                      "score": 0
                  },
                  {
                      "id": "1",
                      "response": "Ideation",
                      "score": 1
                  },
                  {
                      "id": "2",
                      "response": "Plan or gesture",
                      "score": 2
                  }
              ],
              "score": 0
          },
          {
              "id": "6",
              "question": "Emontions, behavior, thought disturbance - Example: How are things with your mood? How are things with your behavior? How are things with your thoughts?",
              "responses": [
                  {
                      "id": "0",
                      "response": "Mildly anxious/sad/acting out",
                      "score": 0
                  },
                  {
                      "id": "1",
                      "response": "Moderately anxious/sad/acting out",
                      "score": 1
                  },
                  {
                      "id": "2",
                      "response": "Significantly distressed/unable to function/out of control/bizarre thoughts/significiant change in behavior",
                      "score": 2
                  }
              ],
              "score": 0
          },
          {
              "id": "7",
              "question": "Discharge or current resources - Example: What are your current resources? What are your discharge resources (counseling, etc.)?",
              "responses": [
                  {
                      "id": "0",
                      "response": "Ongoing/well connected",
                      "score": 0
                  },
                  {
                      "id": "1",
                      "response": "Some/not meeting needs",
                      "score": 1
                  },
                  {
                      "id": "2",
                      "response": "None/on waitlist/noncomplaint",
                      "score": 2
                  }
              ],
              "score": 0
          }
      ]
  },
  {
      "name": "GAD-7",
      "uid": "gad7",
      "type": "survey",
      "active": false,
      "measurements": [
          {
              "id": "1",
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
              ],
              "score": 0
          },
          {
              "id": "2",
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
              ],
              "score": 0
          },
          {
              "id": "3",
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
              ],
              "score": 0
          },
          {
              "id": "4",
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
              ],
              "score": 0
          },
          {
              "id": "5",
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
              ],
              "score": 0
          },
          {
              "id": "6",
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
              ],
              "score": 0
          },
          {
              "id": "7",
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
              ],
              "score": 0
          },
          {
              "id": "8",
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
              ],
              "score": 0
          },
          {
              "id": "9",
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
              ],
              "score": 0
          }
      ]
  },
  {
      "name": "PMQ-9",
      "uid": "pmq9",
      "type": "survey",
      "active": false,
      "measurements": [
          {
              "id": "1",
              "question": "Had little or no sleep, and still felt energized",
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
              ],
              "score": 0
          },
          {
              "id": "2",
              "question": "Felt easily irritated",
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
              ],
              "score": 0
          },
          {
              "id": "3",
              "question": "Felt overactive",
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
              ],
              "score": 0
          },
          {
              "id": "4",
              "question": "Acted impulsively or done things without thinking about consequences",
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
              ],
              "score": 0
          },
          {
              "id": "5",
              "question": "Felt sped up or restless",
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
              ],
              "score": 0
          },
          {
              "id": "6",
              "question": "Been easily distracted ",
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
              ],
              "score": 0
          },
          {
              "id": "7",
              "question": "Felt pressure to keep talking or been told by someone you are more talkative",
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
              ],
              "score": 0
          },
          {
              "id": "8",
              "question": "Felt argumentative",
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
              ],
              "score": 0
          },
          {
              "id": "9",
              "question": "Had racing thoughts",
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
              ],
              "score": 0
          }
      ]
  },
  {
      "name": "PHQ-9",
      "uid": "phq9",
      "type": "survey",
      "active": false,
      "measurements": [
          {
              "id": "1",
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
              ],
              "score": 0
          },
          {
              "id": "2",
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
              ],
              "score": 0
          },
          {
              "id": "3",
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
              ],
              "score": 0
          },
          {
              "id": "4",
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
              ],
              "score": 0
          },
          {
              "id": "5",
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
              ],
              "score": 0
          },
          {
              "id": "6",
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
              ],
              "score": 0
          },
          {
              "id": "7",
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
              ],
              "score": 0
          },
          {
              "id": "8",
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
              ],
              "score": 0
          },
          {
              "id": "9",
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
              ],
              "score": 0
          }
      ]
  }
]


const selected_measurements = {
  "id": "70c335cc-38f6-4b4c-a0bb-d6cc8365d2d3",
  "organization_id": null,
  "name": null,
  "logo": null,
  "measurements": [
      {
          "name": "HEADS-ED",
          "uid": "heads-ed",
          "type": "survey",
          "active": false,
          "measurements": [
              {
                  "id": "1",
                  "question": "Home - Example: How are things at home? How are things with your family?",
                  "responses": [
                      {
                          "id": "0",
                          "response": "Supportive",
                          "score": 0
                      },
                      {
                          "id": "1",
                          "response": "Conflicts",
                          "score": 1
                      },
                      {
                          "id": "2",
                          "response": "Chaotic/dysfunctional",
                          "score": 2
                      }
                  ],
                  "score": 0
              },
              {
                  "id": "2",
                  "question": "Education, employment - Example: How are things at school or work?",
                  "responses": [
                      {
                          "id": "0",
                          "response": "On track",
                          "score": 0
                      },
                      {
                          "id": "1",
                          "response": "Grades slipping, attendance problems, or job dissatisfaction",
                          "score": 1
                      },
                      {
                          "id": "2",
                          "response": "Failing/not attending school, fired from job",
                          "score": 2
                      }
                  ],
                  "score": 0
              },
              {
                  "id": "3",
                  "question": "Activities & peers - Example: How are things with your friends? How are things with your hobbies or sports?",
                  "responses": [
                      {
                          "id": "0",
                          "response": "No change",
                          "score": 0
                      },
                      {
                          "id": "1",
                          "response": "Reduction in activities/increased peer conflict",
                          "score": 1
                      },
                      {
                          "id": "2",
                          "response": "Increasing to fully withdrawn/significant peer conflict",
                          "score": 2
                      }
                  ],
                  "score": 0
              },
              {
                  "id": "4",
                  "question": "Drugs & alcohol - Example: How are things with drugs and alcohol?",
                  "responses": [
                      {
                          "id": "0",
                          "response": "None or infrequent",
                          "score": 0
                      },
                      {
                          "id": "1",
                          "response": "Occasional",
                          "score": 1
                      },
                      {
                          "id": "2",
                          "response": "Frequency/daily",
                          "score": 2
                      }
                  ],
                  "score": 0
              },
              {
                  "id": "5",
                  "question": "Suicidality - Example: Have you had thoughts of hurting yourself?",
                  "responses": [
                      {
                          "id": "0",
                          "response": "No thoughts",
                          "score": 0
                      },
                      {
                          "id": "1",
                          "response": "Ideation",
                          "score": 1
                      },
                      {
                          "id": "2",
                          "response": "Plan or gesture",
                          "score": 2
                      }
                  ],
                  "score": 0
              },
              {
                  "id": "6",
                  "question": "Emontions, behavior, thought disturbance - Example: How are things with your mood? How are things with your behavior? How are things with your thoughts?",
                  "responses": [
                      {
                          "id": "0",
                          "response": "Mildly anxious/sad/acting out",
                          "score": 0
                      },
                      {
                          "id": "1",
                          "response": "Moderately anxious/sad/acting out",
                          "score": 1
                      },
                      {
                          "id": "2",
                          "response": "Significantly distressed/unable to function/out of control/bizarre thoughts/significiant change in behavior",
                          "score": 2
                      }
                  ],
                  "score": 0
              },
              {
                  "id": "7",
                  "question": "Discharge or current resources - Example: What are your current resources? What are your discharge resources (counseling, etc.)?",
                  "responses": [
                      {
                          "id": "0",
                          "response": "Ongoing/well connected",
                          "score": 0
                      },
                      {
                          "id": "1",
                          "response": "Some/not meeting needs",
                          "score": 1
                      },
                      {
                          "id": "2",
                          "response": "None/on waitlist/noncomplaint",
                          "score": 2
                      }
                  ],
                  "score": 0
              }
          ]
      },
      {
          "name": "GAD-7",
          "uid": "gad7",
          "type": "survey",
          "active": false,
          "measurements": [
              {
                  "id": "1",
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
                  ],
                  "score": 0
              },
              {
                  "id": "2",
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
                  ],
                  "score": 0
              },
              {
                  "id": "3",
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
                  ],
                  "score": 0
              },
              {
                  "id": "4",
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
                  ],
                  "score": 0
              },
              {
                  "id": "5",
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
                  ],
                  "score": 0
              },
              {
                  "id": "6",
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
                  ],
                  "score": 0
              },
              {
                  "id": "7",
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
                  ],
                  "score": 0
              },
              {
                  "id": "8",
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
                  ],
                  "score": 0
              },
              {
                  "id": "9",
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
                  ],
                  "score": 0
              }
          ]
      },
      {
          "name": "PMQ-9",
          "uid": "pmq9",
          "type": "survey",
          "active": true,
          "measurements": [
              {
                  "id": "1",
                  "question": "Had little or no sleep, and still felt energized",
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
                  ],
                  "score": 0
              },
              {
                  "id": "2",
                  "question": "Felt easily irritated",
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
                  ],
                  "score": 0
              },
              {
                  "id": "3",
                  "question": "Felt overactive",
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
                  ],
                  "score": 0
              },
              {
                  "id": "4",
                  "question": "Acted impulsively or done things without thinking about consequences",
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
                  ],
                  "score": 0
              },
              {
                  "id": "5",
                  "question": "Felt sped up or restless",
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
                  ],
                  "score": 0
              },
              {
                  "id": "6",
                  "question": "Been easily distracted ",
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
                  ],
                  "score": 0
              },
              {
                  "id": "7",
                  "question": "Felt pressure to keep talking or been told by someone you are more talkative",
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
                  ],
                  "score": 0
              },
              {
                  "id": "8",
                  "question": "Felt argumentative",
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
                  ],
                  "score": 0
              },
              {
                  "id": "9",
                  "question": "Had racing thoughts",
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
                  ],
                  "score": 0
              }
          ]
      },
      {
          "name": "PHQ-9",
          "uid": "phq9",
          "type": "survey",
          "active": true,
          "measurements": [
              {
                  "id": "1",
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
                  ],
                  "score": 0
              },
              {
                  "id": "2",
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
                  ],
                  "score": 0
              },
              {
                  "id": "3",
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
                  ],
                  "score": 0
              },
              {
                  "id": "4",
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
                  ],
                  "score": 0
              },
              {
                  "id": "5",
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
                  ],
                  "score": 0
              },
              {
                  "id": "6",
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
                  ],
                  "score": 0
              },
              {
                  "id": "7",
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
                  ],
                  "score": 0
              },
              {
                  "id": "8",
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
                  ],
                  "score": 0
              },
              {
                  "id": "9",
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
                  ],
                  "score": 0
              }
          ]
      }
  ],
  "created_at": "1713643675.0038158893585205078125",
  "modified_at": "1713643675.00383090972900390625"
}

Primary.parameters = {
  mockData: [
      {
          url: '/undefined/measurement',
          method: 'GET',
          status: 200,
          response: measurements,
      },
      {
        url: '/undefined/registry/33',
        method: 'GET',
        status: 200,
        response: selected_measurements,
    },
  ],
},

Primary.args = {
}
