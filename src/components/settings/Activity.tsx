import activityModel from '@/model/ActivityModel';
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import { Container } from '../common';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '../ui/dropdown-menu';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { MoreHorizontal } from 'lucide-react';
import { observer } from 'mobx-react';
import { toast } from 'react-toastify';
import { isAlphabeticOrSpace } from '@/utils/validations/string.validations';
import { ChoiceDialog } from '../dialogs/ChoiceDialog';

interface ActivityProps {
  className?: string;
}

const Activity = observer(({ className }: ActivityProps) => {
  const [label, setLabel] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [selectedActivityId, setSelectedActivityId] = React.useState(-1);

  React.useEffect(() => {
    activityModel.fetchActivities();
  }, []);

  const createActivity = async () => {
    if (label.length > 3 && isAlphabeticOrSpace(label)) {
      await activityModel.createActivity(label);
      if (!activityModel.response.success) {
        toast.error(activityModel.response.message, {
          position: 'top-center'
        });
      } else {
        toast.success('Activité ajoutée avec succès', {
          position: 'top-center'
        });
      }
    } else {
      toast.error('Veuillez entrer un titre valide', {
        position: 'top-center'
      });
    }
  };

  const deleteActivity = async (id: number) => {
    await activityModel.removeActivity(id);
    if (!activityModel.response.success) {
      toast.error(activityModel.response.message, {
        position: 'top-center'
      });
    } else {
      toast.success('Activité supprimée avec succès', {
        position: 'top-center'
      });
    }
  };

  return (
    <>
      <ChoiceDialog
        open={open}
        onClose={() => setOpen(false)}
        positiveCallback={() => deleteActivity(selectedActivityId)}
      />
      <div className={cn(className, 'w-full')}>
        <Card>
          <CardHeader>
            <CardTitle>Nouvelle Activité</CardTitle>
          </CardHeader>
          <CardContent>
            <Input placeholder="Titre" onChange={(e) => setLabel(e.target.value)} />
          </CardContent>
          <CardFooter className="border-t px-6 py-4">
            <Button onClick={() => createActivity()}>Enregistrer</Button>
          </CardFooter>
        </Card>
        <Container className="w-full my-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Titre</TableHead>
                <TableHead>
                  <span className="sm:table-cell">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {!activityModel.activities.length ? (
                <TableRow>
                  <TableCell className="font-medium">Aucune activité trouvée</TableCell>
                </TableRow>
              ) : (
                activityModel.activities.map((activity) => (
                  <TableRow key={activity.id}>
                    <TableCell key={activity.id} className="font-medium">
                      {activity.label}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button aria-haspopup="true" size="icon" variant="ghost">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>Edit</DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedActivityId(activity.id);
                              setOpen(true);
                            }}>
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </Container>
      </div>
    </>
  );
});
export default Activity;
