import { useState, useEffect } from 'react';
import { useAkello } from "@akello/react-hook";
import { useNavigate } from 'react-router-dom';
import { Registry } from '@akello/core';
import { WelcomeBanner } from "@akello/react";
import RegistryCard from '../components/RegistryCard';

const AppHomePage = () => {
    const akello = useAkello();
    const [registries, setRegistries] = useState<Registry[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        setIsLoading(true);

        akello.userService.getUser((data) => {            
            console.log(data);
        });
        akello.userService.getUserRegistries((data) => {
            const registries = data.map((registry: any) => {                                
                return new Registry(
                    registry['id'],
                    registry['name'],
                    registry['description'],
                    registry['active_patients'],
                    registry['members'],
                    registry['questionnaires'],
                    {
                        total_minutes: registry['total_minutes'],
                        completed_minutes: registry['completed_minutes'],
                        safety_risk: registry['safety_risk']
                    }
                );
            });            
            setRegistries(registries);
            setIsLoading(false);

            navigate(`/registry/${registries[0].id}`);
            akello.selectRegistry(registries[0]);

        });
    }, []);

    return (
        <div className="overscroll-hidden overscroll-none space-y-12">
            <WelcomeBanner first_name={"Vijay"} />
            <div className='space-y-3'>
                {!isLoading && registries.map((registry: Registry) => (
                    <RegistryCard
                        registry={registry}                        
                    />
                ))}
            </div>
        </div>
    );
}

export default AppHomePage;
