import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import LandingPage from './LandingPage'


export default function Home(): JSX.Element {
  
  return (
    <Layout>                    
        <LandingPage />
    </Layout>
  );
}
