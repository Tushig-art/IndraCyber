import { useState } from 'react';
import { useData, MenuItem } from '../../contexts/DataContext';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Label } from '../ui/label';
import { Plus, Edit, Trash2 } from 'lucide-react';

export default function MenuAdmin() {
  const { data, addItem, updateItem, deleteItem } = useData();
  const [isOpen, setIsOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [formData, setFormData] = useState<Omit<MenuItem, 'id'>>({
    day: '',
    breakfast: '',
    lunch: '',
    snack: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingItem) {
      updateItem('menu', editingItem.id, formData);
    } else {
      addItem('menu', {
        ...formData,
        id: Date.now().toString(),
      });
    }
    resetForm();
  };

  const handleEdit = (item: MenuItem) => {
    setEditingItem(item);
    setFormData(item);
    setIsOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Устгахдаа итгэлтэй байна уу?')) {
      deleteItem('menu', id);
    }
  };

  const resetForm = () => {
    setFormData({
      day: '',
      breakfast: '',
      lunch: '',
      snack: '',
    });
    setEditingItem(null);
    setIsOpen(false);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Меню удирдах</CardTitle>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => setEditingItem(null)}>
                <Plus className="w-4 h-4 mr-2" />
                Нэмэх
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingItem ? 'Засах' : 'Шинэ меню нэмэх'}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
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
                  <Label>Өглөөний цай</Label>
                  <Textarea
                    value={formData.breakfast}
                    onChange={(e) => setFormData({ ...formData, breakfast: e.target.value })}
                    placeholder="Сүүтэй будаа, Өндөг, Талх, Цай"
                    required
                    rows={3}
                  />
                </div>
                <div>
                  <Label>Өдрийн хоол</Label>
                  <Textarea
                    value={formData.lunch}
                    onChange={(e) => setFormData({ ...formData, lunch: e.target.value })}
                    placeholder="Шөл, Будаатай мах, Салат, Жимс"
                    required
                    rows={3}
                  />
                </div>
                <div>
                  <Label>Зууш</Label>
                  <Textarea
                    value={formData.snack}
                    onChange={(e) => setFormData({ ...formData, snack: e.target.value })}
                    placeholder="Жүүс, Боов"
                    required
                    rows={2}
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
              <TableHead>Өдөр</TableHead>
              <TableHead>Өглөөний цай</TableHead>
              <TableHead>Өдрийн хоол</TableHead>
              <TableHead>Зууш</TableHead>
              <TableHead className="text-right">Үйлдэл</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.menu.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.day}</TableCell>
                <TableCell className="max-w-xs truncate">{item.breakfast}</TableCell>
                <TableCell className="max-w-xs truncate">{item.lunch}</TableCell>
                <TableCell className="max-w-xs truncate">{item.snack}</TableCell>
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
