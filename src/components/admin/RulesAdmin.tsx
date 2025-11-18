import { useState } from 'react';
import { useData, Rule } from '../../contexts/DataContext';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Label } from '../ui/label';
import { Plus, Edit, Trash2 } from 'lucide-react';

export default function RulesAdmin() {
  const { data, addItem, updateItem, deleteItem } = useData();
  const [isOpen, setIsOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Rule | null>(null);
  const [formData, setFormData] = useState<Omit<Rule, 'id'>>({
    title: '',
    description: '',
    icon: 'Star',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingItem) {
      updateItem('rules', editingItem.id, formData);
    } else {
      addItem('rules', {
        ...formData,
        id: Date.now().toString(),
      });
    }
    resetForm();
  };

  const handleEdit = (item: Rule) => {
    setEditingItem(item);
    setFormData(item);
    setIsOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Устгахдаа итгэлтэй байна уу?')) {
      deleteItem('rules', id);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      icon: 'Star',
    });
    setEditingItem(null);
    setIsOpen(false);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Дүрэм удирдах</CardTitle>
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
                  {editingItem ? 'Засах' : 'Шинэ дүрэм нэмэх'}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label>Гарчиг</Label>
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Цагийн дэг"
                    required
                  />
                </div>
                <div>
                  <Label>Тайлбар</Label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Хичээлд цагтаа орох, хоцрохгүй байх"
                    required
                    rows={3}
                  />
                </div>
                <div>
                  <Label>Lucide icon нэр</Label>
                  <Input
                    value={formData.icon}
                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                    placeholder="Clock"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Жишээ: Clock, Heart, Star, BookOpen, Shield
                  </p>
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
              <TableHead>Icon</TableHead>
              <TableHead>Гарчиг</TableHead>
              <TableHead>Тайлбар</TableHead>
              <TableHead className="text-right">Үйлдэл</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.rules.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.icon}</TableCell>
                <TableCell>{item.title}</TableCell>
                <TableCell className="max-w-xs truncate">{item.description}</TableCell>
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
