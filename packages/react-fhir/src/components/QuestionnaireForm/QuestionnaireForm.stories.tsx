import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { TestQuestionnaire1 } from './test';

import QuestionnaireForm from './QuestionnaireForm';

export default {
    title: 'FHIR/QuestionnaireForm',
    component: QuestionnaireForm,
} as ComponentMeta<typeof QuestionnaireForm>;


// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const EmptyTemplateTemplate: ComponentStory<typeof QuestionnaireForm> = (args) => <QuestionnaireForm {...args} />

export const PHQ9 = EmptyTemplateTemplate.bind({});
PHQ9.args = {
    questionnaire: TestQuestionnaire1
};