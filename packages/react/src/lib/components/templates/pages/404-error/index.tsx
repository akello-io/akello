import { Container, Title, Text, Button, Group } from '@mantine/core';
import { Illustration } from './404.illustration';
import classes from './404.module.css';
import { useNavigate } from 'react-router-dom';

export interface NothingFoundBackgroundProps {
    onBackToHome: () => void;
}

export const NothingFoundBackground:React.FC<NothingFoundBackgroundProps> = ({onBackToHome}) => {  
  return (
    <Container className={classes.root}>
      <div className={classes.inner}>
        <Illustration className={classes.image} />
        <div className={classes.content}>
          <Title className={classes.title}>Nothing to see here</Title>
          <Text c="dimmed" size="lg" ta="center" className={classes.description}>
            Page you are trying to open does not exist. You may have mistyped the address, or the
            page has been moved to another URL. If you think this is an error contact support.
          </Text>
          <Group justify="center">
            <Button size="md" onClick={() => {
                onBackToHome()
            }}>Take me back to home page</Button>
          </Group>
        </div>
      </div>
    </Container>
  );
}
