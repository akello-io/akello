import yaml
from transitions import Machine

"""
organization_users:
    - user_id: <user_id:1>
      role: care_manager
    - user_id: <user_id:2>
      role: care_manager
    - user_id: <user_id:2>
      role: primary_care_provider
    - user_id: <user_id:3>
      role: psychiatrist            
    - user_id: <user_id:3>
      role: clinical_ops  
intervention:
    categories:
        - id: caseload_review
          name: Caseload Review          
        - id: registry_review
          name: Registry Review
        - id: brief_intervention
          name: Brief Intervention
    types:
        - id: initial_assessment
          name: Initial Assessment
        - id: follow_up
          name: Follow Up
        - id: psychiatric_consultation
          name: Psychiatric Consultation        
state_machine:
    name: CoCMPatient
    states:
        - referral
        - initial_assessment
        - treatment
        - graduation
        - relapse_prevention
        - discharge
    transitions:
        - trigger: accept_to_program
          source: referral
          dest: initial_assessment
        - trigger: start_treatment
          source: initial_assessment
          dest: treatment
        - trigger: graduate
          source: treatment
          dest: graduation
        - trigger: relapse_prevention
          source: graduation
          dest: relapse_prevention
        - trigger: discharge
          source: '*'
          dest: discharge            
"""


def load_state_machine_from_yaml_string(yaml_string):
    return yaml.safe_load(yaml_string)


# build the state machine from the yaml string
def build_state_machine_from_yaml_string(yaml_string):
    state_machine = load_state_machine_from_yaml_string(yaml_string)
    return StateMachineBuilder(state_machine['name'], state_machine['states'], state_machine['transitions']).build()


class StateMachineBuilder:
    def __init__(self, name, states, transitions):
        self.name = name
        self.states = states
        self.transitions = transitions

    def build(self):
        machine = Machine(model=self, states=self.states, initial='referral')
        for transition in self.transitions:
            machine.add_transition(**transition)

        return self

    def get_next_states(self):
        return [state for state in self.machine.get_triggers(self.state) if not state.startswith('to_')]


class CoCMPatient:
    states = ['referral', 'initial_assessment', 'treatment', 'graduation', 'relapse prevention', 'discharge']

    def __init__(self, state='referral'):
        self.machine = Machine(model=self, states=CoCMPatient.states, initial=state)
        self.machine.add_transition(trigger='accept_to_program', source='referral', dest='initial_assessment')
        self.machine.add_transition(trigger='start_treatment', source='initial_assessment', dest='treatment')
        self.machine.add_transition(trigger='graduate', source='treatment', dest='graduation')
        self.machine.add_transition(trigger='relapse_prevention', source='graduation', dest='relapse_prevention')
        self.machine.add_transition(trigger='discharge', source='*', dest='discharge')

    def get_next_states(self):
        return [state for state in self.machine.get_triggers(self.state) if not state.startswith('to_')]
