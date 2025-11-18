import { useState } from 'react';
import { useData, Event } from '../../contexts/DataContext';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Label } from '../ui/label';
import { Plus, Edit, Trash2, Image } from 'lucide-react';
import { Badge } from '../ui/badge';

export default function EventsAdmin() {
  const { data, addItem, updateItem, deleteItem } = useData();
  const [isOpen, setIsOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Event | null>(null);
  const [formData, setFormData] = useState<Omit<Event, 'id' | 'createdAt'>>({
    title: '',
    description: '',
    date: '',
    image: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingItem) {
      updateItem('events', editingItem.id, formData);
    } else {
      addItem('events', {
        ...formData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
      });
    }
    resetForm();
  };

  const handleEdit = (item: Event) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      description: item.description,
      date: item.date,
      image: item.image,
    });
    setIsOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Устгахдаа итгэлтэй байна уу?')) {
      deleteItem('events', id);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      date: '',
      image: '',
    });
    setEditingItem(null);
    setIsOpen(false);
  };

  const isNewEvent = (createdAt: string): boolean => {
    const created = new Date(createdAt);
    const now = new Date();
    const diffInDays = (now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24);
    return diffInDays <= 3;
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Эвент удирдах</CardTitle>
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
                  {editingItem ? 'Засах' : 'Шинэ эвент нэмэх'}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label>Гарчиг</Label>
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Шинэ оны баяр"
                    required
                  />
                </div>
                <div>
                  <Label>Тайлбар</Label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Сургуулийн шинэ оны үдэшлэг болно..."
                    required
                    rows={4}
                  />
                </div>
                <div>
                  <Label>Огноо</Label>
                  <Input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label>Зургийн URL</Label>
                  <Input
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="https://images.unsplash.com/..."
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Unsplash эсвэл бусад зургийн URL оруулна уу
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
        <div className="space-y-4">
          {data.events.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg"
            >
              <div className="w-24 h-24 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Image className="w-8 h-8 text-gray-400" />
                  </div>
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="truncate">{item.title}</h4>
                  {isNewEvent(item.createdAt) && (
                    <Badge variant="destructive" className="animate-pulse">
                      ШИНЭ
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                  {item.description}
                </p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span>📅 {new Date(item.date).toLocaleDateString('mn-MN')}</span>
                  <span>🕒 {new Date(item.createdAt).toLocaleDateString('mn-MN')} нэмэгдсэн</span>
                </div>
              </div>

              <div className="flex gap-2 flex-shrink-0">
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
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
