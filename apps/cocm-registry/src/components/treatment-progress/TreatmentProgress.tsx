import { Text, Progress, Card } from '@mantine/core';
import classes from './TreatmentProgress.module.css';


interface TreatmentProgressProps {
    weeks: number;
}
const TreatmentProgress:React.FC<TreatmentProgressProps> = ({weeks}) => {
  if(Number.isNaN(weeks)) {
    weeks = 0
  }

  return (
    <Card withBorder radius="md" p="xl" className={classes.card}>
      <Text fz="xs" tt="uppercase" fw={700} className={classes.title}>
        Treatment Progress
      </Text>
      <Text fz="lg" fw={500} className={classes.stats}>
        {weeks} / {6*4} weeks
      </Text>
      <Progress
        value={ ({weeks} / (6*4)) * 100}
        mt="md"
        size="lg"
        radius="xl"
        classNames={{
          root: classes.progressTrack,
          section: classes.progressSection,
        }}
      />
    </Card>
  );
}

export default TreatmentProgress