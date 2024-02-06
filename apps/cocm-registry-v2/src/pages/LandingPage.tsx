import ThemeToggle from "../components/ThemeToggle";
import { Select } from '@mantine/core';

const LandingPage = () => {
    return (                
        <div>
            <ThemeToggle />
            <Select
                data={[
                    { value: 'react', label: 'React' },
                    { value: 'vue', label: 'Vue' },
                    { value: 'ng', label: 'Angular' },
                    { value: 'svelte', label: 'Svelte' },
                ]}
                placeholder="Pick one"
                label="Select your favorite framework/library"
                description="This is anonymous"
                required
                />
            <h1 className="text-3xl font-bold underline text-center">Hello world!</h1> 
            <h1>Welcome to the Landing Page</h1>
            <p>This is the landing page for the COCM Registry</p>
        </div>
    );
}

export default LandingPage;