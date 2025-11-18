import { useState } from 'react';
import { useData, Club } from '../../contexts/DataContext';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Label } from '../ui/label';
import { Plus, Edit, Trash2 } from 'lucide-react';

export default function ClubsAdmin() {
  const { data, addItem, updateItem, deleteItem } = useData();
  const [isOpen, setIsOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Club | null>(null);
  const [formData, setFormData] = useState<Omit<Club, 'id'>>({
    name: '',
    type: '',
    day: '',
    time: '',
    teacher: '',
    room: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingItem) {
      updateItem('clubs', editingItem.id, formData);
    } else {
      addItem('clubs', {
        ...formData,
        id: Date.now().toString(),
      });
    }
    resetForm();
  };

  const handleEdit = (item: Club) => {
    setEditingItem(item);
    setFormData(item);
    setIsOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Устгахдаа итгэлтэй байна уу?')) {
      deleteItem('clubs', id);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      type: '',
      day: '',
      time: '',
      teacher: '',
      room: '',
    });
    setEditingItem(null);
    setIsOpen(false);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Дугуйлан удирдах</CardTitle>
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
                  {editingItem ? 'Засах' : 'Шинэ дугуйлан нэмэх'}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label>Нэр</Label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Робот бүтээх"
                    required
                  />
                </div>
                <div>
                  <Label>Төрөл</Label>
                  <Input
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    placeholder="Шинжлэх ухаан"
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
                    placeholder="15:00-16:30"
                    required
                  />
                </div>
                <div>
                  <Label>Багш</Label>
                  <Input
                    value={formData.teacher}
                    onChange={(e) => setFormData({ ...formData, teacher: e.target.value })}
                    placeholder="Ц.Бат-Эрдэнэ"
                    required
                  />
                </div>
                <div>
                  <Label>Өрөө</Label>
                  <Input
                    value={formData.room}
                    onChange={(e) => setFormData({ ...formData, room: e.target.value })}
                    placeholder="Лаборатори 1"
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
              <TableHead>Нэр</TableHead>
              <TableHead>Төрөл</TableHead>
              <TableHead>Өдөр</TableHead>
              <TableHead>Цаг</TableHead>
              <TableHead>Багш</TableHead>
              <TableHead>Өрөө</TableHead>
              <TableHead className="text-right">Үйлдэл</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.clubs.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.type}</TableCell>
                <TableCell>{item.day}</TableCell>
                <TableCell>{item.time}</TableCell>
                <TableCell>{item.teacher}</TableCell>
                <TableCell>{item.room}</TableCell>
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
