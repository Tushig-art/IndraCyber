import { useState } from 'react';
import { useData, ClassSchedule } from '../../contexts/DataContext';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Label } from '../ui/label';
import { Plus, Edit, Trash2 } from 'lucide-react';

export default function ClassScheduleAdmin() {
  const { data, addItem, updateItem, deleteItem } = useData();
  const [isOpen, setIsOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ClassSchedule | null>(null);
  const [formData, setFormData] = useState<Omit<ClassSchedule, 'id'>>({
    grade: '',
    day: '',
    time: '',
    subject: '',
    teacher: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingItem) {
      updateItem('classSchedules', editingItem.id, formData);
    } else {
      addItem('classSchedules', {
        ...formData,
        id: Date.now().toString(),
      });
    }
    resetForm();
  };

  const handleEdit = (item: ClassSchedule) => {
    setEditingItem(item);
    setFormData(item);
    setIsOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Устгахдаа итгэлтэй байна уу?')) {
      deleteItem('classSchedules', id);
    }
  };

  const resetForm = () => {
    setFormData({
      grade: '',
      day: '',
      time: '',
      subject: '',
      teacher: '',
    });
    setEditingItem(null);
    setIsOpen(false);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Хичээлийн хуваарь удирдах</CardTitle>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => setEditingItem(null)}>
                <Plus className="w-4 h-4 mr-2" />
                Нэмэх
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>
                  {editingItem ? 'Засах' : 'Шинэ хичээл нэмэх'}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label>Анги</Label>
                  <Input
                    value={formData.grade}
                    onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                    placeholder="9А"
                    required
                  />
                </div>
                <div>
                  <Label>Өдөр</Label>
                  <Input
                    value={formData.day}
                    onChange={(e) => setFormData({ ...formData, day: e.target.value })}
                    placeholder="Даваа"
                    required
                  />
                </div>
                <div>
                  <Label>Цаг</Label>
                  <Input
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    placeholder="08:00-08:45"
                    required
                  />
                </div>
                <div>
                  <Label>Хичээл</Label>
                  <Input
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Математик"
                    required
                  />
                </div>
                <div>
                  <Label>Багш</Label>
                  <Input
                    value={formData.teacher}
                    onChange={(e) => setFormData({ ...formData, teacher: e.target.value })}
                    placeholder="Б.Сарнай"
                    required
                  />
                </div>
                <div className="flex gap-2">
                  <Button type="submit" className="flex-1">
                    {editingItem ? 'Хадгалах' : 'Нэмэх'}
                  </Button>
                  <Button type="button" variant="outline" onClick={resetForm}>
                    Цуцлах
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Анги</TableHead>
              <TableHead>Өдөр</TableHead>
              <TableHead>Цаг</TableHead>
              <TableHead>Хичээл</TableHead>
              <TableHead>Багш</TableHead>
              <TableHead className="text-right">Үйлдэл</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.classSchedules.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.grade}</TableCell>
                <TableCell>{item.day}</TableCell>
                <TableCell>{item.time}</TableCell>
                <TableCell>{item.subject}</TableCell>
                <TableCell>{item.teacher}</TableCell>
                <TableCell className="text-right">
                  <div className="flex gap-2 justify-end">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(item)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(item.id)}
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
