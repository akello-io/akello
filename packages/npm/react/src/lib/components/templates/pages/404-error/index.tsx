import { Container, Title, Text, Button, Group } from '@mantine/core';
import { Illustration } from './404.illustration';


export interface NothingFoundBackgroundProps {
    onBackToHome: () => void;
}

// import classes from './404.module.css';
const classes = {
    root: 'nothing-found-background',
    inner: 'nothing-found-background-inner',
    image: 'nothing-found-background-image',
    content: 'nothing-found-background-content',
    title: 'nothing-found-background-title',
    description: 'nothing-found-background-description',
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
