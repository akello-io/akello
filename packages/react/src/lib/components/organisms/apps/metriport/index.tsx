import { Card, Group, Switch, Text, Input, Button } from '@mantine/core';
import classes from './metriport.module.css';

const data = [
  { title: 'Secret Key', description: 'API Key found under Developers > API Keys > Secret Key' }  
];

export function Metriport() {
  const items = data.map((item) => (
    <Group justify="space-between" className={classes.item} wrap="nowrap" gap="xl" key={item.title}>
      <div>
        <Text>{item.title}</Text>
        <Text size="xs" c="dimmed">
          {item.description}
        </Text>
      </div>
      <Input placeholder="enter metriport secret api key" w={500} />      
    </Group>
  ));

  return (
    <Card withBorder radius="md" p="xl" className={classes.card}>
      <Text fz="lg" className={classes.title} fw={500}>
        Configure Metriport Integration
      </Text>
      <Text fz="xs" c="dimmed" mt={3} mb="xl">
        Set your API key from Metriport to start using the integration
      </Text>
      {items}
      <Button fullWidth>Save</Button>
    </Card>
  );
}