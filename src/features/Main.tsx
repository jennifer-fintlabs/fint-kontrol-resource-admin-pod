import React, { useState } from 'react';
import {Typography, Box, Tab, Tabs} from '@mui/material';
import style from '../template/style';

import PermissionTab from './PermissionTab';
import ResourcesTab from './ResourcesTab';

const Main = () => {
    const [selectedTab, setSelectedTab] = useState<number>(0);

    const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setSelectedTab(newValue);
        //TODO: reset some values on tab change??
    };


    function TabPanel(props: TabPanelProps) {
        const { children, value, index } = props;

        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`tabpanel-${index}`}
                aria-labelledby={`tab-${index}`}
            >
                {value === index && (
                    <Box>
                        {children}
                    </Box>
                )}
            </div>
        );
    }

    return (
        <Box sx={style.content}>
            <Typography
                sx={{ flex: '1 1 100%' }}
                variant="h6"
                id="tableTitle"
                component="div"
            >
                Applikasjonsadministrator
            </Typography>

            <Tabs
                value={selectedTab}
                onChange={handleTabChange}
                aria-label="Tildel rettigheter or Definer rolle"
                variant="fullWidth"
                indicatorColor="primary"
                textColor="primary"
                sx={{
                    width: "400px"
                }}
            >
                <Tab label="Tildel rettigheter" />
                <Tab label="Definer rolle" />
            </Tabs>
            <TabPanel value={selectedTab} index={0} >
                    <ResourcesTab  />
            </TabPanel>
            <TabPanel value={selectedTab} index={1}>
                    <PermissionTab />
            </TabPanel>

        </Box>
    );
};

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

export default Main;
