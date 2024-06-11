import React from 'react';
import { Inter } from 'next/font/google';
import { observer } from 'mobx-react';
import activityModel from '@/model/ActivityModel';
import { Button } from '@/components/ui/button';
import { Container } from '@/components/common';
import { Layout } from '@/components/layout';
const inter = Inter({ subsets: ['latin'] });

const Settings = observer(() => {
  React.useEffect(() => {
    activityModel.fetchActivities();
  }, []);

  return (
    <div className={`flex min-h-screen flex-col items-center justify-between ${inter.className}`}>
      <Layout className="flex">
        {/* {activityModel.activities.map((activity) => (
          <div key={activity.id}>{activity.label}</div>
        ))} */}
        <Container className="grid grid-cols-1 w-1/5 gap-4 place-items-center sm:col-span-2 p-4">
          <Button className="text-sm w-11/12">Activités</Button>
          <Button className="text-sm w-11/12">Séquence de numérotation</Button>
          <Button className="text-sm w-11/12">Mode de Paiement</Button>
          <Button className="text-sm w-11/12">Type de Retenue</Button>
          <Button className="text-sm w-11/12">Conditions par défaut</Button>
          <Button className="text-sm w-11/12">Synthèse Des Taxes </Button>
          <Button className="text-sm w-11/12">Banques</Button>
        </Container>
      </Layout>
    </div>
  );
});

export default Settings;
